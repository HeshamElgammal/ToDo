export const update_item = (updated_item, index) => {
    return {
        type: "UPDATE_ITEM",
        payload_name: updated_item,
        payload_index: index
    }
}