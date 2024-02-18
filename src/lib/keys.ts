export const chatsKeys = {
  one: (id: number) => ['chats', id] as const,
  recent: ['chats', 'recent'] as const,
};

export const messagesKeys = {
  chat: (chatId: number) => ['messages', chatId],
  create: (chatId: number) => ['create-message', chatId] as const,
};

export const featuresKeys = {
  all: ['features'] as const,
  update: () => ['update-feature'] as const,
};

export const inboxKeys = {
  all: ['inbox'] as const,
};
