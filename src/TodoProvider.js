import React, { useReducer, createContext, useContext, useRef } from "react";

const initialTodos = [
  {
    id: 1,
    text: "프로젝트 생성하기",
    done: true,
  },
  {
    id: 2,
    text: "컴포넌트 스타일링하기",
    done: true,
  },
  {
    id: 3,
    text: "Context 만들기",
    done: false,
  },
  {
    id: 4,
    text: "기능 구현하기",
    done: false,
  },
];
//
/*
 * Reducer() - 변화를 일으키는 함수.
 * state와 action 두 개의 인자 받음.
 * 리듀서(Reducer)는 전달받은 인자를 
 * 상태(state)와 액션(action)을 참고해 새로운 상태를 반환.
 * 아래 TodoReducer코드에서 
 * 상태(state)와 액션(action)을 받아 액션 타입에 따라 해당 코드를 실행.
 *  
 * action: 리덕스, 상태의 변화가 필요할 때 발생.
 * type을 필수 속성으로 가지고 있어야 함.
 * 이 외의 다른 속성들은 자유롭게 추가 가능.
 * 
 * Dispatch: 스토어(Store)의 내장 함수 중 하나, 액션을 발생시키는 역할.
 * 디스패치(Dispatch)에는 액션(Action)을 파라미터로 전달
 */
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

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);

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
/* 데이터를 쓰려는곳에서 useContext와 TodoStateContext를 둘다 불러내서 써도되지만
  이렇게하면 이 function 하나만 불러냄으로서 사용가능
  취향에따라 하면됨. */

export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}
/* 혹시라도 Provider가 안걸려있으면 
value로 받는값이없기에 if에 걸려져 에러를 내보냄 */
export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}
