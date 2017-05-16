import { ObservableMap } from 'mobx';
export declare class Item {
    prop: number;
}
declare class AppState {
    timer: any;
    list: number[];
    map: ObservableMap<Item>;
    constructor();
    readonly count: number;
    inc(): void;
    put(): void;
    resetTimer(): void;
}
export default AppState;
