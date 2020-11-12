import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { createTodo, deleteTodo, getTodos, toggleTodo, updateTodo } from '../../api';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

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
      setText('');
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
    },
    [data, fetchTodos, text],
  );

  const onDelete = async (id) => {
    await deleteTodo(id);
    await fetchTodos();
  };

  const onCheck = async (id) => {
    await toggleTodo(id);
    await fetchTodos();
  };

  const onUpdate = async (id, content) => {
    if (!content) {
      return alert('수정할 내용을 입력해주세요!');
    }
    await updateTodo(id, content);
    await fetchTodos();
  };

  return (
    <form onSubmit={onSubmitTodo}>
      <TodosWrapper>
        <TodoForm loading={data.createLoading} text={text} onChangeText={onChangeText} />
        <TodoList loading={data.fetchLoading} data={data.todos} onDelete={onDelete} onCheck={onCheck} onUpdate={onUpdate} />
      </TodosWrapper>
    </form>
  );
};

export default Todo;
