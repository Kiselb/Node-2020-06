import {Command, flags} from '@oclif/command'
import { write } from 'fs'
import {WriterTypes, IWriter, WriterFactory} from '../classes/writer'

export default class List extends Command {
  static description = 'Get a list of source code tag descriptions'

  static flags = {
    file: flags.string({char: 'f', description: 'file name to save'}),
    tag: flags.string({char: 't', description: 'filter by tag'}),
  }

  async run() {
    const {args, flags} = this.parse(List)
    const writer: IWriter = WriterFactory.getWriter(
      this,
      (flags.file)? (WriterTypes.FILE): (WriterTypes.CONSOLE),
      flags.file
    )
    console.log(flags)

    writer.open()
    writer.write("Test")
    writer.close()



  }
}
