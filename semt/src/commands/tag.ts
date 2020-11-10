import {Command, flags} from '@oclif/command'
import chalk from 'chalk'
import Table from 'cli-table'
import {promisify} from 'util'
import {writeFile, readFile} from 'fs'
import {IConfig} from '../classes/config'

enum Actions {
  ADD = "ADD",
  REMOVE = "REMOVE",
  LIST = "LIST"
}

export default class Tag extends Command {
  static description = 'change tags list'

  static flags = {}

  static args = [{name: 'action'}, {name: 'tag'}, {name: 'desc'}]

  async run() {
    const {args, flags} = this.parse(Tag)
    const pwriteFile = promisify(writeFile)
    const preadFile = promisify(readFile)

    try {
      const config: IConfig = JSON.parse((await preadFile(`${process.cwd()}/semt.json`)).toString())

      switch((args.action || "").toUpperCase()) {
        case Actions.ADD: {
          const tag: string = (args.tag || "").toLowerCase()
          const desc: string = (args.desc || "").toLowerCase()
          if (!tag) {
            this.log(`${chalk.red('[ERROR]')} Tag name not specified`)
            return
          }
          if (!desc) {
            this.log(`${chalk.red('[ERROR]')} Tag description not specified`)
            return
          }
          if (config.tags.some(item => item.tag.toLowerCase() === tag)) {
            this.log(`${chalk.blue('[EXISTS]')} Tag already exists in the tags list`)
            return
          } else {
            config.tags.push({"tag": tag, "description": desc})
            await pwriteFile(`${process.cwd()}/semt.json`, JSON.stringify(config, null, "  "))
          }
          break
        }
        case Actions.REMOVE: {
          const tag: string = (args.tag || "").toLowerCase()
          if (config.tags.some(item => item.tag.toLowerCase() === tag)) {
            config.tags = config.tags.filter(item => item.tag.toLowerCase() !== tag)
            await pwriteFile(`${process.cwd()}/semt.json`, JSON.stringify(config, null, "  "))
          } else {
            this.log(`${chalk.keyword('orange')('[WARNING]')} Tag not found in the tags list`)
            return
          }
          break
        }
        case Actions.LIST: {
          const table = new Table({
            head: ['Tag', 'Description'], colWidths: [20, 100]
          });
          table.push( ...config.tags.map(item => [item.tag, item.description]))
          this.log(table.toString())
          return
        }
        default: {
          this.log(`${chalk.red('[ERROR]')} Invalid action type`)
          return
        }
      }
  
      this.log(`${chalk.green('[SUCCESS]')} Config file updated`)
    } catch(error) {
      this.log(`${chalk.red('[ERROR]')} ${error.message}`)
    }
  }
}
