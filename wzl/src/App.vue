<script setup lang="ts">
import WuTable from "./components/index";
import { TableColumn } from "./components/types";

const columns: TableColumn[] = [
  {
    title: "Name",
    key: "name",
  },
  {
    title: "Age",
    key: "age",
    sortable: {}
    //   orderBy: "descend",
    //   sorter: (curr, next) => next.age - curr.age,
    // },
  },
  {
    title: "Address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
  },
];
const tableData = [
  {
    key: 3,
    name: "sangfor@3",
    age: 21,
    address: "BeiJing",
    tags: "javascript, typescript!",
  },
  {
    key: 0,
    name: "sangfor@0",
    age: 18,
    address: "ChangSha",
    tags: "javascript, typescript!",
  },
  {
    key: 1,
    name: "sangfor@1",
    age: 19,
    address: "ShenZhen",
    tags: "javascript, typescript!",
  },
  {
    key: 5,
    name: "sangfor@5",
    age: 23,
    address: "ShangHai",
    tags: "javascript, typescript!",
  },
  {
    key: 2,
    name: "sangfor@2",
    age: 20,
    address: "WuHan",
    tags: "javascript, typescript!",
  },
  {
    key: 7,
    name: "sangfor@7",
    age: 25,
    address: "GuangZhou",
    tags: "javascript, typescript!",
  },
  {
    key: 4,
    name: "sangfor@4",
    age: 22,
    address: "XinJiang",
    tags: "javascript, typescript!",
  },
  {
    key: 6,
    name: "sangfor@6",
    age: 24,
    address: "HangZhou",
    tags: "javascript, typescript!",
  },
  {
    key: 7,
    name: "sangfor@7",
    age: 5,
    address: "7777777777",
    tags: "javascript, typescript!",
  },
  {
    key: 8,
    name: "sangfor@8",
    age: 288,
    address: "88888888888",
    tags: "javascript, typescript!",
  },
  {
    key: 9,
    name: "sangfor@9",
    age: 34,
    address: "99999999999",
    tags: "javascript, typescript!",
  },
  {
    key: 10,
    name: "sangfor@10",
    age: 33,
    address: "3333333333332",
    tags: "javascript, typescript!",
  },
];
</script>

<template>
  <WuTable class="wu_table_class" :dataSource="tableData" :columns="columns" />
</template>

<style>
.wu_table_class {
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
