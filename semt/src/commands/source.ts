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
export default class Source extends Command {
  static description = 'change source extension files list'

  static flags = {}

  static args = [{name: 'action'}, {name: 'extension'}]

  async run() {
    const {args, flags} = this.parse(Source)
    const action: string = (args.action || "").toLowerCase()
    const extension: string = (args.extension || "").toLowerCase()
    const pwriteFile = promisify(writeFile)
    const preadFile = promisify(readFile)

    try {
      if (!((action === "add" && args.extension) || (action === "remove" && args.extension) || (action === "list"))) {
        this.log(`${chalk.red('[ERROR]')} Action or source extension file not specified`)
        return
      }
      const config: IConfig = JSON.parse((await preadFile(`${process.cwd()}/semt.json`)).toString())

      switch(action.toUpperCase()) {
        case Actions.ADD: {
          if (config.sources.some(source => source.ext.toLowerCase() === extension)) {
            this.log(`${chalk.blue('[EXISTS]')} Extension already exists in the sources list`)
            return
          } else {
            config.sources.push({"ext": extension})
            await pwriteFile(`${process.cwd()}/semt.json`, JSON.stringify(config, null, "  "))
          }
          break
        }
        case Actions.REMOVE: {
          if (config.sources.some(source => source.ext.toLowerCase() === extension)) {
            config.sources = config.sources.filter(source => source.ext.toLowerCase() !== extension)
            await pwriteFile(`${process.cwd()}/semt.json`, JSON.stringify(config, null, "  "))
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
          break
        }
      }
  
      this.log(`${chalk.green('[SUCCESS]')} Config file updated`)
    } catch(error) {
      this.log(`${chalk.red('[ERROR]')} ${error.message}`)
    }
  }
}
