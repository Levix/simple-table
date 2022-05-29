<script setup lang="ts">
import LhtTable from "./components/LhtTable";
import { TableColumn } from "./components/types";
const columns: TableColumn[] = [
  {
    title: "姓名",
    value: "name",
  },
  {
    title: "年龄",
    value: "age",
    sortable: {}
  },
  {
    title: "性别",
    value: "sex",
  },
  {
    value: "phone",
  }
];
const tableData = [
  {
    name: "tom",
    age: 21,
    sex: 'man',
    phone: '16621331'
  },
  {
    name: "liy",
    age: 18,
    sex: 'woman',
    phone: '13621723291'
  },
  {
    name: "tim",
    age: 19,
    sex: 'man'
  },
  {
    name: "mike",
    age: 23,
    sex: 'man',
    phone: '1291011'
  },
  {
    name: "matix",
    age: 20,
    sex: 'man'
  },
  {
    name: "kety",
    age: 25,
    sex: 'woman'
  },
  {
    name: "sandy",
    age: 22,
    sex: 'woman'
  },
  {
    name: "love",
    age: 24,
    sex: 'man',
    ser: 'lwq'
  },
];
</script>

<template>
  <LhtTable class="lht_table_class"
            :dataList="tableData" 
            :columns="columns" />
</template>

<style>
.lht_table_class {
  width: 100%;
  height: 300px;
  margin-bottom: 24px;
  /*合并边框模型*/
  border-collapse: collapse;
  border-spacing: 0;
  /*在空单元格周围绘制边框*/
  empty-cells: show;
  border: 1px solid #e9e9e9;
}
</style>