import { Box } from '@mantine/core';
import useSwr from 'swr';
import './App.css';
import AddTodo from './components/AddTodo';
import { ENDPOINT } from './utils/endpoint';

const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((res) => res.json());

function App() {
  const { data, mutate } = useSwr('api/todos', fetcher);

  return (
    <Box>
      {JSON.stringify(data)}
      <AddTodo />
    </Box>
  );
}

export default App;
