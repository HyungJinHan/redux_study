import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store';

const mapDispatchToProps = (dispatch, ownProps) => {
  // ownProps = {text: 'asdasd', id: 1676792387623}
  console.log(ownProps);

  return {
    onDeleteClick: () => {
      dispatch(actionCreators.deleteToDo(parseInt(ownProps.id)));
      // 해당 id를 식별해서 id가 같지 않은 것만 리스트에 남기고 필터링하여 새로운 배열 출력
    }
  }
}

const ToDo = ({ text, onDeleteClick, id }) => {
  return (
    <li>
      <Link to={`/${id}`}>
        {text}
      </Link>
      &nbsp;
      <button onClick={onDeleteClick}>❌</button>
      <br />
      <br />
    </li>
  );
};

export default connect(null, mapDispatchToProps)(ToDo);