import React from 'react';
import styled from 'styled-components';

const Todos = styled.ul`
  margin: 10px 0 0;
  padding: 0;
`;

const Todo = styled.li`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  font-size: 1.3em;
  list-style: none;
`;
const TodoCheck = styled.div`
  width: 5%;
  padding: 10px;
  box-sizing: border-box;
  margin-right: 20px;
  align-self: center;
`;

const TodoText = styled.div`
  width: 95%;
  padding: 10px;
  cursor: pointer;
  :hover {
    background-color: #f1f3f5;
  }
`;

const DeleteBtn = styled.button`
  display: block;
  margin-left: auto;
  background-color: transparent;
  box-sizing: border - box;
  border: 0;
  font-size: 1em;
  outline: none;
  cursor: pointer;
  :hover {
    color: #adb5bd;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TodoList = ({ onCheck, data, onDelete, loading }) => {
  return (
    <>
      <Todos>
        {data.map((v) => (
          <Todo key={v.id}>
            {v.completed_at ? <TodoCheck id={`checkToggle${v.id}`}>ok</TodoCheck> : <TodoCheck id={`checkToggle${v.id}`}></TodoCheck>}

            <TodoText onClick={() => onCheck(v.id)}>{v.content}</TodoText>
            <DeleteBtn type="button" id={`deleteBtn${v.id}`} onClick={() => onDelete(v.id)}>
              X
            </DeleteBtn>
          </Todo>
        ))}
        {loading && <LoadingWrapper>Loading...</LoadingWrapper>}
      </Todos>
    </>
  );
};

export default React.memo(TodoList);
