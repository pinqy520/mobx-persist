export declare type Types = 'object' | 'list' | 'map';
export declare function persist(type: Types, schema?: any): (target: Object, key: string, baseDescriptor?: PropertyDescriptor) => void;
export declare function persist(target: Object, key: string, baseDescriptor?: PropertyDescriptor): void;
export interface optionsTyoe {
    storage: any;
}
export declare function create(options: optionsTyoe): <T>(key: string, storeClass: any) => T;
