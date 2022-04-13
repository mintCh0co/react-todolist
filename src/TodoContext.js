import React, { useReducer, createContext, useContext, useRef } from "react";

const initialTodos = [
  {
    id: 1,
    text: "TodoList 완성하기",
    done: true,
  },
];
/* map() 메서드: 자바스크립트 배열의 내장 함수

배열 내의 모든 요소 각각에 대하여 주어진 함수(callback 함수)를 한번씩 순서대로 호출.
호출한 결과(callback 함수의 반환값)를 모아 새로운 배열을 반환함.
(map함수, 배열 반복, 컴포넌트 반복)
callback 함수는 호출될 때, 3개의 인수를 전달받음.
1. 처리할 현재(대상) 요소
2. 처리할 현재(대상) 요소의 인덱스
3. map을 호출한 원본 배열 */

/* concat 에서도 기존의 배열을 수정하지 않고, 
새로운 원소가 추가된 새로운 배열을 만들어 줌.
여러 개의 배열을 하나의 배열로 합칠 때 사용함.
concat 뒤에 값은 배열이 아닌 값도 넣을 수 있음. */
function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return state.concat(action.todo);
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
/* 삼항연산자
조건문 ? 조건문 참일 때 실행 : 조건문 거짓일때 실행 */

/* state와 dispatch를 Context를 통하여 다른 컴포넌트에서 바로 사용할 수 있게 
TodoContext에서 state와 dispatch를 함께 넣어주자.  */
const TodoStateContext = createContext();
// createContext로 능력부여하고
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();
/* 배열에 새 항목을 추가할 때, 
새 항목에서 사용할 고유 id 를 관리하는 용도로 useRef 를 사용. */
export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);
/* Context에서 사용 할 값을 지정할 때에는 위와 같이 Provider 컴포넌트를 렌더링하고 value를 설정해 주면 된다. 
props로 받아온 children값을 내부에 렌더링해준다.
value를 통해 Context능력 부여된 변수에 데이터 넣음 */
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}
/* 컴포넌트에서 useContext를 직접 사용하는 대신, 
useContext를 사용하는 커스텀 Hook을 만들어보자 */
export function useTodoState() {
  return useContext(TodoStateContext);
}

export function useTodoDispatch() {
  return useContext(TodoDispatchContext);
}
/* nextId는 새로운 항목을 추가 할 때 사용할 고유 id이다. 
useRef를 사용하여 관리한다. */
export function useTodoNextId() {
  return useContext(TodoNextIdContext);
}
