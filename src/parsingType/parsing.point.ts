import { TypeParsing } from "./parsing.abstract";
import { ParsingArray } from "./parsing.array";

/** 坐标类型解析 */
export const ParsingPoint = new class extends TypeParsing {
    type = ['point', 'xy', 'xyz']
    parsing(data: string, type: string) {
        const val: number[] = ParsingArray.parsing(data, 'numArray');
        const result = {};
        if (type === 'point') {
            if (typeof val[0] !== 'undefined') result['x'] = val[0];
            if (typeof val[1] !== 'undefined') result['y'] = val[1];
            if (typeof val[2] !== 'undefined') result['z'] = val[2];
        } else if (type === 'xyz') {
            result['x'] = typeof val[0] !== 'undefined' ? val[0] : 0;
            result['y'] = typeof val[1] !== 'undefined' ? val[1] : 0;
            result['z'] = typeof val[2] !== 'undefined' ? val[2] : 0;
        } else if (type === 'xy') {
            result['x'] = typeof val[0] !== 'undefined' ? val[0] : 0;
            result['y'] = typeof val[1] !== 'undefined' ? val[1] : 0;
        }
        return result;
    }
}