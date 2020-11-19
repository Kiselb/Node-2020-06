import {Command, flags} from '@oclif/command'
import path from 'path'
import chalk from 'chalk'
import {Config} from '../classes/config'
import {AFS} from '../classes/asyncfs'
import {WriterTypes, IWriter, WriterFactory} from '../classes/writer'

export interface ITagToDo {
  dueDate?: string;
  estimate?: number;
}

export interface ITag {
  tag: string;
  line: string;
  source: string;
  fileName: string;
  index: number;
  todo?: ITagToDo;
}

export default class List extends Command {
  static description = 'Get a list of source code tag descriptions'

  static flags = {
    file: flags.string({char: 'f', description: 'file name to save'}),
    tag: flags.string({char: 't', description: 'filter by tag'}),
  }

  static isDirectoryToIgnore(nodePath: string, ignore: any []): boolean {
    for(let i = 0; i < ignore.length; i++) {
      if (path.join(process.cwd(), ignore[i].path) == nodePath) {
        return true
      }
    }
    return false
  }

  static isFileSource(fileName: string, sources: any[]): boolean {
    for(let i = 0; i < sources.length; i++) {
      if (path.extname(fileName) == "." + sources[i].ext) {
        return true
      }
    }
    return false
  }

  static async parseSource(fileName: string, tags: any[]): Promise<ITag[]> {
    const source = await AFS.readFile(fileName, 'utf8')
    const lines: string[] = source.split('\n')
    const report: ITag[] = []

    for(let i = 0; i < lines.length; i++) {
      lines[i] = lines[i].trim().replace(/\r/g, '')
    }

    for(let i = 0; i < lines.length; i++) {
      const test = lines[i].replace(/ /g, '').replace(/\t/g, '').replace(/\r/g, '')
      for(let j = 0; j < tags.length; j++) {
        if (test.toLowerCase().indexOf("//" + tags[j].tag.toLowerCase()) >= 0) {
          const source = ((lines[i + 1] || "").indexOf("//") < 0)? ((lines[i + 1] || "")): ("-")
          let todo: ITagToDo | undefined = undefined
          if (tags[j].tag.toLowerCase() == "todo") {
            const attributes: string[] = test.substring(test.indexOf("[") + 1, test.indexOf("]")).trim().replace(/ /g, '').split(";")
            if (attributes[0]) {
              for(let k = 0; k < attributes.length; k++) {
                if (attributes[k][attributes[k].length - 1].toLowerCase() == "m") {
                  todo = todo || {}
                  todo.estimate = (+attributes[k].substring(0, attributes[k].length - 1)) || 0
                } else if (attributes[k][attributes[k].length - 1].toLowerCase() == "h") {
                  todo = todo || {}
                  todo.estimate = ((+attributes[k].substring(0, attributes[k].length - 1)) || 0) * 60
                } else {
                  todo = todo || {}
                  todo.dueDate = new Date(attributes[k].substring(3, 5) + '-' + attributes[k].substring(0, 2) + '-' + attributes[k].substring(6)).toString()
                }
              }
              //console.log(todo)
            }
            //console.log(attributes)
          }
          const value: ITag = { tag: tags[j].tag, line: lines[i], source: source, index: i + 1, fileName: fileName, todo: todo };
          report.push(value)
          break
        }
      }
    }
    return report
  }

  static async getFiles(parent: any, stat: any, ignore: any[], sources: any[], childPath?: string) {
    const stack: any[] = []
    return new Promise(async (resolve, reject) => {
      try {  
        const nodePath = (!!childPath)? (childPath): (parent.name)
        const files = await AFS.readdir(nodePath, { encoding: 'UTF-8', withFileTypes: true})
        files.forEach(file => {
          const node = parent.items[parent.items.push({ name: file.name }) - 1]
          if (file.isDirectory() && !List.isDirectoryToIgnore(path.join(nodePath, file.name), ignore)) {
              stat.dirs++
              node.items = []
              stack.push(List.getFiles(node, stat, ignore, sources, path.join(nodePath, file.name)))
          } else {
              if (file.isFile() && List.isFileSource(file.name, sources)) {
                stat.files++
                stat.sources.push(path.join(nodePath, file.name))
              }
          }
        })
        Promise.all(stack).then(() => resolve());
      } catch(error) {
        reject(error)
      }
    })
  }

  async run() {
    try {
      const {args, flags} = this.parse(List)
      const writer: IWriter = WriterFactory.getWriter(
        this,
        (flags.file)? (WriterTypes.FILE): (WriterTypes.CONSOLE),
        flags.file
      )

      const tags: any[] = await Config.Tags()
      const ignore: any[] = await Config.Ignore()
      const sources: any[] = await Config.Sources()

      const root = { name: process.cwd(), items: []}
      const stat = { dirs: 0, files: 0, sources: [] }
      await List.getFiles(root, stat, ignore, sources)

      let report: ITag[] = []
      for(let i = 0; i < stat.sources.length; i++) {
        report = [ ...report, ... await List.parseSource(stat.sources[i], tags)]
      }

      this.log(`Directories: ${stat.dirs} Files: ${stat.files}\n`)

      writer.open()

      const totals: ITagToDo = {}
      for(let i = 0; i < tags.length; i++) {
        if (!flags.tag || !!flags.tag && tags[i].tag.toLowerCase() == flags.tag.toLowerCase()) {
          writer.write(`# ${tags[i].tag} \n`)
          for(let j = 0; j < report.length; j++) {
            if (tags[i].tag == report[j].tag) {
              writer.write(`**${report[j].line}**`)
              writer.write(`${report[j].index} ${report[j].fileName}`)
              writer.write(`${report[j].source}`)
              writer.write(` `)
            }
            if (tags[i].tag.toLowerCase() == "todo" && report[j].todo && report[j].todo?.estimate) {
              totals.estimate = (totals.estimate || 0) + (report[j].todo?.estimate || 0)
            }
            if (tags[i].tag.toLowerCase() == "todo" && report[j].todo && report[j].todo?.dueDate) {
              totals.dueDate = (new Date(totals.dueDate || (report[j].todo?.dueDate || new Date().toISOString())) > new Date(report[j].todo?.dueDate || new Date()))? ((totals.dueDate || report[j].todo?.dueDate)): (report[j].todo?.dueDate)
            }
          }
        }
      }
      writer.write(`# Totals TODO\n`)
      writer.write(`Time required : ${(totals.estimate || 0) / 60} hours`)
      writer.write(`Due date: ${new Date((totals.dueDate || new Date().toISOString())).toLocaleDateString()}`)
      writer.close()
    } catch(error) {
      this.log(`${chalk.red('[ERROR]')} ${error.message}`)
    }
  }
}
