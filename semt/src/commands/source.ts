import {Command, flags} from '@oclif/command'
import chalk from 'chalk'
//TODO[19-11-2020;1h]: Разобраться с уведомлением IDE: Could not find a declaration file for module 'cli-table'
const Table  = require('cli-table')
import {AFS} from '../classes/asyncfs'
import {writeFile, readFile} from 'fs'
import {IConfig} from '../classes/config'

enum Actions {
  ADD = "ADD",
  REMOVE = "REMOVE",
  LIST = "LIST"
}

//TODO[19-11-2020;15m]: Перенести код изменения config в методы класса Config
export default class Source extends Command {
  static description = 'change source extension files list'

  static flags = {}

  static args = [{name: 'action'}, {name: 'extension'}]

  async run() {
    const {args, flags} = this.parse(Source)

    try {
      const config: IConfig = JSON.parse((await AFS.readFile(`${process.cwd()}/semt.json`)).toString())

      switch((args.action || "").toUpperCase()) {
        case Actions.ADD: {
          const extension: string = (args.extension || "").toLowerCase()
          if (!extension) {
            this.log(`${chalk.red('[ERROR]')} Source extension file not specified`)
            return
          }
          if (config.sources.some(source => source.ext.toLowerCase() === extension)) {
            this.log(`${chalk.blue('[EXISTS]')} Extension already exists in the sources list`)
            return
          } else {
            config.sources.push({"ext": extension})
            await AFS.writeFile(`${process.cwd()}/semt.json`, JSON.stringify(config, null, "  "))
          }
          break
        }
        case Actions.REMOVE: {
          const extension: string = (args.extension || "").toLowerCase()
          if (!extension) {
            this.log(`${chalk.red('[ERROR]')} Source extension file not specified`)
            return
          }
          if (config.sources.some(source => source.ext.toLowerCase() === extension)) {
            config.sources = config.sources.filter(source => source.ext.toLowerCase() !== extension)
            await AFS.writeFile(`${process.cwd()}/semt.json`, JSON.stringify(config, null, "  "))
          } else {
            this.log(`${chalk.keyword('orange')('[WARNING]')} Extension not found in the sources list`)
            return
          }
          break
        }
        case Actions.LIST: {
          const table = new Table({
            head: ['Source'], colWidths: [25]
          });
          table.push( ...config.sources.map(source => [`*.${source.ext}`]))
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
