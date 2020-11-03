import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactDom from 'react-dom';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import Spinner from './Spinner';
import { getTodos, createTodo, deleteTodo, toggleTodo } from '../../api';

const TodosWrapper = styled.div`
  margin: 0 auto;
  max-width: 600px;
  box-sizing: border-box;
  padding: 20px;
  background-color: white;
  border-radius: 15px;
`;

const Todo = () => {
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setData({
      ...data,
      fetchLoading: true,
    });
    const result = await getTodos();
    setData({
      ...data,
      todos: result.data.data,
      fetchLoading: false,
    });
  };

  const [text, setText] = useState('');
  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const [data, setData] = useState({
    todos: [],
    createLoading: false,
    fetchLoading: true,
  });

  const onSubmitTodo = useCallback(
    async (e) => {
      e.preventDefault();

      if (!text) {
        return alert('입력을 해주세요.');
      }
      setData({
        ...data,
        createLoading: true,
      });
      await createTodo(text);
      setData({
        ...data,
        createLoading: false,
      });
      await fetchTodos();
      setText('');
    },
    [data, fetchTodos, text],
  );

  const onDelete = async (id) => {
    ReactDom.hydrate(<Spinner />, document.getElementById(`deleteBtn${id}`));
    await deleteTodo(id);
    await fetchTodos();
  };

  const onCheck = async (id) => {
    ReactDom.hydrate(<Spinner />, document.getElementById(`checkToggle${id}`));
    await toggleTodo(id);
    ReactDom.unmountComponentAtNode(document.getElementById(`checkToggle${id}`));
    await fetchTodos();
  };

  return (
    <form onSubmit={onSubmitTodo}>
      <TodosWrapper>
        <TodoForm loading={data.createLoading} text={text} onChangeText={onChangeText} />
        <TodoList loading={data.fetchLoading} data={data.todos} onDelete={onDelete} onCheck={onCheck} />
      </TodosWrapper>
    </form>
  );
};

export default Todo;
