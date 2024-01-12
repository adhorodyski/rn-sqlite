export const chatsKeys = {
  one: (id: number) => ['chats', id] as const,
  all: ['chats'] as const,
  recent: ['chats', 'recent'] as const,
};

export const messagesKeys = {
  chat: (chatId: number) => ['messages', chatId],
  create: (chatId: number) => ['create-message', chatId] as const,
};
