import React, { useState } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store';

const Home = ({ toDoList, addToDo }) => {
  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setText('');
    addToDo(text);
  };

  return (
    <>
      <h1>To Do List (React-Redux)</h1>
      <form
        onSubmit={onSubmit}
      >
        <input
          type={'text'}
          placeholder='Write To Do'
          value={text}
          onChange={onChange}
        />
        &nbsp;
        <button>➕</button>
      </form>
      <ul>
        {JSON.stringify(toDoList)}
      </ul>
    </>
  );
};

const mapStateToProps = (state) => {
  return { toDoList: state }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToDo: (text) => dispatch(actionCreators.addToDo(text))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
// store로부터 state, action 전달 방식 (react-redux)