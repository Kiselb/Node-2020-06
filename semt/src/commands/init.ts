import { Command, flags } from '@oclif/command'
import { access, writeFile } from 'fs'
import chalk from 'chalk'
import inquirer from 'inquirer'

export default class Init extends Command {
  static description = 'Init application'

  static flags = {
    force: flags.boolean({char: 'f'}),
  }

  async run() {
    const {args, flags} = this.parse(Init)
    const config = {
      tags: [
        { tag: 'TODO', description: 'needs to be implemented' },
        { tag: 'HTTP', description: 'http link' },
        { tag: 'HACK', description: 'tricky trick' },
        { tag: 'OBSOLETE', description: 'legacy code' },
        { tag: 'REF', description: 'refactoring required' },
        { tag: 'TEST', description: 'needs to be covered with tests' }
      ]
    }
    access(`${process.cwd()}/semt.json`, error => {
        if (error) {
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

    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
