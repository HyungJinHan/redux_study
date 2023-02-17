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

        </details>

<br>

  - `replaceReducer()`

<br>

  - `subscribe()`