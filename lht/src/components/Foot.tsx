  /**
   * @file 表格底部
   */

  import { defineComponent, inject, ref, reactive, computed } from "vue";
  import { TABLE_TOKEN } from "./types";
  import { cloneDeep } from "lodash";
 
  export default defineComponent({
    name: "LhtFoot",
    props: {
      onChangePage: {
        type: Function
      }
    },
    setup(props, { emit }) {
      const { sortData } = inject(TABLE_TOKEN)!;
  
      const gridData = reactive({
        data: cloneDeep(sortData),
      });
  
      const curPage = ref(1);
      const pageSize = ref(Math.ceil(gridData.data.length / 5));
  
      const getPages = () => {
        const elList = [];
        for (let i = 0; i < pageSize.value; i++) {
          elList.push(<button onClick={() => changePage(i + 1)}>{i + 1}</button>);
        }
        return elList;
      };

      const startNumAndEndNum = computed(() => {

        let start = 0,
            end = 0;

        if (5 > pageSize.value) {
            start = 1;
            end = pageSize.value;
        } else {

            start = curPage.value - (5 / 2);

            end = curPage.value + (5 / 2);
            
            if (start < 1) {
                start = 1;
                end = 5;
            }
            
            if (end > pageSize.value) {
                end = pageSize.value;
                start = pageSize.value - 5 + 1;
            }
        }
        return {start, end};
      });

      const generateMiddlePage = computed(() => {
        let arr = [];

        for (let i = 0; i <= startNumAndEndNum.value.end; i++) {
            arr.push(i)
        }
        let temp = arr.filter(item => {
            return item >= startNumAndEndNum.value.start
        })
        return temp
      });

      const changePage = (page: number) => {
        if (page < 1 || page > pageSize.value) {
          alert("别点了，到头了！");
          return;
        }
        curPage.value = page;
  
        emit("changePage", curPage.value);
      };
  
      
      return () => {
        return (
          <tfoot>
              <tr>
                <span>{"5/page"}</span>
                <button disabled={curPage.value == 1} onClick={() => changePage(curPage.value - 1)}>
                  上一页
                </button> 
                  {/* {getPages()} */}
                {
                  startNumAndEndNum.value.start > 1 ? (
                    <button onClick={() => changePage(1)}
                            class={"active: pageNo == 1"}
                    >1
                    </button>
                  ) : null
                }

                {
                  startNumAndEndNum.value.start > 2 ? (
                    <button onClick={() => changePage(curPage.value - 5)}
                      >···
                    </button>
                  ) : null
                }


                {
                  generateMiddlePage.value.map((page, index) => (
                    <button key={index}
                            onClick={() => changePage(page)}
                            class={ "active: pageNo == page "}>
                        { page }
                    </button>
                  ))
                }

                {
                  startNumAndEndNum.value.end < pageSize.value - 1 ? (
                    <button onClick={() => changePage(curPage.value + 5)}
                    >···
                    </button>
                  ) : null
                }

                <button disabled={curPage.value == pageSize.value}
                        onClick={() => changePage(curPage.value + 1)}>
                  下一页
                </button>
                <span style={"margin-left: 30px"}>共 { sortData.length } 条</span>
              </tr>
          </tfoot>
        );
      };
    },
  });