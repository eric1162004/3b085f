import React, { useMemo } from 'react';
import { Box, Chip } from '@material-ui/core';
import { BadgeAvatar, ChatContent } from '../Sidebar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: '0 2px 10px 0 rgba(88,133,196,0.05)',
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'grab',
    },
  },
}));

const Chat = ({ conversation, setActiveChat }) => {
  const classes = useStyles();
  const { otherUser } = conversation;

  const unreadCount = useMemo(() => {
    // only count messages that are not read and the message sender belongs to the other user
    return conversation.messages.reduce(
      (acc, message) =>
        !message.isRead && message.senderId === otherUser.id ? acc + 1 : acc, 0);
  }, [conversation, otherUser]);

  const handleClick = async (conversation) => {
    await setActiveChat(conversation, unreadCount);
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} unreadCount={unreadCount} />
      {unreadCount > 0 && <Chip label={unreadCount} color="primary" size="small" />}
    </Box>
  );
};

export default Chat;
