import { ref } from '@vue/composition-api'

export function useSort () {
    let sort = ref('');
    let sortIndex = ref('');

    function sortData (order: string, dataIndex: string) {

        // 判断两次点击的排序方向是否一致，如果一致则取消排序
        if (order === sort.value) {
            sort.value = '';
        } else {

            // 设置排序方向的值
            sort.value = order;
        }

        // 改变当前排序的字段
        sortIndex.value = dataIndex;
    }

   return { sortData, sort, sortIndex };
}

