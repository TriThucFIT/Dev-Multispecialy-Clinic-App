import { User } from "../User/user";

export type LoginRequest = {
  userName: string
  password: string
}

export type LoginResponse = {
  token: string;
  user: User
};