import { createStore } from "redux";

// --- Plus / Minus Code ---
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

// --- To Do List Code ---
const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';

const reducer = (state = [], action) => {
  console.log(action);

  switch (action.type) {
    case ADD_TODO:
      return [];
    // state.push(action.text)와 같은 변형(mutate)해서는 안됨
    // 즉, 상태를 수정하는 것이 아닌 새로운 것을 return한다는 개념
    case DELETE_TODO:
      return [];
    default:
      return state;
  }
};

const store = createStore(reducer);

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = '';
  if (toDo === '') {
    alert('Write To Do');
    return false;
  } else {
    store.dispatch({ type: ADD_TODO, text: toDo });
  }
};

form.addEventListener('submit', onSubmit);