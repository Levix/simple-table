/**
 * @file 全局过滤器
 */

export default {

    // 全局空文本处理s
    empty(value: string){
        return value || '-';
    }
}
