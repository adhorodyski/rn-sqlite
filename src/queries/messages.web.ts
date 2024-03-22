// TODO - This is a stub. Implement the getChatMessages query.
export const getChatMessages = async (chatId: number) => {
  return Promise.resolve([
    {id: 0, chat_id: chatId, author_id: 2, content: 'test chat content'},
  ]);
};
