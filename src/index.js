import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reactStore from './store'

// --- Plus / Minus Code (Vanilla JS) ---
const add = document.getElementById('add');
const minus = document.getElementById('minus');
const number = document.querySelector('span');

number.innerText = 0;

const ADD = 'ADD';
const MINUS = 'MINUS';

const countModifier = (count = 0, action) => {
  // count = 0로 count 초기값 설정

  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

const countStore = createStore(countModifier);

const onChange = () => {
  number.innerText = countStore.getState();
};

countStore.subscribe(onChange);

const handleAdd = () => {
  countStore.dispatch({ type: ADD });
};

const handleMinus = () => {
  countStore.dispatch({ type: MINUS });
};

add.addEventListener('click', handleAdd);
minus.addEventListener('click', handleMinus);

// --- To Do List Code (Vanilla JS) ---
const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';

const actionAddToDo = (text) => {
  return {
    type: ADD_TODO,
    text
  }
}

const actionDeleteToDo = (id) => {
  return {
    type: DELETE_TODO,
    id
  }
}

const reducer = (state = [], action) => {
  console.log(action);

  switch (action.type) {
    case ADD_TODO:
      return [{ text: action.text, id: Date.now() }, ...state]; // ES6 Spread
    // state.push(action.text)와 같은 변형(mutate)해서는 안됨
    // 즉, 상태를 수정하는 것이 아닌 새로운 것을 return한다는 개념
    case DELETE_TODO:
      return state.filter(toDo => toDo.id !== action.id);
    // id 값이 다른 것들만 필터링하여 남겨두고 배열을 새로 생성
    default:
      return state;
  }
};

const store = createStore(reducer);

const toDoChange = () => {
  console.log(store.getState());
}

const dispatchAddToDo = (text) => {
  store.dispatch(actionAddToDo(text));
};

const dispatchDeleteToDo = (e) => {
  const id = e.target.parentNode.id;
  // 1676648486933 (id: Date.now()의 결과)
  store.dispatch(actionDeleteToDo(parseInt(id)));
};

store.subscribe(toDoChange);
// 0: {text: 'ㅁㄴㅇㅁㅇ', id: 1676647437862}
// 1: {text: 'ㅁㄴㅇㄴㅁㅇ', id: 1676647441743}
// length: 2

const paintToDos = () => {
  const toDoList = store.getState();
  ul.innerHTML = '';
  // 매번 repainting 되는 것을 방지하는 작업

  toDoList.forEach(
    (toDo) => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.innerText = '❌';
      btn.addEventListener('click', dispatchDeleteToDo);
      li.id = toDo.id;
      li.innerText = toDo.text;
      li.appendChild(btn);
      ul.appendChild(li);
    }
  )
}

store.subscribe(paintToDos);

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = '';

  if (toDo === '') {
    alert('Write To Do');
    return false;
  } else {
    dispatchAddToDo(toDo);
  }
};

form.addEventListener('submit', onSubmit);

// --- React ---
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={reactStore}>
      <App />
    </Provider>
  </BrowserRouter>
);