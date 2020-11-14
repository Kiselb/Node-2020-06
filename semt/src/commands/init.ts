import { Command, flags } from '@oclif/command'
import { access, writeFile } from 'fs'
// HL https://www.npmjs.com/package/chalk
import chalk from 'chalk'
// HL https://www.npmjs.com/package/inquirer#examples
// HL https://www.npmjs.com/package/@types/inquirer
import inquirer from 'inquirer'

//TODO: использовать промифицированные версии функций fs
export default class Init extends Command {
  static description = 'Init application'

  static flags = {
    force: flags.boolean({char: 'f'}),
  }

  async run() {
    const {args, flags} = this.parse(Init)
    //TODO: Вынести в отдельный файл 
    const config = {
      tags: [
        { tag: 'TODO', description: 'needs to be implemented' },
        { tag: 'HL', description: 'http link' },
        { tag: 'HA', description: 'hack or tricky trick' },
        { tag: 'O', description: 'legacy code' },
        { tag: 'R', description: 'refactoring required' },
        { tag: 'T', description: 'needs to be covered with tests' }
      ],
      ignore: [
        { path: 'node_modules'},
        { path: '.circleci'},
        { path: 'bin'},
      ],
      sources: [
        { ext: 'js'},
        { ext: 'ts'},
      ]
    }
    //TODO: Переделать на использование await 
    access(`${process.cwd()}/semt.json`, error => {
        if (error) {
            //TODO: Переделать на использование await 
            writeFile(`${process.cwd()}/semt.json`, JSON.stringify(config, null, '  '), error => {
            if (error) {
              this.log(`${chalk.red('[ERROR]')} Initialization error: ${error.message}`)
            } else {
              this.log(`${chalk.green('[SUCCESS]')} Initialization completed`)
            }
          })
        } else {
          if (flags.force) {
            inquirer.prompt({ type: 'confirm', name: 'reinit', message: 'Reinitialize application?'}).then(answer => {
              if (answer.reinit) {
                  //TODO: Переделать на использование await 
                  writeFile(`${process.cwd()}/semt.json`, JSON.stringify(config, null, '  '), error => {
                  if (error) {
                    this.log(`${chalk.red('[ERROR]')} Initialization error: ${error.message}`)
                  } else {
                    this.log(`${chalk.green('[SUCCESS]')} Initialization completed`)
                  }
                })
              } else {
                this.log(`${chalk.blue('[CANCELED]')} Action canceled`)
              }
            })
          } else {
            this.log(`${chalk.keyword('orange')('[WARNING]')} Config file exists. Use the f flag to reinitialize application`)
          }
        }
      }
    )
  }
}
