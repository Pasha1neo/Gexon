export function searchDialogsById(id, array) {
    let x
    array.find((element) => {
        if (element.key === id) {
            x = element.value
        }
    })
    return x
}
