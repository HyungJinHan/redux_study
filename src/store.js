import { createStore } from "redux";
import { createAction } from "@reduxjs/toolkit";

// const ADD = 'ADD';
// const DELETE = 'DELETE';

// const addToDo = (text) => {
//   return {
//     type: ADD,
//     text
//   }
// }

// const deleteToDo = (id) => {
//   return {
//     type: DELETE,
//     id: parseInt(id)
//   }
// }

const addToDo = createAction('ADD');
const deleteToDo = createAction('DELETE');

const reducer = (state = [], action) => {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  switch (action.type) {
    case addToDo.type:
      console.log(action);
      // {type: 'ADD', payload: 'asdasd'}
      return [
        {
          text: action.payload, // = action.text
          id: Date.now(),
          year: year,
          month: month,
          day: day,
          hours: hours,
          minutes: minutes,
          seconds: seconds
        },
        ...state
      ];
    case deleteToDo.type:
      console.log(action);
      // {type: 'DELETE', payload: 1676804738083}
      return state.filter(toDo => toDo.id !== action.payload); // = action.id
    default:
      return state;
  }
};

const store = createStore(reducer);

export const actionCreators = {
  addToDo,
  deleteToDo
}

export default store;