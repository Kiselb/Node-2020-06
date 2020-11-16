import { appendFileSync, writeFileSync } from 'fs'

export interface IWriter {
    open(): void; 
    write(data: string): void;
    close(): void;
}
export enum WriterTypes {
    FILE = 0,
    CONSOLE = 1
}

export class WriterFactory {
    public static getWriter(parent: any, type: WriterTypes, fileName?: string): IWriter {
        switch(type) {
            case WriterTypes.FILE: {
                if (!fileName) throw new Error("File name not specified")
                const writer = new FileWriter(parent, fileName)
                return writer
                break;
            }
            default: {
                const writer = new ConsoleWriter(parent)
                return writer
                break;
            }
        }
    }
}

class ConsoleWriter implements IWriter {
    constructor(private parent: any) {
    }
    public open() {}
    public write(data: string) {
        this.parent.log(data)
    }
    public close() {}

}
class FileWriter implements IWriter {

    constructor(private parent: any, private fileName: string) {
    }
    public open() {
        try {
            writeFileSync(this.fileName, "", 'utf8')
        } catch(error) {
            throw new Error(`Write file error: ${error.message}`);            
        }
    }
    public write(data: string) {
        try {
            appendFileSync(this.fileName, data + '\n', 'utf8')
        } catch(error) {
            throw new Error(`Write file error: ${error.message}`);
        }
    }
    public close() {}
}
