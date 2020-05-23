export interface IIntention {
  id: string;
  keyword: string;
  match: 'EXACT' | 'INCLUDE';
  users: { username: string; action: string; }[];
  chats: { chat: string; action: string; }[];
  action: string;
}
