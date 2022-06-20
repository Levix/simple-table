import { ref, onMounted } from "@vue/composition-api";

export function usePager (tableDataLength: number, pageSize: number) {
    let activeNum = ref<number>(0);
    let pageTotal = ref<number>(0);
    let pages = ref<number[]>([]);

    // 上一页
    function onPrevClick () {
        // 当前页是否为当前最小页码，如果不是则改变当前激活页activeNum
        if (activeNum.value <= 0) {
            window.console.log(`跳转失败, 当前页面最大页码为 ${pages.value.length}`);
            return;
        }
        activeNum.value = activeNum.value - 1;
        window.console.log('成功跳转至上一页');
    };

    // 下一页
    function onNextClick () {
        window.console.log(activeNum.value, pages.value);
        // 当前页是否为当前最大页码
        if (activeNum.value >= pages.value.length) {
            window.console.log(`跳转失败, 当前页面最大页码为 ${pages.value.length}`);
            return;
        }
        activeNum.value = activeNum.value + 1;
        window.console.log('成功跳转至下一页');
    };

    // 获取页码
    function getPages () {
        if(!tableDataLength) {
            return;
        }
        window.console.log(tableDataLength);
        pageTotal.value = Math.ceil(tableDataLength / pageSize);

        // 比较总页码和显示页数
        for (let i = 1; i <= pageTotal.value; i++) {
            pages.value.push(i);
        }
    };

    // 点击分页按钮
    function onPageClick (index: number) {
        activeNum.value = index
    };

    // 跳转至指定页面
    function linkToTarget(targetPage: string) {
        let value = Number(targetPage);

        window.console.log(`您输入的页面是 ${value}, 当前页面总数为 ${pages.value.length} `);

        if (value > pages.value.length || value <= 0) {
            window.console.log(`当前输入页面 ${value} 不存在, 页面总数为 ${pages.value.length}` );
            return;
        }

        if (value === activeNum.value + 1) {
            window.console.log(`您当前就在第 ${value} 页, 跳转失败` );
            return;
        }

        activeNum.value = value - 1;
        window.console.log(`成功跳转至第 ${value} 页, 页面总数为 ${pages.value.length}`);
    }

    onMounted (() => {
        getPages();
    });

    return {
        activeNum,
        onPrevClick,
        onNextClick,
        pages,
        onPageClick,
        pageTotal,
        linkToTarget
    };
}
