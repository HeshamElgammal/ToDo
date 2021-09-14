export const Storage_data = (list) => {
    console.log("action list" + list)
    return {
        type: "STORAGE_DATA",
        payload: JSON.parse(list)
    }
}