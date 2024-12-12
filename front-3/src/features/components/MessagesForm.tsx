import { useState } from 'react';
import { IMessagesMutation } from '../../types';
import Grid from '@mui/material/Grid2';
import { Button, TextField } from '@mui/material';
import * as React from 'react';
import FileInput from './FileInput.tsx';

const initialState: IMessagesMutation = {
  author: '',
  message: '',
  image: null,
};

interface Props {
  onSubmit: (mes: IMessagesMutation) => void;
}

const MessagesForm: React.FC<Props> = ({ onSubmit }) => {
  const [form, setForm] = useState<IMessagesMutation>({ ...initialState });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const getFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setForm((prev) => ({
        ...prev,
        [name]: files[0] || null,
      }));
    }
  };

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.message.trim()) {
      alert('Message is required!');
      return;
    }
    const submission = {
      ...form,
      author: form.author.trim() || 'Anonymous',
    };

    onSubmit(submission);
    setForm({ ...initialState });
  };

  return (
    <div>
      <form onSubmit={onSubmitForm}>
        <Grid container direction="column" spacing={2}>
          <Grid>
            <TextField
              id="author"
              name="author"
              label="Author"
              value={form.author}
              onChange={onInputChange}
              placeholder="Enter your name (optional)"
              fullWidth
            />
          </Grid>
          <Grid >
            <TextField
              multiline
              required
              id="message"
              name="message"
              label="Message"
              value={form.message}
              onChange={onInputChange}
              placeholder="Enter your message"
              fullWidth
            />
          </Grid>
          <Grid>
            <FileInput name="image" label="Image" onChange={getFile} />
          </Grid>
          <Grid>
            <Button type="submit" variant="contained" color="primary">
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default MessagesForm;
