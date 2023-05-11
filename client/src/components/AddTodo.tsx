import { Button, Group, Modal, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { KeyedMutator } from 'swr';
import { Todo } from '../types/Todo';
import { ENDPOINT } from '../utils/endpoint';

function AddTodo({ mutate }: { mutate: KeyedMutator<Todo[]> }) {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      title: '',
      body: '',
    },
  });

  async function createTodo(values: { title: string; body: string }) {
    const updated = await fetch(`${ENDPOINT}/api/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((r) => r.json());

    mutate(updated);
    form.reset();
    close();
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        title='Create todo'
      >
        <form onSubmit={form.onSubmit(createTodo)}>
          <TextInput
            required
            mb={12}
            label='Todo'
            placeholder='What do you want to do?'
            {...form.getInputProps('title')}
          />
          <Textarea
            required
            mb={12}
            label='Body'
            placeholder='Tell me more...'
            {...form.getInputProps('body')}
          />

          <Button type='submit'>Create todo</Button>
        </form>
      </Modal>

      <Group position='center'>
        <Button fullWidth mb={12} onClick={open}>
          Create todo
        </Button>
      </Group>
    </>
  );
}

export default AddTodo;
