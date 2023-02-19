import { createStore } from "redux";
import { createAction, createReducer } from "@reduxjs/toolkit";

const addToDo = createAction('ADD');
const deleteToDo = createAction('DELETE');

const reducer = createReducer([], {
  // state 값을 변형(mutate)해도 무관 (라이브러리 자체에서 immer를 사용하기 때문)
  [addToDo]: (state, action) => {
    var now = new Date();
    var year = `${now.getFullYear()}년`;
    var month = `${now.getMonth() < 10 ? `0${now.getMonth()}` : now.getMonth()}월`;
    var day = `${now.getDate() < 10 ? `0${now.getDate()}` : now.getDate()}일`;
    var hours = `${now.getHours() < 10 ? `0${now.getHours()}` : now.getHours()}`;
    var minutes = `${now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()}`;
    var seconds = `${now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds()}`;

    const date = `${year} ${month} ${day} ${hours}:${minutes}:${seconds}`;

    state.unshift({
      text: action.payload, // = action.text
      id: Date.now(),
      date: date
    })
    // 변형(mutate)를 하는 경우 return이 없어야 작동
  },
  [deleteToDo]: (state, action) => {
    return state.filter(toDo => toDo.id !== action.payload);
    // 변형(mutate)를 하지 않는 경우 return이 있어야 작동
  }
})

const store = createStore(reducer);

export const actionCreators = {
  addToDo,
  deleteToDo
}

export default store;