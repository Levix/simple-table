/**
 * @file 处理数据排序
 */

import { Ref } from "vue";
import type { TableColumn } from "../components/types";

/**
 * 升序排序
 * @param index 数据下标
 * @returns 排序规则
 */
export const ascendSort = (index: number) => {
    return (a: any[], b: any[]) => {
        return a[index] - b[index];
    };
};

/**
 * 降序排序
 * @param index 数据下标
 * @returns 排序规则
 */
export const descendSort = (index: number) => {
    return (a: any[], b: any[]) => {
        return b[index] - a[index];
    };
};