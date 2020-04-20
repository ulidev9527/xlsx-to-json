import { ParsingString } from "./parsing.string";
import { ParsingNumber } from "./parsing.number";
import { ParsingArray } from "./parsing.array";
import { TypeParsing } from "./parsing.abstract";
import { ParsingPoint } from "./parsing.point";

/** @name 类型解析 */
/**
 * 类型解析
 * @param data 数据
 * @param type 类型
 */
export function parsingType(data: any, type: string) {
    return core.parsing(data, type);
}


/** 解析器核心 */
const core = new class {
    constructor() {
        // 注册解析器
        this.regist(ParsingString);
        this.regist(ParsingNumber);
        this.regist(ParsingArray);
        this.regist(ParsingPoint);
    }
    /** 
     * 类型解析
     * @param data 要解析的数据
     * @param type 解析成的数据类型
     * @default 默认字符串
     */
    parsing(data: string, type: string): any {
        // 没有此类型的解析器 使用字符串解析器
        if (!this.typeMap[type]) type = 'string';

        type = type.toLocaleLowerCase(); // 转换为小写

        // 初步数据处理
        data = String(data).replace(/\r|\n| /g, '');

        // 使用解析器解析
        return this.typeMap[type].parsing(data, type);
    }

    /** 类型映射 */
    private typeMap: { [k: string]: TypeParsing } = {}

    /** 解析器注册 */
    regist(v: TypeParsing) {
        v.type.forEach(type => this.typeMap[type.toLocaleLowerCase()] = v);
    }
}
