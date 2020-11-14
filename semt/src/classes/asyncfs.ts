import {access, writeFile, readFile, readdir} from 'fs'
import {promisify} from 'util'

export class AFS {
    public static access = promisify(access)
    public static writeFile = promisify(writeFile)
    public static readFile = promisify(readFile)
    public static readdir = promisify(readdir)
}
