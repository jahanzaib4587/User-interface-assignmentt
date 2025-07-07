import axios from 'axios';
import { UserApiResponse } from '../types/user';

const API_BASE_URL = 'https://9e06da9a-97cf-4701-adfc-9b9a5713bbb9.mock.pstmn.io';

export const userService = {
  async fetchUsers(): Promise<UserApiResponse> {
    try {
      const url = `${API_BASE_URL}/users`;
      console.log('Fetching users from:', url);
      
      const response = await axios.get<UserApiResponse>(url);
      console.log('API Response:', response.data);
      
      // Validate API response structure
      if (!response.data || typeof response.data !== 'object') {
        throw new Error('Invalid API response structure');
      }
      
      // Ensure data object exists
      if (!response.data.data || typeof response.data.data !== 'object') {
        throw new Error('Invalid API response structure - missing data object');
      }
      
      // Ensure users array exists and is valid
      if (!Array.isArray(response.data.data.users)) {
        response.data.data.users = [];
      }
      
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      
      // Re-throw validation errors as-is
      if (error instanceof Error && error.message.includes('Invalid API response structure')) {
        throw error;
      }
      
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to fetch users: ${error.message}`);
      }
      throw new Error('An unexpected error occurred while fetching users');
    }
  }
}; 