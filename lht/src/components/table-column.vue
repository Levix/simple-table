<template>
    <td class="table_header-cell"
        width="100px">
        <div class="table-ellipsis">
            <span>
                <slot></slot>
            </span>
        </div>
    </td>
</template>

<script>
    export default {
        name: 'TableColumn',

        props: {
            dataIndex: {},
        },

        components: {

        },

        computed: {
            colDataIndex() {
                if (this.dataIndex) {
                    return this.dataIndex;
                }

                return '';
            }
        }
    }
</script>