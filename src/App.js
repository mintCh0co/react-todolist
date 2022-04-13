import React from 'react';
import { createGlobalStyle } from 'styled-components';
import TodoCreate from './components/TodoCreate';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';
import { TodoProvider } from './TodoContext';
// 페이지에 회색 배경 색상 적용
const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  return (
    <TodoProvider>
      <GlobalStyle />
        <TodoTemplate>
            <TodoHead />
            <TodoList />
            <TodoCreate />
      </TodoTemplate>
    </TodoProvider>
  );
}

export default App;
