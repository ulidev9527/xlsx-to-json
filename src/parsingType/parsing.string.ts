import { TypeParsing } from "./parsing.abstract";

/** 字符串类型解析 */
export const ParsingString = new class extends TypeParsing {
    type = ['string', 'String']
    parsing(data: string, type: string) {
        return String(data);
    }
}