semt
====

Code semantic tags management CLI application



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/semt.svg)](https://npmjs.org/package/semt)
[![CircleCI](https://circleci.com/gh/Node-2020-06/semt/tree/master.svg?style=shield)](https://circleci.com/gh/Node-2020-06/semt/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/semt.svg)](https://npmjs.org/package/semt)
[![License](https://img.shields.io/npm/l/semt.svg)](https://github.com/Kiselb/Node-2020-06/semt/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g semt
$ semt COMMAND
running command...
$ semt (-v|--version|version)
semt/0.0.6 win32-x64 node-v12.16.1
$ semt --help [COMMAND]
USAGE
  $ semt COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`semt help [COMMAND]`](#semt-help-command)
* [`semt ignore [ACTION] [PATH]`](#semt-ignore-action-path)
* [`semt init`](#semt-init)
* [`semt list`](#semt-list)
* [`semt source [ACTION] [EXTENSION]`](#semt-source-action-extension)
* [`semt tag [ACTION] [TAG] [DESC]`](#semt-tag-action-tag-desc)

## `semt help [COMMAND]`

display help for semt

```
USAGE
  $ semt help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src\commands\help.ts)_

## `semt ignore [ACTION] [PATH]`

change ignore list

```
USAGE
  $ semt ignore [ACTION] [PATH]

ARGUMENTS
  ACTION  one of this commands: ADD, REMOVE, LIST
  PATH    ignored path
```

_See code: [src\commands\ignore.ts](https://github.com/Kiselb/Node-2020-06/semt/blob/v0.0.6/src\commands\ignore.ts)_

## `semt init`

Init application

```
USAGE
  $ semt init

OPTIONS
  -f, --force
```

_See code: [src\commands\init.ts](https://github.com/Kiselb/Node-2020-06/semt/blob/v0.0.6/src\commands\init.ts)_

## `semt list`

Get a list of source code tag descriptions

```
USAGE
  $ semt list

OPTIONS
  -f, --file=file  file name to save
  -t, --tag=tag    filter by tag
```

_See code: [src\commands\list.ts](https://github.com/Kiselb/Node-2020-06/semt/blob/v0.0.6/src\commands\list.ts)_

## `semt source [ACTION] [EXTENSION]`

change source extension files list

```
USAGE
  $ semt source [ACTION] [EXTENSION]

ARGUMENTS
  ACTION    one of this commands: ADD, REMOVE, LIST
  EXTENSION source file extension
```

_See code: [src\commands\source.ts](https://github.com/Kiselb/Node-2020-06/semt/blob/v0.0.6/src\commands\source.ts)_

## `semt tag [ACTION] [TAG] [DESC]`

change tags list

```
USAGE
  $ semt tag [ACTION] [TAG] [DESC]

ARGUMENTS
  ACTION  one of this commands: ADD, REMOVE, LIST
  TAG     tag
  DESC    tag description
```

_See code: [src\commands\tag.ts](https://github.com/Kiselb/Node-2020-06/semt/blob/v0.0.6/src\commands\tag.ts)_
<!-- commandsstop -->
