export interface User {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  avatar: string;
  role: string;
  join_date: string;
  description: string;
}

export interface UserApiResponse {
  data: {
    users: User[];
  };
} 