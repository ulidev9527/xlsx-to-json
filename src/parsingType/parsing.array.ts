import { TypeParsing } from "./parsing.abstract";
import { ParsingNumber } from "./parsing.number";


/** 数组解析器 */
export const ParsingArray = new class extends TypeParsing {
    type = ['array', 'strArray', 'numArray']
    parsing(data: string, type: string):any[] {
        if (data.length === 0) return []; // 空字符串直接返回空数组
        if (type === 'array') {
            return data.split(',').map(v => Number.isNaN(parseInt(v)) ? v : ParsingNumber.parsing(v, 'number'))
        } else if (type === 'strArray') {
            return data.split('@@');
        } else if (type === 'numArray') {
            return data.split(',').map(v => ParsingNumber.parsing(v, 'number'))
        }
        return []
    }
}