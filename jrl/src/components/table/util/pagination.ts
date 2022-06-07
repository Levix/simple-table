import { chunk } from 'lodash'
import { PAGE_SIZE} from "../const";


export function changePageHandle(tableList:any[], curPage:number) {
   return  chunk( tableList, PAGE_SIZE)[curPage]
}