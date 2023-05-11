import { Button, Group, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';

function AddTodo() {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      title: '',
      body: '',
    },
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title='Create A todo item'
        centered
      >
        <form
          onSubmit={form.onSubmit(() => {
            console.log(form.values);
            close();
          })}
        >
          <Group position='center'>
            <Button type='submit' variant='light'>
              Create
            </Button>
          </Group>
        </form>
      </Modal>
      <Group position='center'>
        <Button fullWidth mb={12} onClick={open}>
          Add to todo
        </Button>
      </Group>
    </>
  );
}

export default AddTodo;
