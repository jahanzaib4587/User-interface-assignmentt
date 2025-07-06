import axios from 'axios';
import { userService } from '../../services/userService';
import { UserApiResponse, SingleUserApiResponse } from '../../types/user';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockUsersResponse: UserApiResponse = {
  success: true,
  message: 'Users fetched successfully',
  users: [
    {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      gender: 'male',
      job: 'Developer',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      profile_picture: 'https://example.com/john.jpg',
      phone: '123-456-7890',
      street: '123 Main St',
      zipcode: '10001',
      date_of_birth: '1990-01-01',
      latitude: 40.7128,
      longitude: -74.0060,
    },
  ],
  pagination: {
    current_page: 1,
    per_page: 20,
    total: 100,
    total_pages: 5,
  },
};

const mockSingleUserResponse: SingleUserApiResponse = {
  success: true,
  message: 'User fetched successfully',
  user: mockUsersResponse.users[0],
};

describe('userService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn();
    console.error = jest.fn();
  });

  describe('fetchUsers', () => {
    test('fetches users successfully with default parameters', async () => {
      mockedAxios.get.mockResolvedValue({ data: mockUsersResponse });

      const result = await userService.fetchUsers();

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.slingacademy.com/v1/sample-data/users?offset=0&limit=20'
      );
      expect(result).toEqual(mockUsersResponse);
    });

    test('fetches users with custom page and limit', async () => {
      mockedAxios.get.mockResolvedValue({ data: mockUsersResponse });

      const result = await userService.fetchUsers(2, 10);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.slingacademy.com/v1/sample-data/users?offset=10&limit=10'
      );
      expect(result).toEqual(mockUsersResponse);
    });

    test('validates and fixes invalid response structure', async () => {
      const invalidResponse = { success: true, message: 'test' };
      mockedAxios.get.mockResolvedValue({ data: invalidResponse });

      const result = await userService.fetchUsers();

      expect(result.users).toEqual([]);
    });

    test('throws error for invalid response data', async () => {
      mockedAxios.get.mockResolvedValue({ data: null });

      await expect(userService.fetchUsers()).rejects.toThrow('Invalid API response structure');
    });

    test('handles axios errors', async () => {
      const axiosError = {
        isAxiosError: true,
        message: 'Network Error',
      };
      mockedAxios.get.mockRejectedValue(axiosError);
      mockedAxios.isAxiosError.mockReturnValue(true);

      await expect(userService.fetchUsers()).rejects.toThrow('Failed to fetch users: Network Error');
    });

    test('handles non-axios errors', async () => {
      const genericError = new Error('Some error');
      mockedAxios.get.mockRejectedValue(genericError);
      mockedAxios.isAxiosError.mockReturnValue(false);

      await expect(userService.fetchUsers()).rejects.toThrow('An unexpected error occurred while fetching users');
    });

    test('logs API requests and responses', async () => {
      mockedAxios.get.mockResolvedValue({ data: mockUsersResponse });

      await userService.fetchUsers(1, 20);

      expect(console.log).toHaveBeenCalledWith(
        'Fetching users from:',
        'https://api.slingacademy.com/v1/sample-data/users?offset=0&limit=20'
      );
      expect(console.log).toHaveBeenCalledWith('API Response:', mockUsersResponse);
    });

    test('logs errors', async () => {
      const error = new Error('Test error');
      mockedAxios.get.mockRejectedValue(error);
      mockedAxios.isAxiosError.mockReturnValue(false);

      await expect(userService.fetchUsers()).rejects.toThrow();
      expect(console.error).toHaveBeenCalledWith('API Error:', error);
    });
  });

  describe('fetchUserById', () => {
    test('fetches user by id successfully', async () => {
      mockedAxios.get.mockResolvedValue({ data: mockSingleUserResponse });

      const result = await userService.fetchUserById(1);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.slingacademy.com/v1/sample-data/users/1'
      );
      expect(result).toEqual(mockSingleUserResponse);
    });

    test('validates user ID input', async () => {
      await expect(userService.fetchUserById(0)).rejects.toThrow('Invalid user ID provided');
      await expect(userService.fetchUserById(-1)).rejects.toThrow('Invalid user ID provided');
      await expect(userService.fetchUserById(null as any)).rejects.toThrow('Invalid user ID provided');
      await expect(userService.fetchUserById(undefined as any)).rejects.toThrow('Invalid user ID provided');
      await expect(userService.fetchUserById('123' as any)).rejects.toThrow('Invalid user ID provided');
    });

    test('validates API response structure', async () => {
      mockedAxios.get.mockResolvedValue({ data: null });

      await expect(userService.fetchUserById(1)).rejects.toThrow('Invalid API response structure');
    });

    test('validates user data in response', async () => {
      const responseWithoutUser = { success: true, message: 'test' };
      mockedAxios.get.mockResolvedValue({ data: responseWithoutUser });

      await expect(userService.fetchUserById(1)).rejects.toThrow('User data not found in response');
    });

    test('handles axios errors', async () => {
      const axiosError = {
        isAxiosError: true,
        message: 'User not found',
      };
      mockedAxios.get.mockRejectedValue(axiosError);
      mockedAxios.isAxiosError.mockReturnValue(true);

      await expect(userService.fetchUserById(1)).rejects.toThrow('Failed to fetch user: User not found');
    });

    test('handles non-axios errors', async () => {
      const genericError = new Error('Some error');
      mockedAxios.get.mockRejectedValue(genericError);
      mockedAxios.isAxiosError.mockReturnValue(false);

      await expect(userService.fetchUserById(1)).rejects.toThrow('An unexpected error occurred while fetching user');
    });
  });
}); 