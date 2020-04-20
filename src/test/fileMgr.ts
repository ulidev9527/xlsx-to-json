import { fileMgr } from "../fileMgr";


const cliPath = process.cwd();
const list = fileMgr.deepReadDir(cliPath);

console.log(cliPath, '大小：', list[0].totalSize, '文件数：', list.length)
