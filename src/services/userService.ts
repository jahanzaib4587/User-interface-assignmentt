import axios from 'axios';
import { UserApiResponse, SingleUserApiResponse } from '../types/user';

const API_BASE_URL = 'https://api.slingacademy.com/v1/sample-data';

export const userService = {
  async fetchUsers(page: number = 1, limit: number = 20): Promise<UserApiResponse> {
    try {
      const url = `${API_BASE_URL}/users?offset=${(page - 1) * limit}&limit=${limit}`;
      console.log('Fetching users from:', url);
      
      const response = await axios.get<UserApiResponse>(url);
      console.log('API Response:', response.data);
      
      // Validate API response structure
      if (!response.data || typeof response.data !== 'object') {
        throw new Error('Invalid API response structure');
      }
      
      // Ensure users array exists and is valid
      if (!Array.isArray(response.data.users)) {
        response.data.users = [];
      }
      
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      
      // Re-throw validation errors as-is
      if (error instanceof Error && error.message === 'Invalid API response structure') {
        throw error;
      }
      
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to fetch users: ${error.message}`);
      }
      throw new Error('An unexpected error occurred while fetching users');
    }
  },

  async fetchUserById(id: number): Promise<SingleUserApiResponse> {
    // Validate input first, outside try-catch
    if (!id || typeof id !== 'number' || id <= 0) {
      throw new Error('Invalid user ID provided');
    }
    
    try {
      const response = await axios.get<SingleUserApiResponse>(
        `${API_BASE_URL}/users/${id}`
      );
      
      // Validate API response structure
      if (!response.data || typeof response.data !== 'object') {
        throw new Error('Invalid API response structure');
      }
      
      if (!response.data.user) {
        throw new Error('User data not found in response');
      }
      
      return response.data;
    } catch (error) {
      // Re-throw validation errors as-is
      if (error instanceof Error && 
          (error.message === 'Invalid API response structure' || 
           error.message === 'User data not found in response')) {
        throw error;
      }
      
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to fetch user: ${error.message}`);
      }
      throw new Error('An unexpected error occurred while fetching user');
    }
  }
}; 