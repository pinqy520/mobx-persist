export declare function clear(): Promise<{}>;
export declare function getItem(key: string): Promise<string>;
export declare function removeItem(key: string): Promise<{}>;
export declare function setItem(key: string, value: string): Promise<{}>;
export interface IStorage {
    getItem(key: string): Promise<string>;
    removeItem(key: string): Promise<void>;
    setItem(key: string, value: string): Promise<void>;
    [key: string]: any;
}
