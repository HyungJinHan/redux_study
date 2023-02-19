import { createStore } from "redux";

const ADD = 'ADD';
const DELETE = 'DELETE';

const addToDo = (text) => {
  return {
    type: ADD,
    text
  }
}

const deleteToDo = (id) => {
  return {
    type: DELETE,
    id: parseInt(id)
  }
}

const reducer = (state = [], action) => {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  switch (action.type) {
    case ADD:
      return [
        {
          text: action.text,
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
    case DELETE:
      return state.filter(toDo => toDo.id !== action.id);
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