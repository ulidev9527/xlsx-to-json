import { FileLinkItem, fileMgr } from "./fileMgr";
import { xlsxMgr } from "./xlsxMgr";
import { cliTips } from "./cliTips";
import { parsingType } from "./parsingType";

/**
 * 入口
 * @param path 文件/文件夹路径
 */
export function main(path: string) {
    const fileLink = new FileLinkItem(path);
    if (!fileLink.isExists) throw `文件/文件夹路径不存在:${fileLink}`;
    if (fileLink.isFile) xlsxToJson(fileLink.link, fileLink.pathInfo.dir);
    else if (fileLink.isDirectory) {
        const savePath = `${fileLink.pathInfo.dir}/xlsx_to_json`;
        fileMgr.createDirectory(savePath);
        fileLink.getChildrenFileByType('.xlsx').forEach(item => xlsxToJson(item.link, savePath));
    }
    cliTips.high('转换完成');
}


/**
 * 转换程序
 * @param path xlsx文件路径
 * @param savePath xlsx 存储路径
 */
function xlsxToJson(path: string, savePath: string) {
    /** 文件链信息 */
    const fileLink = new FileLinkItem(path);
    if (!fileLink.isExists) throw `文件不存在：${path}`;
    if (!fileLink.isFile) throw `指定路径不是文件:${path}`;

    /** xlsx信息 */
    const xlsxInfoArr = xlsxMgr.readXlsx(fileLink.link);
    xlsxInfoArr.map(xlsxInfo => {
        /** 数据键名 */
        const headKey = xlsxMgr.getKey_Head(xlsxInfo);
        /** 数据类型 */
        const headType = xlsxMgr.getType_Head(xlsxInfo);

        // 判断
        if (!headKey || !headType) {
            cliTips.warn(`文件：${cliTips.getHigh(fileLink.link)}`);
            cliTips.warn(`标签：${cliTips.getHigh(xlsxInfo.tagName)}`);
            cliTips.warn(`缺少：${cliTips.getHigh(headKey ? 'type' : 'key')}`);
            return;
        }

        xlsxInfo.data.splice(0, 2); // 去除列表中的键和类型

        // 开始循环处理

        /** 键名列表, 键说明/键/类型 都不能为空 */
        const kNameArr = Object.keys(headKey).map(K => K && headKey[K] && headType[K] ? K : null);

        // 开始解析逻辑
        const curData = xlsxInfo.data.map(item => {
            /** 结果 */
            const result = {};
            kNameArr.forEach(kName => {
                const key = headKey[kName]; // 键
                const type = headType[kName]; // 类型
                const val = typeof item[kName] === 'undefined' ? '' : item[kName]; // 初始值
                result[key] = parsingType(val, type); // 解析数据
            });
            return result;
        });

        // 存储文件
        

    });
}


main('/Users/dylan/Documents/github/xlsx-to-json/test.xlsx');



