import React from 'react';
import styled from 'styled-components';
// 중앙 정렬 흰색 박스 만들기

const TodoTemplateBlock = styled.div`
  width: 512px;
  height: 768px;
  position: relative; // 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);
  margin: 0 auto; // 페이지 중앙에 나타나도록 설정
// margin: auto 해도 위아래 가운데는 안됨 좌우만 됨.
  margin-top: 96px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
// 본문의 크기를 나머지공간을 flex-grow:1로 다채우게 하기위해 flex이용
`;
// children : 안에 다른태그들이 들어감 그 태그들을 보여주기위해
function TodoTemplate({ children }) {
  return <TodoTemplateBlock>{children}</TodoTemplateBlock>;
}

export default TodoTemplate;