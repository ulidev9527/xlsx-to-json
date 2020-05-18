import { existsSync, statSync, readdirSync, Stats, mkdirSync } from 'fs';
import { join, parse, ParsedPath } from 'path';

export class FileLinkItem {
    /**
     * 文件链
     * @param link 地址链
     * @param parent 父级
     */
    constructor(path: string, parent: FileLinkItem = null) {
        this.link = path;
        this.parent = parent;
        this.pathInfo = parse(path);
        if (this.isExists) {
            this.stat = statSync(this.link);
            this.__addTotalSize(this.size);
        }
    }

    /** 地址链 */
    link: string

    /** 地址链 */
    parent: FileLinkItem

    /** 静态属性 */
    stat: Stats

    /** 路径信息 */
    pathInfo: ParsedPath

    /** 自身大小 */
    get size() { return this.isFile ? this.stat.size : 0 }

    private _totalSize: number = 0
    /** 总大小 */
    get totalSize(): number { return this._totalSize }

    /** 是否存在 */
    get isExists() { return existsSync(this.link) }

    /** 是否文件 */
    get isFile() { return this.stat.isFile() }

    /** 是否是文件夹 */
    get isDirectory() { return this.stat.isDirectory() }

    /** 文件夹内容 */
    get children(): FileLinkItem[] {
        if (!this.isDirectory) return [];
        return readdirSync(this.link).map(name => new FileLinkItem(join(this.link, name), this));
    }

    /** 所有文件夹类型子节点 */
    get childrenDirectory(): FileLinkItem[] {
        return this.children.filter(item => item.isDirectory);
    }

    /** 获取文件类型子节点 */
    get childrenFile(): FileLinkItem[] {
        return this.children.filter(item => item.isFile);
    }

    /**
     * 获取指定类型文件
     * @param type 文件类型,格式：'.xlsx' / ['.slsx','.txt']
     */
    getChildrenFileByType(type: string | string[]) {
        if (!type) throw '未指定查询的类型';
        type = Array.isArray(type) ? type : [type];
        return this.children.filter(item => type.indexOf(item.pathInfo.ext) > -1)
    }

    /** 
     * 添加总大小,内部调用
     * @param v 数量
     */
    __addTotalSize(v: number) {
        this._totalSize += v;
        if (this.parent) this.parent.__addTotalSize(v);
    }
}


function readDir(item: FileLinkItem): FileLinkItem[] {
    const list = [];
    item.children.forEach(item => {
        list.push(item)
        if (item.isDirectory) list.push(...readDir(item))
    })
    return list;
}


/** 文件管理 */
export const fileMgr = new class {
    /** 
     * 深度读取文件夹
     * @param dir 文件夹路径
     */
    deepReadDir(dir: string): FileLinkItem[] {
        /** 根路径 */
        const root = new FileLinkItem(dir);
        if (!root.isExists) return []; // 路径为空
        if (!root.isDirectory) return []; // 不是文件夹，不继续查询
        return [root].concat(readDir(root))
    }

    /**
     * 指定路径是否存在
     * @param path 路径
     */
    isExists(path: string) {
        return new FileLinkItem(path).isExists
    }

    /** 
     * 指定路径是否是文件夹
     * @param path 路径
     */
    isDirectory(path: string) {
        return new FileLinkItem(path).isDirectory
    }

    /**
     * 指定路径是否是存在文件夹
     * @param path 路径
     */
    hasDirectory(path: string) {
        const info = new FileLinkItem(path);
        return info.isExists && info.isDirectory
    }

    /**
     * 指定路径创建文件夹
     * @param path 路径
     */
    createDirectory(path: string) {
        if (this.isExists(path)) return;
        mkdirSync(path);
    }
}