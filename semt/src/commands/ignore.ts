import {Command, flags} from '@oclif/command'
import chalk from 'chalk'
//TODO[19-11-2020;1h]: Разобраться с уведомлением IDE: Could not find a declaration file for module 'cli-table'
import Table from 'cli-table'
import {access, writeFile, readFile} from 'fs'

export default class Ignore extends Command {
  static description = 'change ignore list'

  static flags = {}

  static args = [{name: 'action'}, {name: 'path'}]

  //TODO[19-11-2020;5m]: Использовать промифицированные версии функций fs
  async run() {
    const {args, flags} = this.parse(Ignore)
    const action: string = (args.action || "").toLowerCase()
    const path: string = (args.path || "").toLowerCase()

    if (!((action === "add" && args.path) || (action === "remove" && args.path) || (action === "list"))) {
      this.log(`${chalk.red('[ERROR]')} Action or path not specified`)
    } else {
      //TODO[19-11-2020;5m]: Переделать на использование await
      access(`${process.cwd()}/semt.json`, error => {
        if (error) {
          this.log(`${chalk.red('[ERROR]')} Config file does not exists`)
        } else {
          //TODO[19-11-2020;5m]: Переделать на использование await
          readFile(`${process.cwd()}/semt.json`, (error, data) => {
            if (error) {
              this.log(`${chalk.red('[ERROR]')} Config file read error: ${error.message}`)
            } else {
              const config = JSON.parse(data.toString())
              const ignore: any[] = config.ignore
              let changed: boolean = false

              if (action === 'add') {
                if (ignore.filter(item => item.path.toLowerCase() === path).length === 0) {
                  config.ignore.push({path: path})
                  changed = true
                } else {
                  this.log(`${chalk.blue('[EXISTS]')} Path already exists in the ignore list`)
                }
              } else if (action === 'remove') {
                if (ignore.filter(item => item.path.toLowerCase() === path).length !== 0) {
                  config.ignore = ignore.filter(item => item.path.toLowerCase() !== path)
                  changed = true
                } else {
                  this.log(`${chalk.keyword('orange')('[WARNING]')} Path not found in the ignore list`)
                }
              } else {
                const table = new Table({
                  head: ['Path'], colWidths: [100]
                });
                table.push( ...ignore.map(source => [source.path]))
                this.log(table.toString())
              }
              if (changed) {
                //TODO[19-11-2020;5m]: Переделать на использование await
                writeFile(`${process.cwd()}/semt.json`, JSON.stringify(config, null, "  "), (error) => {
                  if (error) {
                    this.log(`${chalk.red('[ERROR]')} Config file write error: ${error.message}`)
                  } else {
                    this.log(`${chalk.green('[SUCCESS]')} Config file updated`)
                  }
                })
              }
            }
          })
        }
      })
    }
  }
}
