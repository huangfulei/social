export interface IUser {
  name: string;
  email: string;
  password: string;
  gender?: string;
  age?: number;
  tags?: string[];
  location?: string;
  work?: string;
  school?: string;
  statusCode?: number;
  statusMsg?: string;
  bio?: string;
}
