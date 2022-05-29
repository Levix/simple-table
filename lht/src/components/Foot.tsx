  /**
   * @file 表格底部
   */

  import { defineComponent, ref, reactive, computed, PropType, toRefs, watch } from "vue";
  import { cloneDeep } from "lodash";
  import './css/foot.css'
 
  export default defineComponent({
    name: "LhtFoot",
    // TODO:定义好类型
    props: {
      onChangePage: {
        type: Function as PropType<(params: number) => void>
      },

      onChangeSize: {
        type: Function as PropType<(params: number) => void>
      },

      dataList: {
        type: Array as PropType<Record<string, any>>,
        default: () => [],
      }
    },
    setup(props, { emit }) {
      const { dataList } = toRefs(props)!;
      // TODO:不用包一层data
      const gridData = reactive({
        data: cloneDeep(dataList.value),
      });
  
      const curPage = ref(1);
      const pageSize = ref(5);
      const pageNumber = ref(Math.ceil(gridData.data.length / pageSize.value));

      watch(pageSize, () => {
        pageNumber.value = Math.ceil(gridData.data.length / pageSize.value)
      });

      const getPages = () => {
        const elList = [];
        for (let i = 0; i < pageNumber.value; i++) {
          elList.push(<button onClick={() => changePage(i + 1)}>{i + 1}</button>);
        }
        return elList;
      };

      const startNumAndEndNum = computed(() => {

        let start = 0,
            end = 0;

        if (pageSize.value > pageNumber.value) {
            start = 1;
            end = pageNumber.value;
        } else {

            start = curPage.value - (pageSize.value / 2);

            end = curPage.value + (pageSize.value / 2);
            
            if (start < 1) {
                start = 1;
                end = pageSize.value;
            }
            
            if (end > pageNumber.value) {
                end = pageNumber.value;
                start = pageNumber.value - pageSize.value + 1;
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
        if (page < 1 || page > pageNumber.value) {
          console.log(page,  curPage.value);
          console.log("别点了，到头了！");
          return;
        }
        curPage.value = page;
  
        emit("changePage", page);
      };

      const changeSize = (e: Event) => {
        pageSize.value = e.target.value;
        emit("changeSize", e.target.value);
      }
      
      return () => {
        return (
          <tfoot class={"pagination"}>
              <tr>
                <span>{`${pageSize.value}/page`}</span>
                <button class={"prev"} disabled={curPage.value == 1} onClick={() => changePage(curPage.value - 1)}>
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
                    <button onClick={() => changePage(curPage.value - pageSize.value)}
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
                  startNumAndEndNum.value.end < pageNumber.value - 1 ? (
                    <button onClick={() => changePage(curPage.value + pageSize.value)}
                    >···
                    </button>
                  ) : null
                }

                <button class={ "next" }
                        disabled={curPage.value == pageNumber.value}
                        onClick={() => changePage(curPage.value + 1)}>
                  下一页
                </button>
                <span style={"margin-left: 30px"}>共 { dataList.value.length } 条</span>
                <span class={"nowPage"}>{curPage.value}</span>


                <select onChange={(e) => changeSize(e)}
                        style={"margin-left: 5px"}>
                  <option value={5}>{'5'}</option>
                  <option value={10}>{'10'}</option>
                  <option value={20}>{'20'}</option>
                </select>
                <span style={"margin-left: 10px"}>条/页</span>
              </tr>
          </tfoot>
        );
      };
    },
  });