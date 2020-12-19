export declare function clear(): Promise<unknown>;
export declare function getItem(key: string): Promise<string | null>;
export declare function removeItem(key: string): Promise<unknown>;
export declare function setItem(key: string, value: string): Promise<unknown>;
export interface IStorage {
    getItem(key: string): Promise<string>;
    removeItem(key: string): Promise<void>;
    setItem(key: string, value: string): Promise<void>;
    [key: string]: any;
}
