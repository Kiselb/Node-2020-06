import {Command, flags} from '@oclif/command'
import path from 'path'
import chalk from 'chalk'
import {Config} from '../classes/config'
import {AFS} from '../classes/asyncfs'
import {WriterTypes, IWriter, WriterFactory} from '../classes/writer'

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
      console.log(path.extname(fileName))
    }
    return false
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

      console.log(stat)

      writer.open()
      writer.write("Test")
      writer.close()

    } catch(error) {
      this.log(`${chalk.red('[ERROR]')} ${error.message}`)
    }
  }
}
