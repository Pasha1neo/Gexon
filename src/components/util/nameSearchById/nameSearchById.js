export function nameSearchById(id, array) {
    let x = {username: 'Общий чат', valid: false}
    array.find((element) => {
        if (element.value.userID === id) {
            x = {username: element.value.username, valid: true}
        }
    })
    return x
}
