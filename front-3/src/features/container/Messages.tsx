import { useAppDispatch, useAppSelector } from '../../app/hook.ts';
import { CircularProgress, Typography } from '@mui/material';
import { useEffect } from 'react';
import { IMessages, IMessagesMutation } from '../../types';
import { selectFetching, selectMesages } from '../messagesSlice.ts';
import { createMessage, fetchMessage } from '../messagesThunk.ts';
import MessagesForm from '../components/MessagesForm.tsx';
import MessagesItem from '../components/MessagesItem.tsx';

const Chat = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectMesages);
  const isFetching: boolean = useAppSelector(selectFetching);

  useEffect(() => {
    dispatch(fetchMessage());
  }, [dispatch]);

  const onSubmitFormChat = async (mes: IMessagesMutation ) => {
    await dispatch(createMessage(mes));
    await dispatch(fetchMessage());
  };

  return (
    <div>
      <MessagesForm onSubmit={onSubmitFormChat}/>
      <hr />
      <Typography variant="h4" textAlign="center">
        Note List
      </Typography>
      <>
        {isFetching ? (
          <CircularProgress />
        ) : (
          <>
            {messages.length === 0 ? (
              <Typography variant="h6">No messages yet</Typography>
            ) : (
              messages.map((mes: IMessages) => (
                <MessagesItem key={mes.id} message={mes.message} image={mes.image} author={mes.author}  />
              ))
            )}
          </>
        )}
      </>
    </div>
  );
};

export default Chat;
