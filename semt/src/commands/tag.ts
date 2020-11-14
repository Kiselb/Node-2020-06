import {Command, flags} from '@oclif/command'
import chalk from 'chalk'
//TODO: Resolve warning
import Table from 'cli-table'
import { AFS } from '../classes/asyncfs'
import {IConfig} from '../classes/config'

enum Actions {
  ADD = "ADD",
  REMOVE = "REMOVE",
  LIST = "LIST"
}
//TODO: Перенести код изменения config в методы класса Config
export default class Tag extends Command {
  static description = 'change tags list'

  static flags = {}

  static args = [{name: 'action'}, {name: 'tag'}, {name: 'desc'}]

  async run() {
    const {args, flags} = this.parse(Tag)

    try {
      const config: IConfig = JSON.parse((await AFS.readFile(`${process.cwd()}/semt.json`)).toString())

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
            await AFS.writeFile(`${process.cwd()}/semt.json`, JSON.stringify(config, null, "  "))
          }
          break
        }
        case Actions.REMOVE: {
          const tag: string = (args.tag || "").toLowerCase()
          if (config.tags.some(item => item.tag.toLowerCase() === tag)) {
            config.tags = config.tags.filter(item => item.tag.toLowerCase() !== tag)
            await AFS.writeFile(`${process.cwd()}/semt.json`, JSON.stringify(config, null, "  "))
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
