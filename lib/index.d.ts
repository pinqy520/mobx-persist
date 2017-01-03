import * as Storage from './storage';
export declare type Types = 'object' | 'list' | 'map';
export declare function persist(type: Types, schema?: any): (target: Object, key: string, baseDescriptor?: PropertyDescriptor) => void;
export declare function persist(target: Object, key: string, baseDescriptor?: PropertyDescriptor): void;
export interface optionsType {
    storage?: Storage.IStorage | any;
}
export declare function create(options?: optionsType): <T extends Object>(key: string, store: T, initialState?: any) => T;
