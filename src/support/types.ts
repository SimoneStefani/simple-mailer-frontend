// @ts-ignore
type Email = {
  id: number;
  from: string;
  to: string;
  subject: string;
  content: string;
  sent_at: any;
};

// @ts-ignore
type NewEmail = {
  to: string;
  subject: string;
  content: string;
};

// @ts-ignore
type Credentials = {
  email: string;
  password: string;
};
