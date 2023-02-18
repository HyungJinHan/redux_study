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

## `react-redux` 라이브러리의 `Provider` 사용하기

### `Provider` 사용 예제

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