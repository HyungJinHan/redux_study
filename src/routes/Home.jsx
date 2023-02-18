import React, { useState } from 'react';

const Home = () => {
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
      <ul></ul>
    </>
  );
};

export default Home;