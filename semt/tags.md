# TODO 

**//TODO[19-11-2020;5m]: Удалить класс**
3 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\src\commands\hello.ts
export default class Hello extends Command {
 
**//TODO[19-11-2020;1h]: Разобраться с уведомлением IDE: Could not find a declaration file for module 'cli-table'**
3 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\src\commands\ignore.ts
import Table from 'cli-table'
 
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
import Table from 'cli-table'
 
**//TODO[19-11-2020;15m]: Перенести код изменения config в методы класса Config**
15 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\src\commands\source.ts
export default class Source extends Command {
 
**//TODO[19-11-2020;1h]: Разобраться с уведомлением IDE: Could not find a declaration file for module 'cli-table'**
3 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\src\commands\tag.ts
import Table from 'cli-table'
 
**//TODO[19-11-2020;15m]: Перенести код изменения config в методы класса Config**
13 D:\EDUCATION\node-2020-06-project\Node-2020-06\semt\src\commands\tag.ts
export default class Tag extends Command {
 
Оценка времени: 4.25 часов
Оценка даты: Thu Nov 19 2020 00:00:00 GMT+0300 (GMT+03:00)
