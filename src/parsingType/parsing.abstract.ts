

/** 类型解析器 */
export abstract class TypeParsing {
    /** 解析器类型,可注册多个 */
    abstract type: string[] = []
    /**  
     * 解析器解析函数
     * @param data 需要解析的数据
     * @param type 需要解析的类型
     */
    abstract parsing(data: string, type: string): any
}
