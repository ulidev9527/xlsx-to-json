import * as Colors from 'colors';

/** 命令行提示 */
export const cliTips = new class {
    /** 普通提示,原生: 白色 */
    log(...any: any[]) {
        console.log(...any)
    }

    /** 信息输出: 蓝色 */
    info(...any: any[]) {
        this.log(...any.map(item => this.getInfo(item)))
    }
    /** 获取信息: 蓝色 */
    getInfo(any: any) {
        return Colors.blue(any)
    }

    /** 高亮: 绿色 */
    high(...any: any[]) {
        this.log(...any.map(item => this.getHigh(item)))
    }

    /** 获取高亮: 绿色 */
    getHigh(any: any) {
        return Colors.green(any)
    }

    /** 警告: 黄色 */
    warn(...any: any[]) {
        this.log(...any.map(item => this.getWarn(item)))
    }
    /** 获取警告: 黄色 */
    getWarn(any: any) {
        return Colors.yellow(any)
    }

    /** 错误: 红色 */
    error(...any: any[]) {
        this.log(...any.map(item => this.getError(item)))
    }
    /** 获取错误: 红色 */
    getError(any: any) {
        return Colors.red(any)
    };
};