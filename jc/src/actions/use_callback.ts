import { getCurrentInstance } from '@vue/composition-api';

export function useCallback () {
    let vm = getCurrentInstance();

    function clickRow(item: any) {
        vm?.emit('click-row', item);
    }

    function hoverRow (item: any) {
        vm?.emit('hover-row', item);
    }

    return { clickRow, hoverRow };
}
