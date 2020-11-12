import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';

const Todos = styled.ul`
  margin: 10px 0 0;
  padding: 0;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TodoList = ({ onCheck, data, onDelete, loading, onUpdate }) => {
  return (
    <>
      <Todos>
        {data.map((v) => (
          <TodoItem key={v.id} data={v} onCheck={onCheck} onDelete={onDelete} onUpdate={onUpdate} />
        ))}
        {loading && <LoadingWrapper>Loading...</LoadingWrapper>}
      </Todos>
    </>
  );
};

export default TodoList;
