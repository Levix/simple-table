<template>
    <div class="table-header-box">
        <table ref="headerTable"
               class="table_header-inner">
               <thead>
                   <tr class="table_header_row" ref="headerRow">
                       <slot></slot>
                   </tr>
               </thead>

        </table>
    </div>
</template>

<script>
    export default {
        components: {

        },
    }
</script>