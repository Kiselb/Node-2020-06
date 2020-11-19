# TODO 

**//TODO[19-11-2020;5m]: Удалить класс**
4 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\lib\commands\hello.js
class Hello extends command_1.Command {
 
**//TODO[19-11-2020;1h]: Разобраться с уведомлением IDE: Could not find a declaration file for module 'cli-table'**
6 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\lib\commands\ignore.js
const Table = require('cli-table');
 
**//TODO[19-11-2020;5m]: Использовать промифицированные версии функций fs**
10 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\lib\commands\ignore.js
async run() {
 
**//TODO[19-11-2020;5m]: Переделать на использование await**
19 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\lib\commands\ignore.js
fs_1.access(`${process.cwd()}/semt.json`, error => {
 
**//TODO[19-11-2020;5m]: Переделать на использование await**
25 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\lib\commands\ignore.js
fs_1.readFile(`${process.cwd()}/semt.json`, (error, data) => {
 
**//TODO[19-11-2020;5m]: Переделать на использование await**
60 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\lib\commands\ignore.js
fs_1.writeFile(`${process.cwd()}/semt.json`, JSON.stringify(config, null, "  "), (error) => {
 
**//TODO: использовать промифицированные версии функций fs**
11 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\lib\commands\init.js
class Init extends command_1.Command {
 
**//TODO[18-11-2020;10m]: Вынести в отдельный файл**
15 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\lib\commands\init.js
const config = {
 
**//TODO[19-11-2020;5m]: Переделать на использование await**
35 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\lib\commands\init.js
fs_1.access(`${process.cwd()}/semt.json`, error => {
 
**//TODO: Переделать на использование await**
38 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\lib\commands\init.js
fs_1.writeFile(`${process.cwd()}/semt.json`, JSON.stringify(config, null, '  '), error => {
 
**//TODO[19-11-2020;5m]: Переделать на использование await**
52 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\lib\commands\init.js
fs_1.writeFile(`${process.cwd()}/semt.json`, JSON.stringify(config, null, '  '), error => {
 
**//TODO[19-11-2020;1h]: Разобраться с уведомлением IDE: Could not find a declaration file for module 'cli-table'**
6 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\lib\commands\source.js
const Table = require('cli-table');
 
**//TODO[19-11-2020;15m]: Перенести код изменения config в методы класса Config**
15 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\lib\commands\source.js
class Source extends command_1.Command {
 
**//TODO[19-11-2020;1h]: Разобраться с уведомлением IDE: Could not find a declaration file for module 'cli-table'**
6 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\lib\commands\tag.js
const Table = require('cli-table');
 
**//TODO[19-11-2020;15m]: Перенести код изменения config в методы класса Config**
15 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\lib\commands\tag.js
class Tag extends command_1.Command {
 
**//TODO[19-11-2020;5m]: Удалить класс**
3 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\src\commands\hello.ts
export default class Hello extends Command {
 
**//TODO[19-11-2020;1h]: Разобраться с уведомлением IDE: Could not find a declaration file for module 'cli-table'**
3 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\src\commands\ignore.ts
const Table  = require('cli-table')
 
**//TODO[19-11-2020;5m]: Использовать промифицированные версии функций fs**
14 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\src\commands\ignore.ts
async run() {
 
**//TODO[19-11-2020;5m]: Переделать на использование await**
23 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\src\commands\ignore.ts
access(`${process.cwd()}/semt.json`, error => {
 
**//TODO[19-11-2020;5m]: Переделать на использование await**
28 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\src\commands\ignore.ts
readFile(`${process.cwd()}/semt.json`, (error, data) => {
 
**//TODO[19-11-2020;5m]: Переделать на использование await**
59 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\src\commands\ignore.ts
writeFile(`${process.cwd()}/semt.json`, JSON.stringify(config, null, "  "), (error) => {
 
**//TODO: использовать промифицированные версии функций fs**
9 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\src\commands\init.ts
export default class Init extends Command {
 
**//TODO[18-11-2020;10m]: Вынести в отдельный файл**
19 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\src\commands\init.ts
const config = {
 
**//TODO[19-11-2020;5m]: Переделать на использование await**
39 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\src\commands\init.ts
access(`${process.cwd()}/semt.json`, error => {
 
**//TODO: Переделать на использование await**
42 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\src\commands\init.ts
writeFile(`${process.cwd()}/semt.json`, JSON.stringify(config, null, '  '), error => {
 
**//TODO[19-11-2020;5m]: Переделать на использование await**
54 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\src\commands\init.ts
writeFile(`${process.cwd()}/semt.json`, JSON.stringify(config, null, '  '), error => {
 
**//TODO[19-11-2020;1h]: Разобраться с уведомлением IDE: Could not find a declaration file for module 'cli-table'**
3 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\src\commands\source.ts
const Table  = require('cli-table')
 
**//TODO[19-11-2020;15m]: Перенести код изменения config в методы класса Config**
15 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\src\commands\source.ts
export default class Source extends Command {
 
**//TODO[19-11-2020;1h]: Разобраться с уведомлением IDE: Could not find a declaration file for module 'cli-table'**
3 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\src\commands\tag.ts
const Table  = require('cli-table')
 
**//TODO[19-11-2020;15m]: Перенести код изменения config в методы класса Config**
13 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\src\commands\tag.ts
export default class Tag extends Command {
 
# HTTP 

**//HTTP https://www.npmjs.com/package/chalk**
6 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\lib\commands\init.js
const chalk_1 = tslib_1.__importDefault(require("chalk"));
 
**//HTTP https://www.npmjs.com/package/inquirer#examples**
8 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\lib\commands\init.js
-
 
**//HTTP https://www.npmjs.com/package/@types/inquirer**
9 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\lib\commands\init.js
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
 
**//HTTP https://www.npmjs.com/package/chalk**
3 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\src\commands\init.ts
import chalk from 'chalk'
 
**//HTTP https://www.npmjs.com/package/inquirer#examples**
5 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\src\commands\init.ts
-
 
**//HTTP https://www.npmjs.com/package/@types/inquirer**
6 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\src\commands\init.ts
import inquirer from 'inquirer'
 
# HACK 

# OBSOLETE 

# REFACT 

# TEST 

# Totals TODO

Time required : 8.5 hours
Due date: 2020-11-19
