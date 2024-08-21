export interface RefreshToken {
  token: string;
  userId: string;
}

export interface UserCreate {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
  name: string;
  profileImage?: string;
}

export interface UserResponse {
  id: string;
  name: string;
  username: string;
  email: string;
  profileImage: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Credential {
  email: string;
  username: string;
  name: string;
  password: string;
  passwordConfirm: string;
}

export interface UserFetch {
  id: string;
  name: string;
  username: string;
  email: string;
  profileImage: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TweetData {
  text: string;
  authorId: string;
  replyToId: string;
  mediaFile: any;
}
