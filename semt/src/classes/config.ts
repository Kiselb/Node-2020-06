import {AFS} from './asyncfs'

export enum Sections {
  TAGS = 0,
  IGNORE = 1,
  SOURCES = 2
}

export interface IConfig {
    tags: any[];
    ignore: any[];
    sources: any[];
  }

export class Config {

  constructor() { }

  private static async List(section: Sections): Promise<any[]> {
      try {
          const config: IConfig = JSON.parse((await AFS.readFile(`${process.cwd()}/semt.json`)).toString())
          switch (section) {
            case Sections.TAGS:
              return config.tags
            case Sections.IGNORE:
              return config.ignore
            case Sections.SOURCES:
              return config.sources
            default:
              throw new Error("Unknown section");                
          }
      } catch(error) {
          throw new Error(`Read config error: ${error.message}`);
      }
  }

  public static Tags(): any {
    return Config.List(Sections.TAGS)
  }

  public static Ignore(): any {
    return Config.List(Sections.IGNORE)
  }

  public static Sources(): any {
    return Config.List(Sections.SOURCES)
  }
 }
  