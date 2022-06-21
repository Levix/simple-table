/**
 * @file App 相关类型声明
 */

export interface SortParamsType {
  [key: string]: string
}

export interface AllParamsType {

  /** 排序 */
  sort_params?: SortParamsType;

  /** 当前页数 */
  cur_page?: number;

  /** 右上角搜索参数 */
  sort?: string;
}
