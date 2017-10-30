import { Types } from './types';
export declare function persist(type: Types, schema?: any): (target: Object, key: string, baseDescriptor?: PropertyDescriptor) => void;
export declare function persist(target: Object, key: string, baseDescriptor?: PropertyDescriptor): void;
export declare function persist(schema: Object): <T>(target: T) => T;
export interface optionsType {
    storage?: any;
    jsonify?: boolean;
    debounce?: number;
}
export interface IHydrateResult<T> extends Promise<T> {
    rehydrate: () => IHydrateResult<T>;
}
export declare function create({storage, jsonify, debounce}?: any): <T extends Object>(key: string, store: T, initialState?: any) => IHydrateResult<T>;
