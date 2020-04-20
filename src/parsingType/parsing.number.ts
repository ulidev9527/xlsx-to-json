import { TypeParsing } from "./parsing.abstract";

/** 数字类型解析 */
export const ParsingNumber = new class extends TypeParsing {
    type = ['Number', 'number', 'int', 'float']
    parsing(data: string, type: string) {
        const val = Number(data);
        return Number.isNaN(val) ? 0 : val
    }
}