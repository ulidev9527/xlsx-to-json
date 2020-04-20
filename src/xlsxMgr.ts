import { FileLinkItem } from "./fileMgr"
import { cliTips } from "./cliTips";
import { readFile, utils } from 'xlsx';

export type readXlsxItem = {
    /** 标签名称 */
    tagName: string
    /** 数据数组 */
    data: any[]
}


/** xlsx管理 */
export const xlsxMgr = new class {
    /**
     * 读取xlsx
     * @param path xlsx文件路径
     */
    readXlsx(path: string): readXlsxItem[] {
        try {
            /** 文件链 */
            const fileLink = new FileLinkItem(path);

            // 文件状态
            if (!fileLink.isExists) throw `文件不存在：${path}`;
            if (!fileLink.isFile) throw `指定路径不是文件:${path}`;

            /** xlsx信息 */
            const xlsxInfo = readFile(fileLink.link);
            /** 结果数组 */
            const resultArr: readXlsxItem[] = [];

            // 循环获取所有标签数据
            xlsxInfo.SheetNames.forEach(name => {
                
                /** 标签数据信息 */
                const sheetInfo = xlsxInfo.Sheets[name];
                /** 数据 */
                const data = utils.sheet_to_json<any>(sheetInfo, { raw: false });
                resultArr.push({
                    tagName: name,
                    data
                });
            });
            return resultArr;
        } catch (err) {
            cliTips.error(err);
            throw `文件:${path},解析失败`
        }
    }

    /**
     * 获取键名
     * @param info 信息数据
     */
    getKey_Head(info: readXlsxItem) {
        return info.data[0];
    }

    /**
     * 获取类型
     * @param info 信息数据
     */
    getType_Head(info: readXlsxItem) {
        return info.data[1];
    }

    
}