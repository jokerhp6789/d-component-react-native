export default class Cache {
    private styleSet: Map<string, any> = new Map();

    public constructor(customStyles?: any) {
        this.styleSet = new Map(Object.entries({...(customStyles ?? {})}));
    }

    public getStyleSet(key: string): any | undefined {
        return this.styleSet.get(key);
    }

    public setStyleSet(key: string, value: any): void {
        this.styleSet.set(key, value);
    }
}
