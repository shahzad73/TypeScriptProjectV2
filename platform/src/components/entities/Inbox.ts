
export interface IInbox {
  id: number;

  userId: number;

  title: string | null;

  details: string | null;

  dateEmail: string | null;

  isResponded: number;

  response: string | null;

  responseDate: string | null;

  fromUserId: number | null;

  fromUserEmail: string | null;
}
