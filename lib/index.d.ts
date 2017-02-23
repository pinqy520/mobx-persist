import * as Storage from './storage';
import { Types } from './types';
export declare function persist(type: Types, schema?: any): (target: Object, key: string, baseDescriptor?: PropertyDescriptor) => void;
export declare function persist(target: Object, key: string, baseDescriptor?: PropertyDescriptor): void;
export declare function persist(schema: Object): <T>(target: T) => T;
export interface optionsType {
    storage?: Storage.IStorage | any;
    jsonify: boolean;
}
export declare function create({storage, jsonify}?: any): <T extends Object>(key: string, store: T, initialState?: any) => T;
