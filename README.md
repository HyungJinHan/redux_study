# `Redux` 스터디
노마드 코더의 Redux 강의를 통한 React 상태관리 공부 레파지토리입니다.

<br>

# `Vanilla JavaScript Redux` 작업

## `Redux` 라이브러리의 `createStore` 사용하기

### `createStore`의 메소드

  - `getState()`

    - **`store` 내의 변경될 `state` 값 불러오는 함수**

    <br>

    - `getState()` 사용 예제

      <details>

      <summary><i>코드 보기</i></summary>

      <br>

        ```JS
        import { createStore } from "redux";
        
        const countModifier = () => {
          return 'hello';
        };

        const countStore = createStore(countModifier);

        console.log(countStore.getState());
        // 결과 : hello
        ```

        <br>

      - `state` 초기값 지정

        ```JS
        const countModifier = (state = 0) => {
          // state = 0로 state 초기값 설정
          console.log(state);
          // 0
          return state;
        };

        const countStore = createStore(countModifier);

        console.log(countStore.getState());
        // 0
        ```

        </details>

<br>

  - `dispatch()`

    - **`store`의 `action`을 지정하는 함수**

    <br>

    - `dispatch()` & `action` 사용 예제

      <details>

      <summary><i>코드 보기</i></summary>

      <br>

        ```JS
        import { createStore } from "redux";

        const countModifier = (count = 0, action) => {
          // count = 0로 count 초기값 설정

          if (action.type === 'ADD') {
            return count += 1;
          } else if (action.type === 'MINUS') {
            return count -= 1;
          } else {
            return count;
          }
        };

        const countStore = createStore(countModifier);

        countStore.dispatch({ type: 'ADD' }); // 1
        countStore.dispatch({ type: 'ADD' }); // 2 (1 + 1)
        countStore.dispatch({ type: 'ADD' }); // 3 (2 + 1)
        countStore.dispatch({ type: 'ADD' }); // 4 (3 + 1)
        countStore.dispatch({ type: 'MINUS' }); // 3 (4 - 1)
        // dispatch를 통해 action을 지정하기 위해서는 object 형식으로 type을 통해 작동

        console.log(countStore.getState());
        // 결과 : 3
        ```

        <br>

        > `Redux`의 `State` 값은 변형(`mutate`)을 해서는 절대 안됨
        > 
        > 즉, 상태를 수정하는 것이 아닌 새로운 것을 `return`한다는 개념
        
        <br>

        ```JS
        state.push(action.type); // ❌
      
        [...state, {text: action.text}]; // ⭕ ES6 Spread
        ```

        <br>

        ```JS
        const stateArray = [
          {text: 'asfd', id: 1676650491370},
          {text: '123', id: 1676650490618},
          {text: 'asdsad', id: 1676650489747}
        ];

        stateArray.splice(1, 1); // ❌
        // 배열을 변형(mutate)하여 삭제하는 방식이기 때문에 적합하지 않음

        stateArray.filter(toDo => toDo.id !== action.id);  // ⭕
        // 배열에서 id 값이 다른 것들을 남겨두고 배열을 새로 생성하는 방식으로 적합함
        ```

        </details>


<br>

  - `subscribe()`

    - **`store`의 변화를 감지하는 함수**

    <br>

    - `dispatch()` & `action` 사용 예제

      <details>

      <summary><i>코드 보기</i></summary>

      <br>

      ```JS
      import { createStore } from "redux";

      const add = document.getElementById('add');
      const minus = document.getElementById('minus');

      const countModifier = (count = 0, action) => {
        // count = 0로 count 초기값 설정

        switch (action.type) {
          case 'ADD':
            return count + 1;
          case 'MINUS':
            return count - 1;
          default:
            return count;
        }
      };

      const countStore = createStore(countModifier);

      const onChange = () => {
        number.innerText = countStore.getState();
        // count의 변경 값 출력
      }

      countStore.subscribe(onChange);

      const handleAdd = () => {
        countStore.dispatch({ type: 'ADD' });
      }

      const handleMinus = () => {
        countStore.dispatch({ type: 'MINUS' });
      }

      add.addEventListener('click', handleAdd);
      minus.addEventListener('click', handleMinus);
      ```

      </details>

<br>

  - `replaceReducer()`

<br>

# `React Redux` 작업

초기 `store`와 `action` 설정은 동일하게 진행

<br>

## `react-redux` 라이브러리 사용하기

### `Provider` 사용

- `index.js`의 `React` 렌더링 부분에 `Provider` 추가를 통해 `store` 전달

  <details>

    <summary><i>코드 보기</i></summary>

    <br>

    ```JS
    import React from "react";
    import ReactDOM from "react-dom/client";
    import App from "./components/App";
    import { BrowserRouter } from "react-router-dom";
    import { Provider } from "react-redux";
    import reactStore from './store'

    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
      <BrowserRouter>
        <Provider store={reactStore}>
          <App />
        </Provider>
      </BrowserRouter>
    );
    ```

    - `store.js`

      ```JS
      import { createStore } from "redux";

      const ADD = 'ADD';
      const DELETE = 'DELETE';

      export const addToDo = (text) => {
        return {
          type: ADD,
          text
        }
      }

      export const deleteToDo = (id) => {
        return {
          type: DELETE,
          id
        }
      }

      const reducer = (state = [], action) => {
        switch (action.type) {
          case ADD:
            return [{ text: action.text, id: Date.now() }, ...state];
          case DELETE:
            return state.filter(toDo => toDo !== action.id);
          default:
            return state;
        }
      };

      const store = createStore(reducer);

      export default store;
      ```

  </detail>

<br>

### `connect` 사용

  - `store`로부터 `state`를 `Home` 컴포넌트에 전달하는 작업 (`mapStateToProps` 함수)

    <details>

      <summary><i>코드 보기</i></summary>

      <br>

      ```JS
      import React, { useState } from 'react';
      import { connect } from 'react-redux';

      const Home = (props) => {

        console.log(props);
        // 결과 : {test: true, dispatch: ƒ}
        
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

      const mapStateToProps = (state, ownProps) => {
        return { test: true }
      };

      export default connect(mapStateToProps)(Home);
      // store로부터 state 전달 방식 (react-redux)
      ```
    </detail>

  <br>

  - `store`로부터 `action`을 `Home` 컴포넌트에 전달하는 작업 (`mapDispatchToProps` 함수)
  
    <details>

      <summary><i>코드 보기</i></summary>

      <br>

      - To Do 추가

        ```JS
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
        ```

        - 결과

          ```JSON
          [
            {"text":"123214","id":1676706665137},
            {"text":"asds","id":1676706663857},
            {"text":"asdasd","id":1676706662825},
            {"text":"hello","id":1676706659473}
          ]
          ```

      - To Do 삭제

        ```JS
        import React from 'react';
        import { connect } from 'react-redux';
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

        const ToDo = ({ text, onDeleteClick }) => {
          return (
            <li>
              {text} <button onClick={onDeleteClick}>❌</button>
            </li>
          );
        };

        export default connect(null, mapDispatchToProps)(ToDo);
        ```

    </detail>

<br>

  - `store`로부터 `state` 배열 중 해당 `id`를 가진 `state`의 `text` 불러오기 (`mapStateToProps` 함수)

    > `react-redux`와 `react-router-dom`의 업데이트로 인해 `ownProps` 작동 X
    > 
    > 
    > 그로 인해 `ownProps`의 `params`를 불러오지 못함
    > 
    > 
    > `react-router-dom`의 `useParams` 사용으로 `id` 값을 비교 후 `text` 불러옴
  
    <details>

      <summary><i>코드 보기</i></summary>

      <br>

      - 해당 To Do의 Detail 페이지

        ```JS
        import React from 'react';
        import { connect } from 'react-redux';
        import { useParams } from 'react-router-dom';

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
            <h1>
              {toDo?.text}
            </h1>
          );
        };

        export default connect(MapStateToProps)(Detail);
        ```

<br>

## `ReduxJS` 라이브러리의 `Redux Toolkit` 사용하기

- 설치하기

  ```bash
  npm i @reduxjs/toolkit
  ```

<br>

### `createAction` 함수로 교체 작업

  - `store.js` 수정

    <details>

      <summary><i>코드 보기</i></summary>

      <br>

      - `type` 지정을 통한 `action` 함수를 `Toolkit`의 `createAction`으로 교체

        ```JS
        import { createStore } from "redux";
        import { createAction } from "@reduxjs/toolkit";

        const addToDo = createAction('ADD');
        // const ADD = 'ADD';
        // const addToDo = (text) => {
        //   return {
        //     type: ADD,
        //     text
        //   }
        // }

        const deleteToDo = createAction('DELETE');
        // const DELETE = 'DELETE';
        // const deleteToDo = (id) => {
        //   return {
        //     type: DELETE,
        //     id: parseInt(id)
        //   }
        // }

        console.log(addToDo());
        console.log(deleteToDo());

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
              // {type: 'DELETE', payload: 1676804884561}
              return state.filter(toDo => toDo.id !== action.payload);
              // action.payload = action.id
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
        ```

      </detail>

<br>

### `createReducer` 함수로 교체 작업

  - `store.js`의 `reducer` 수정

    <details>

      <summary><i>코드 보기</i></summary>

      <br>

      - 기존 `store.js`의 `reducer` 함수

        ```JS
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
        ```

      <br>

      - `createReducer` 함수 사용을 통한 `reducer` 함수 수정

        ```JS
        const reducer = createReducer([], {
          // state 값을 변형(mutate)해도 무관 (라이브러리 자체에서 immer를 사용하기 때문)
          [addToDo]: (state, action) => {
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
          [deleteToDo]: (state, action) => {
            return state.filter(toDo => toDo.id !== action.payload);
            // 변형(mutate)를 하지 않는 경우 return이 있어야 작동
          }
        })
        ```
        
        <br>

        > `immer`란?
        > 
        > `React`에서 불변성을 유지하느라 복잡해진 코드를 짧고 간결하게 작성할 수 있도록 도와주는 라이브러리를 의미한다.
        > 
        >> "불변성"이란?
        >> 
        >> 기존의 상태 값을 유지하면서 새로운 상태 값을 추가하는 것 을 의미한다.
        >> 
        >>> "불변성"을 지키는 이유
        >>> 
        >>> `React`에서는 해당 `state`라는 값은 새로운 참조 값으로 바뀐 것이 아니기 때문에 `push` 이전의 `state`와 `push` 이후의 `state`가 같다고 판단하여 리렌더링을 하지 않게 되기 때문이다.

      </detail>

<br>

### `configureStore` 함수로 교체 작업

  - `store.js`의 `createStore` 수정
  
    <details>

      <summary><i>코드 보기</i></summary>

      <br>

      ```JS
      const store = configureStore({ reducer });
      // = const store = createStore(reducer);
      ```

    </detail>

<br>

### `createSlice` 함수로 교체 작업

  - `store.js`의 `createReducer` 수정
  
    <details>

      <summary><i>코드 보기</i></summary>

      <br>
      
      - 기존의 `store.js`

        ```JS
        import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

        const addToDo = createAction('ADD');
        const deleteToDo = createAction('DELETE');

        const reducer = createReducer([], {
          // state 값을 변형(mutate)해도 무관 (라이브러리 자체에서 immer를 사용하기 때문)
          [addToDo]: (state, action) => {
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
          [deleteToDo]: (state, action) => {
            return state.filter(toDo => toDo.id !== action.payload);
            // 변형(mutate)를 하지 않는 경우 return이 있어야 작동
          }
        })

        const store = configureStore({ reducer });

        export const actionCreators = {
          addToDo,
          deleteToDo
        }
        ```

      <br>
      
      - `store.js`의 `createReducer`를 `createSlice`로 수정하여 `action` 지정 작업

        ```JS
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
            },
            remove: (state, action) => {
              return state.filter(toDo => toDo.id !== action.payload);
            }
          }
        })

        const store = configureStore({ reducer: toDoListReducer.reducer });

        console.log(toDoListReducer.actions);
        // toDoListReducer 내의 add, remove action 출력

        export const { add, remove } = toDoListReducer.actions;

        export default store;
        ```

        <br>

      - To Do 항목 추가하는 버튼과 삭제하는 버튼 함수 수정 필요

        - `Home.jsx`

          ```JS
          // 수정 전
          import { addToDo } from '../store';

          const mapDispatchToProps = (dispatch) = {
            return {
              addToDo: (text) = dispatch(actionCreators.addToDo(text))
            };
          }

          // 수정 후
          import { add } from '../store';

          const mapDispatchToProps = (dispatch) = {
            return {
              addToDo: (text) = dispatch(add(text))
            };
          }
          ```

        <br>

        - `ToDo.jsx`

          ```JS
          // 수정 전
          import { addToDo, deleteToDo } from '../store';

          const mapDispatchToProps = (dispatch, ownProps) = {
            console.log(ownProps);

            return {
              onDeleteClick: () = {
                dispatch(actionCreators.deleteToDo(parseInt(ownProps.id)));
              }
            }
          }

          // 수정 후
          import { remove } from '../store';

          const mapDispatchToProps = (dispatch, ownProps) = {
            console.log(ownProps);

            return {
              onDeleteClick: () = {
                dispatch(remove(parseInt(ownProps.id)));
              }
            }
          }
          ```

    </detail>