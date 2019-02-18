/**
 * 提示框配置
 */
export class TipConfig {
    content: string;
    isBtnGroup: boolean;
    constructor(content: string = '', isBtnGroup: boolean = false) {
        this.content = content;
        this.isBtnGroup = isBtnGroup;
    }
    getContent(): string {
        return this.content;
    }
    getIsBtnGroup(): boolean {
        return this.isBtnGroup;
    }
}
