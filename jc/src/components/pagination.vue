<template>
    <div class="pagination">
        <ul class="pagination-wrap">
            <li @click="onPrevClick()"
                class="page-prev-btn">
                <
            </li>
            <li v-for="(page, index) in pages"
                class="page-num-btn"
                :utid="'page-btn-' + index"
                :key="index" :class="activeNum === index ? 'active' : ''"
                @click="onPageClick(index)">
                <span>{{ page }}</span>
            </li>
            <li @click="onNextClick()"
                class="page-next-btn">
                >
            </li>
        </ul>

        <div class="pagination-total">
            <span class="pagination-active__wrap">{{ `当前处于第 ${activeNum + 1} 页` }}</span>
            <span>{{ `共 ${pageTotal} 页` }}</span>
            <span>
                跳转到
                <input class="pagination-page__link"
                       v-model="targetPage"
                       type="number"
                       @keyup.enter="linkToTarget(targetPage)" />
                页
            </span>
        </div>
    </div>
</template>

<script lang="ts">
/**
 * @file 分页器
 */
import { defineComponent, ref, PropType } from '@vue/composition-api';

export default defineComponent({
    props: {
        activeNum: {
            type: Number as PropType<number>,
            default: 0
        },
        onPrevClick: {
            type: Function
        },
        onNextClick: {
            type: Function
        },
        onPageClick: {
            type: Function
        },
        linkToTarget: {
            type: Function
        },
        pageTotal: {
            type: Number as PropType<number>,
            default: 0
        },
        pages: {
            type: Array as PropType<number[]>,
            default: () => []
        }
    },

    setup() {
        let targetPage = ref('');

        return { targetPage };
    }
});
</script>

<style scoped>
.pagination-wrap {
    display: inline-block;
    margin: 2px 10px 0 20px;
    vertical-align: middle;
}

.pagination-wrap li {
    padding: 0 4px;
    background: #fff;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    margin: 0;
}

.pagination-total {
    display: inline-block;
    vertical-align: middle;
}

.active {
    color: #f40;
    cursor: default;
}

.page-prev-btn a,
.page-next-btn a {
    color: #000;
}

.pagination-active__wrap {
    margin-right: 24px;
}

.pagination-page__link {
    display: inline;
    width: 30px;
}

/* 去除原生input的加减图标按钮 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
}
input[type='number'] {
	-moz-appearance: textfield;
}

</style>
