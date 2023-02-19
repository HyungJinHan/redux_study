import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// react-redux와 react-router-dom의 업데이트로 인해 ownProps 작동 X
// 그로 인해 ownProps 내의 params를 불러오지 못함
// react-router-dom의 useParams 사용으로 id 값을 비교 후 text 불러옴

const MapStateToProps = (state) => {
  // useParams 사용을 위해 첫 글자 대문자화
  const params = useParams();

  console.log(params);
  // 결과 : { id: '1676796326617' }

  return {
    toDo: state.find(toDo => toDo.id === parseInt(params.id))
    // state에서 클릭 시의 params와 toDo의 id가 같은 것을 찾는 작업
  };
};

const Detail = ({ toDo }) => {
  console.log(toDo);
  // 결과 : {text: 'ㅂㄷㅂㅈㄷㅂㅈㄷ', id: 1676796326617}

  return (
    <>
      <h1>
        {toDo?.text}
      </h1>
      <h3>
        Create at :&nbsp;
        {toDo?.year}년&nbsp;
        {toDo?.month < 10 ? `0${toDo?.month}` : toDo?.month}월&nbsp;
        {toDo?.day < 10 ? `0${toDo?.day}` : toDo?.day}일&nbsp;
        {toDo?.hours < 10 ? `0${toDo?.hours}` : toDo?.hours}
        :
        {toDo?.minutes < 10 ? `0${toDo?.minutes}` : toDo?.minutes}
        :
        {toDo?.seconds < 10 ? `0${toDo?.seconds}` : toDo?.seconds}
      </h3>
    </>
  );
};

export default connect(MapStateToProps)(Detail);