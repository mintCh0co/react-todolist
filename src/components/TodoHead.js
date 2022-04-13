import React from 'react';
import styled from 'styled-components';
import { useTodoState } from '../TodoContext';
// 오늘 날짜, 요일, 남은 할 일 갯수를 보여주기
const TodoHeadBlock = styled.div`
  padding: 48px 32px 24px 32px;
  border-bottom: 1px solid #e9ecef;
  h1 {
    margin: 0px;
    font-size: 36px;
    color: 343a40;
  }
  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
  }
  .tasks-left {
    color: #20c997;
    font-size: 18px;
    margin-top: 40px;
    font-weight: bold;
  }
`;
/* filter() 메서드: 자바스크립트 배열의 내장 함수

주어진 함수의 테스트를 통과하는 모든 요소를 모아
(true면 요소를 유지, false면 버림) 새로운 배열로 반환함. 
callback 함수는 호출되는 배열을 변화시키지 않음.
(filter함수, 검색, 삭제)
callback 함수는 3개의 인수와 함께 호출됨.
1. 처리할 현재(대상) 요소값
2. 처리할 현재(대상) 요소의 인덱스
3. filter을 호출한 배열 객체(=순회되는 배열 객체) */
function TodoHead() {
  const todos = useTodoState();
  const undoneTasks = todos.filter(todo => !todo.done);
  // console.log(todos);

  const today = new Date();
  const dateString = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

/* const today = new Date(); 
today.toString(); 
Mon Apr 19 2021 23:02:18 GMT+0900 (Korean Standard Time) 
today.toDateString(); 
Mon Apr 19 2021 
today.toLocaleString(); 
4/19/2021, 11:02:18 PM 
today.toLocaleDateString(); 
4/19/2021 
today.toGMTString(); 
Mon, 19 Apr 2021 14:02:18 GMT 
today.toUTCString(); 
Mon, 19 Apr 2021 14:02:18 GMT 
today.toISOString(); 
2021-04-19T14:02:18.809Z */

  const dayName = today.toLocaleDateString("ko-KR", { weekday: "long"});


  return (
    <TodoHeadBlock>
      <h1>{dateString}</h1>
      <div className="day">{dayName}</div>
      <div className="tasks-left">할 일 {undoneTasks.length}개 남음</div>
    </TodoHeadBlock>
  );
}

export default TodoHead;