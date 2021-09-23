import _ from 'lodash'
import {eventChannel} from '@redux-saga/core'
import {take, put, call, fork, takeEvery, select} from '@redux-saga/core/effects'

function getDialogs(state) {
  return [...state.user.dialogs]
}
export default function* message(socket) {
  yield takeEvery('CHAT:MESSAGE:SEND', workerSendMessage, socket)
  yield takeEvery('CHAT:MESSAGE:READ', workerReadMessage, socket)
  yield takeEvery('CHAT:MESSAGE:CHANGE', workerChangeMessage, socket)
  yield takeEvery('CHAT:MESSAGE:DELETE', workerDeleteMessage, socket)
  yield takeEvery('CHAT:PICK:DIALOG', pickDialog) // СДЕЛАТЬ ОТСЛЕЖИВАНИЕ WID ПО ДРУГОМУ ЧЕРЕЗ САГУ !!!
  yield call(getDialogsData, socket)
  yield fork(watchChangedMessage, socket)
  yield fork(watchMessage, socket)
  yield fork(watcReadMessage, socket)
  yield fork(watchDeletedMessage, socket)
  yield put({type: 'APP:CHAT:ON'})
}

//-----------------------------------------------------------------------

function* getDialogsData(socket) {
  const data = yield call(dialogsData, socket)
  const payload = yield take(data)
  yield put({type: 'CHAT:UPDATE:DIALOGS', payload})
}
function dialogsData(socket) {
  return new eventChannel((emitter) => {
    socket.emit('GET:DATA:DIALOGS', (data) => emitter(data))
    return () => {}
  })
}
function* pickDialog({wid}) {
  const dialogs = yield select(getDialogs)
  if (!_.find(dialogs, {wid}) || false) {
    dialogs.push({_id: null, wid, messages: []})
    yield put({
      type: 'CHAT:CREATE:DIALOG',
      payload: dialogs,
    })
  }
  yield put({type: 'CHAT:SELECT:DIALOG', payload: wid})
} // проверка диалогов

//-----------------------------------------------------------------------

function* addMessageInDialog({message, dialog: {_id, withUserId}}) {
  const dialogs = yield select(getDialogs)
  let dialog = _.find(dialogs, {wid: withUserId})
  if (!dialog) dialog = {_id, wid: withUserId, messages: []}
  if (dialog._id === null) dialog._id = _id
  dialog.messages.push(message)
  yield put({type: 'CHAT:UPDATE:DIALOGS', payload: dialogs})
} //добавить сообщение
function* updateMessage({wid, mid, text}) {
  const dialogs = yield select(getDialogs)
  _.find(_.find(dialogs, {wid}).messages, {_id: mid}).text = text
  yield put({type: 'CHAT:UPDATE:DIALOGS', payload: dialogs})
} // изменить сообщение
function* messageReaded({wid, mid}) {
  const dialogs = yield select(getDialogs)
  _.find(_.find(dialogs, {wid}).messages, {_id: mid}).read = true
  yield put({type: 'CHAT:UPDATE:DIALOGS', payload: dialogs})
} // прочитать сообщение
function* messageSetDelete({wid, mid}) {
  const dialogs = yield select(getDialogs)
  _.remove(_.find(dialogs, {wid}).messages, {_id: mid})
  yield put({type: 'CHAT:UPDATE:DIALOGS', payload: dialogs})
} // удалить сообщение
//-----------------------------------------------------------------------

function getNewMessage(socket) {
  return new eventChannel((emitter) => {
    socket.on('NEW:MESSAGE', (data) => {
      console.log(data)
      emitter(data)
    })
    return () => {}
  })
}
function sendMessage(socket, data) {
  return new eventChannel((emitter) => {
    socket.emit('SEND:MESSAGE', data, (res) => {
      emitter(res)
    })
    return () => {}
  })
}
function* watchMessage(socket) {
  const data = yield call(getNewMessage, socket)
  while (true) {
    const res = yield take(data)
    yield call(addMessageInDialog, res)
  }
}
function* workerSendMessage(socket, {data}) {
  const res = yield call(sendMessage, socket, data)
  while (true) {
    const message = yield take(res)
    yield call(addMessageInDialog, message)
  }
}

// --------------------------------------------------------------------

function getChangedMessage(socket) {
  return new eventChannel((emitter) => {
    socket.on('MESSAGE:CHANGED', (res) => emitter(res))
    return () => {}
  })
}
function changeMessage(socket, data) {
  return new eventChannel((emitter) => {
    socket.emit('MESSAGE:CHANGE', data, (res) => {
      emitter(res)
    })
    return () => {}
  })
}
function* watchChangedMessage(socket) {
  const res = yield call(getChangedMessage, socket)
  while (true) {
    const data = yield take(res)
    yield call(updateMessage, data)
  }
}
function* workerChangeMessage(socket, {wid, mid, text}) {
  const res = yield call(changeMessage, socket, {wid, mid, text})
  while (true) {
    const data = yield take(res)
    yield call(updateMessage, data)
  }
}

// --------------------------------------------------------------------

function getReadedMessage(socket) {
  return new eventChannel((emitter) => {
    socket.on('READED:MESSAGE', (data) => {
      emitter(data)
    })
    return () => {}
  })
}
function readMessage(socket, data) {
  return new eventChannel((emitter) => {
    socket.emit('READ:MESSAGE', data, (res) => {
      emitter(res)
    })
    return () => {}
  })
}
function* watcReadMessage(socket) {
  const data = yield call(getReadedMessage, socket)
  while (true) {
    const res = yield take(data)
    yield call(messageReaded, res)
  }
}
function* workerReadMessage(socket, {wid, mid}) {
  const res = yield call(readMessage, socket, {wid, mid})
  while (true) {
    const data = yield take(res)
    yield call(messageReaded, data)
  }
}

// --------------------------------------------------------------------

function getDeletedMessage(socket) {
  return new eventChannel((emitter) => {
    socket.on('MESSAGE:DELETED', (res) => emitter(res))
    return () => {}
  })
}
function deleteMessage(socket, data) {
  return new eventChannel((emitter) => {
    socket.emit('MESSAGE:DELETE', data, (res) => {
      emitter(res)
    })
    return () => {}
  })
}
function* watchDeletedMessage(socket) {
  const res = yield call(getDeletedMessage, socket)
  while (true) {
    const data = yield take(res)
    yield call(messageSetDelete, data)
  }
}
function* workerDeleteMessage(socket, {wid, mid}) {
  const res = yield call(deleteMessage, socket, {wid, mid})
  while (true) {
    const data = yield take(res)
    yield call(messageSetDelete, data)
  }
}
