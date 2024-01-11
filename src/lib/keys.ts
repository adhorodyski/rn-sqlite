export const chatsKeys = {
  all: ["chats"] as const,
  recent: ["chats", "recent"] as const,
};

export const messagesKeys = {
  chat: (chatId: number) => ["messages", chatId],
  create: (chatId: number) => ["create-message", chatId] as const,
};
