import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';

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
  :hover {
    background-color: #f1f3f5;
  }
`;

const TodoText = styled.input`
  width: 95%;
  padding: 10px;
  border: 0;
  font-size: 1em;
  box-sizing: border-box;
  height: 40px;
  outline: none;
  cursor: text;
  background-color: transparent;
  :read-only {
    text-decoration: line-through;
  }
`;

const DeleteBtn = styled.button`
  display: block;
  margin-left: auto;
  background-color: transparent;
  box-sizing: border-box;
  border: 0;
  font-size: 1em;
  outline: none;
  cursor: pointer;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Checkbox = styled.input`
  width: 30px;
  height: 40px;
  margin: 0 3px 0 10px;
`;

const TodoItem = ({ data, onDelete, onCheck }) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(data.content);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleUpdate = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log(value);
    }
  };
  const handleDelete = useCallback(
    (e) => {
      if (loading) {
        return;
      }
      const id = e.target.parentNode.getAttribute('id');
      setLoading(true);
      onDelete(id);
    },
    [loading, onDelete],
  );
  return (
    <Todo id={data.id}>
      <Checkbox type="checkbox" onChange={() => onCheck(data.id)} checked={!!data.completed_at} />
      <TodoText value={value} onChange={handleChange} onKeyDown={handleUpdate} readOnly={!!data.completed_at} />
      {loading ? (
        <Spinner />
      ) : (
        <DeleteBtn type="button" onClick={handleDelete}>
          X
        </DeleteBtn>
      )}
    </Todo>
  );
};

const TodoList = ({ onCheck, data, onDelete, loading }) => {
  return (
    <>
      <Todos>
        {data.map((v) => (
          <TodoItem key={v.id} data={v} onCheck={onCheck} onDelete={onDelete} />
        ))}
        {loading && <LoadingWrapper>Loading...</LoadingWrapper>}
      </Todos>
    </>
  );
};

export default React.memo(TodoList);
