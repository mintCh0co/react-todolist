import React from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";
import { useTodoState } from "../TodoContext";

const TodoListBlock = styled.div`
  flex: 1;// 자신이 차지할 수 있는 영역을 꽉 채우도록 설정
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList() {
  const todos = useTodoState();
// TodoItem 컴포넌트를 TodoList에서 랜더링 해주기
  return (
    <TodoListBlock>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          done={todo.done}
        />//map함수를 이용해서 변동하는 배열을 모두 나오게함
      ))}
    </TodoListBlock>
  );
}

export default TodoList;


