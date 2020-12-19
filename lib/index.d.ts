import { Types } from './types';
export declare function persist(type: Types, schema?: any): PropertyDecorator | any;
export declare function persist(target: Object, key: string, baseDescriptor?: PropertyDescriptor): void;
export interface HydrateFactoryOption {
    storage?: any;
    jsonify?: boolean;
    debounce?: number;
}
export interface HydrateResult<T> extends Promise<T> {
    rehydrate: () => HydrateResult<T>;
}
export declare function create({ storage, jsonify, debounce }?: HydrateFactoryOption): <T extends Object>(key: string, store: T, initialState?: any, customArgs?: any) => HydrateResult<T>;
