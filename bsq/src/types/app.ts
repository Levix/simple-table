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

export interface TableOptionType {

  /** 排序是否支持多个参数同时排序，场景非参少 */
  isMultiSort?: boolean;

  /** 是否支持本地排序 */
  isLocalSort?: boolean;

  /** 是否支持本地排序 */
  columns: {

    /** 表头显示字段 */
    title: string;

    /** 表头对应接口字段 */
    dataKey: string;

    /** 是否是排序字段 */
    sortable?: boolean;
  }[];

  /** 数据 */
  data: {}[];

  /** 分页配置 */
  paginationConfig?: {

    /** 总数 */
    total?: number;

    /** 长度 */
    limit?: number;
  }
}
