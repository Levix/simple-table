import { getCurrentInstance, ref, onMounted, Ref } from "@vue/composition-api";

export function usePager (tableData: Array<Object>, pageDataLength: number) {
    let activeNum: Ref<number> = ref(0);
    let vm = getCurrentInstance();
    let pageTotal: Ref<number> = ref(0);
    let pages: Ref<number[]> = ref([]);

    // 上一页
    function onPrevClick () {
        // 当前页是否为当前最小页码，如果不是则改变当前激活页activeNum
        if (activeNum.value <= 0) {
            return;
        }
        activeNum.value = activeNum.value - 1
    };

    // 下一页
    function onNextClick () {
        // 当前页是否为当前最大页码
        if (activeNum.value >= pages.value.length - 1) {
            return;
        }
        activeNum.value = activeNum.value + 1
    };

    // 获取页码
    function setPages () {
        if(!tableData.length) {
            return;
        }
        pageTotal.value = Math.ceil(tableData.length / pageDataLength);

        // 比较总页码和显示页数
        for (let i = 1; i <= pageTotal.value; i++) {
            pages.value.push(i)
        }
    };

    // 点击分页按钮
    function onPageClick (index: number) {
        activeNum.value = index
    };

    onMounted (() => {
        setPages();
    });

    return {
        activeNum,
        onPrevClick,
        onNextClick,
        pages,
        onPageClick,
        pageTotal
    };
}
