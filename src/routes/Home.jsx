import React, { useState } from 'react';
import { connect } from 'react-redux';

const Home = (props) => {
  console.log(props);

  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setText('');
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
        {JSON.stringify(props.toDoList)}
      </ul>
    </>
  );
};

const mapStateToProps = (state) => {
  return { toDoList: state }
};

export default connect(mapStateToProps)(Home);
// store로부터 state 전달 방식 (react-redux)