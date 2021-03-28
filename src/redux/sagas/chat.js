import {call, put, select, take, takeEvery} from '@redux-saga/core/effects'
import _ from 'lodash'
function getDialogsData(state) {
    return [...state.chat.dialogsData]
}
export function* chat() {
    yield takeEvery('DIALOG:SELECT:START', selectChat)
}

function* selectChat({id}) {
    yield call(createDialog, id)
    yield put({type: 'DIALOG:SELECT:END', payload: id})
}
function* createDialog(wid) {
    const dialogsData = yield select(getDialogsData)
    const dialog = _.find(dialogsData, {wid})
    if (!dialog) {
        yield put({type: 'DIALOG:CREATE', payload: {wid, users: [], messages: []}})
    }
}
