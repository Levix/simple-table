<template>
    <div class="pagination">

        <button :disabled="pageNo == 1" @click="getPageNo(pageNo - 1)">
            上一页
        </button>
        <button
                v-if="startNumAndEndNum.start > 1"
                @click="getPageNo(1)"
                :class="{ active: pageNo == 1 }"
        >1
        </button>
        <button
                v-if="startNumAndEndNum.start > 2"
                @click="getPageNo(pageNo - continues)"
        >···
        </button>

        <button
                v-for="(page, index) in generateMiddlePage"
                :key="index"
                @click="getPageNo(page)"
                :class="{ active: pageNo == page }">
            {{ page }}
        </button>
 
        <button
                v-if="startNumAndEndNum.end < totalPage - 1"
                @click="getPageNo(pageNo +continues)"
        >···
        </button>
        <button
                v-if="startNumAndEndNum.end < totalPage"
                @click="getPageNo(totalPage)"
                :class="{active:pageNo==totalPage}">
            {{ totalPage }}
        </button>
 
        <button
                :disabled="pageNo == totalPage"
                @click="getPageNo(pageNo + 1)">
            下一页
        </button>
 
        <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>
</template>
 
<script>
 
    export default {
        name: "TablePagination",
        props: ["pageNo", "pageSize", "total", "continues"],
        computed: {

            totalPage() {

                return Math.ceil(this.total / this.pageSize);
            },

            startNumAndEndNum() {
                const {continues, pageNo, totalPage} = this;

                let start = 0,
                    end = 0;
 
                if (continues > totalPage) {
                    start = 1;
                    end = totalPage;
                } else {

                    start = pageNo - parseInt(continues / 2);

                    end = pageNo + parseInt(continues / 2);
                     
                    if (start < 1) {
                        start = 1;
                        end = continues;
                    }
                     
                    if (end > totalPage) {
                        end = totalPage;
                        start = totalPage - continues + 1;
                    }
                }
                return {start, end};
            },

            generateMiddlePage() {
                let arr = [];

                for (let i = 0; i <= this.startNumAndEndNum.end; i++) {
                    arr.push(i)
                }
                let temp = arr.filter(item => {
                    return item >= this.startNumAndEndNum.start
                })
                return temp
 
            }
        },
         
        methods: {
            getPageNo(val) {
                this.$emit('getPageNo', val)
            },
 
        }
    };
</script>
 
<style scoped>
    .pagination {
        margin-top: 30px;
    }
    
    .pagination button {
            margin: 0 5px;
            background-color: #f4f4f5;
            color: #606266;
            outline: none;
            border-radius: 2px;
            padding: 0 4px;
            vertical-align: top;
            display: inline-block;
            font-size: 13px;
            min-width: 35.5px;
            height: 28px;
            line-height: 28px;
            cursor: pointer;
            box-sizing: border-box;
            text-align: center;
            border: 0;
    }
 
    .active {
        background: skyblue;
    }
</style>