semt
====

Code semantic tags management CLI application

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/semt.svg)](https://npmjs.org/package/semt)
[![CircleCI](https://circleci.com/gh/Node-2020-06/semt/tree/master.svg?style=shield)](https://circleci.com/gh/Node-2020-06/semt/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/semt.svg)](https://npmjs.org/package/semt)
[![License](https://img.shields.io/npm/l/semt.svg)](https://github.com/Node-2020-06/semt/blob/master/package.json)

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
semt/1.0.0 win32-x64 node-v12.16.1
$ semt --help [COMMAND]
USAGE
  $ semt COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`semt hello [FILE]`](#semt-hello-file)
* [`semt help [COMMAND]`](#semt-help-command)
* [`semt ignore [ACTION] [PATH]`](#semt-ignore-action-path)
* [`semt init`](#semt-init)
* [`semt list`](#semt-list)
* [`semt source [ACTION] [EXTENSION]`](#semt-source-action-extension)
* [`semt tag [FILE]`](#semt-tag-file)

## `semt hello [FILE]`

describe the command here

```
USAGE
  $ semt hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ semt hello
  hello world from ./src/hello.ts!
```

_See code: [src\commands\hello.ts](https://github.com/Node-2020-06/semt/blob/v1.0.0/src\commands\hello.ts)_

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
```

_See code: [src\commands\ignore.ts](https://github.com/Node-2020-06/semt/blob/v1.0.0/src\commands\ignore.ts)_

## `semt init`

Init application

```
USAGE
  $ semt init

OPTIONS
  -f, --force
```

_See code: [src\commands\init.ts](https://github.com/Node-2020-06/semt/blob/v1.0.0/src\commands\init.ts)_

## `semt list`

Get a list of source code tag descriptions

```
USAGE
  $ semt list

OPTIONS
  -f, --file=file  file name to save
  -t, --tag=tag    filter by tag
```

_See code: [src\commands\list.ts](https://github.com/Node-2020-06/semt/blob/v1.0.0/src\commands\list.ts)_

## `semt source [ACTION] [EXTENSION]`

change source extension files list

```
USAGE
  $ semt source [ACTION] [EXTENSION]
```

_See code: [src\commands\source.ts](https://github.com/Node-2020-06/semt/blob/v1.0.0/src\commands\source.ts)_

## `semt tag [FILE]`

describe the command here

```
USAGE
  $ semt tag [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src\commands\tag.ts](https://github.com/Node-2020-06/semt/blob/v1.0.0/src\commands\tag.ts)_
<!-- commandsstop -->
