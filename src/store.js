import { configureStore, createSlice } from "@reduxjs/toolkit";

const toDoListReducer = createSlice({
  // action도 함께 제공해줌 (별도의 action 지정할 필요 X)
  name: 'toDoListReducer',
  initialState: [],
  reducers: {
    add: (state, action) => {
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
    remove: (state, action) => {
      return state.filter(toDo => toDo.id !== action.payload);
    }
  }
})

const store = configureStore({ reducer: toDoListReducer.reducer });

console.log(toDoListReducer.actions);

export const { add, remove } = toDoListReducer.actions;

export default store;