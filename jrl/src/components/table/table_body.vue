<script  lang="ts" setup>
import { inject, ref, toRef, watch } from "vue";
import { GLOBAL_TABLE_TOKEN } from "./const"

let { tableColumnsConfig, tableData } = inject(GLOBAL_TABLE_TOKEN)!;
</script>

<template>
    <tbody>
        <!-- 渲染所有表格行 -->
        <tr v-for="(bodyiIem) in tableData">
            <!-- 渲染表某一行中所有列 -->
            <td v-for="(colItem) in tableColumnsConfig">
                {{ bodyiIem[colItem.key] }}
            </td>
        </tr>
    </tbody>
</template>
