import React, { useState } from "react";
import styled, { css } from "styled-components";
import { MdAdd } from "react-icons/md";
import { useTodoDispatch, useTodoNextId } from "../TodoContext";
/*가운데 정렬
display : flex;
justify-content: center;
align-items: center; 가 잘 안먹힐땐 
flex-direction: column을 사용해보기 */
const CircleButton = styled.button`
  background: #38d9a9;
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: #20c997;
  }

  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%);
// 이걸안하면 왼쪽위를 기준으로 위치가되서 가운데위치가 기준으로 되게하는 코드임.

  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.125s all ease-in;
  ${(props) =>
    // 이 변수에 넣어준 prop받아와서
    props.open &&
    // done 이 true면
    css`
    background: #ff6b6b;
    &:hover {
      background: #ff8787;
    &:active {
      background: #fa5252;
    }
    transform: translate(-50%, 50%) rotate(45deg);
    `}
`;
/* 이변수의 스타일을 이렇게하겠다 라는뜻 css``를 사용해야함 */
const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;
// onSubmit이라는 Enter누르면 데이터 보내주는 것을 쓰기위해 form 으로 함.
const InsertForm = styled.form`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 72px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e0ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

function TodoCreate() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId();

  const onToggle = () => setOpen(!open);
  const onChange = (e) => setValue(e.target.value);
 /*  컴포넌트의 onSubmit 에서는 새로운 항목을 추가하는 액션을 dispatch 한 후, 
  value 초기화 및 open 값을 false 로 전환해주었습니다. */
  const onSubmit = (e) => {
    e.preventDefault(); // 새로고침 방지
    dispatch({
      type: "CREATE",
      todo: {
        id: nextId.current,
        text: value,
        done: false,
      },
    });
    setValue("");
    setOpen(false);
    nextId.current += 1;
  };
/* form 태그 자체가 새로고침을 유발한다
막기위해 e.preventDefault(); 입력.
onSubmit 이용시 keypress로 엔터를 쳐줘도 submit이된다.(제출이된다)
근데 onClick은 아님.

false라면 더이상 submit이 안된다.
onSubmit 사용할 시, 빈칸이면 submit하지 말라는걸 할 수 있게됨.
ex) todolist에서 input이 빈칸이면 submit 하지말라는걸 적용해볼 수 있다. */
  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm onSubmit={onSubmit}>
            <Input
              autoFocus
              placeholder="할 일을 입력 후, Enter를 누르세요"
              onChange={onChange}
              value={value}
            />
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </>
  );
}
export default React.memo(TodoCreate);
