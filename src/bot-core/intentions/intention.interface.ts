export interface IIntention {
  id: string;
  keyword: string;
  match: 'EXACT' | 'INCLUDE';
  users: { username: string; action: string; }[];
  chats: string[];
  action: string;
}
