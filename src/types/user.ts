export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  date_of_birth: string;
  country: string;
  city: string;
  state: string;
  zipcode: string;
  profile_picture: string;
  job: string;
  street: string;
  phone: string;
  latitude: number;
  longitude: number;
}

export interface UserApiResponse {
  success: boolean;
  message: string;
  users: User[];
  pagination?: {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
  // Alternative pagination structure that some APIs use
  total_users?: number;
  offset?: number;
  limit?: number;
}

export interface SingleUserApiResponse {
  success: boolean;
  message: string;
  user: User;
} 