import { InjectionKey, } from "vue";
import {
    TableToken,
} from "../types"

export enum STATUS_TOKEN {
    normal = "normal",
    ascend = "ascend",
    descend = "descend"
}
export let  UNIQUE_SORT_STATUS = STATUS_TOKEN.normal

export const GLOBAL_TABLE_TOKEN: InjectionKey<TableToken> = Symbol("TABLE_TOKEN");

export const PAGE_SIZE = 4