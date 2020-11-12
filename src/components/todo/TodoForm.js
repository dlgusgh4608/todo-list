import React from 'react';
import Spinner from './Spinner';
import styled from 'styled-components';

const TodosHeader = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  padding: 0;
  background-color: initial;
`;

const InputTodo = styled.input`
  width: 80%;
  height: 50px;
  border: 1px solid #ced4da;
  border-right-width: 0;
  margin: 0;
  padding: 0 10px;
  box-sizing: border-box;
  outline: none;
  font-size: 1.2em;
  ::placeholder {
    color: #ced4da;
  }
`;
const CreateBtnWrapper = styled.div`
  width: 20%;
  height: 50px;
  box-sizing: border-box;
  background-color: #339af0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CreateBtn = styled.button`
  width: 100%;
  height: 100%;
  background-color: inherit;
  color: white;
  border: 0;
  margin: 0;
  cursor: pointer;
  outline: none;
  font-size: 1.2em;
  :hover {
    background-color: #74c0fc;
  }
  :active {
    background-color: #1c7ed6;
  }
`;

const TodoForm = ({ loading, text, onChangeText }) => {
  return (
    <>
      <TodosHeader>
        <InputTodo type="text" placeholder="할 일을 적어주세요" value={text} onChange={onChangeText} />
        <CreateBtnWrapper>{loading ? <Spinner /> : <CreateBtn type="submit">추가</CreateBtn>}</CreateBtnWrapper>
      </TodosHeader>
    </>
  );
};

export default TodoForm;
