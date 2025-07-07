import axios from 'axios';
import { userService } from '../../services/userService';
import { UserApiResponse } from '../../types/user';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockUsersResponse: UserApiResponse = {
  data: {
    users: [
      {
        id: 'user-123',
        username: 'johndoe',
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@example.com',
        avatar: 'https://example.com/john.jpg',
        role: 'Developer',
        join_date: '1/15/2024',
        description: 'Experienced developer with expertise in React and TypeScript.',
      },
    ],
  },
};

describe('userService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn();
    console.error = jest.fn();
  });

  describe('fetchUsers', () => {
    test('fetches users successfully', async () => {
      mockedAxios.get.mockResolvedValue({ data: mockUsersResponse });

      const result = await userService.fetchUsers();

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://9e06da9a-97cf-4701-adfc-9b9a5713bbb9.mock.pstmn.io/users'
      );
      expect(result).toEqual(mockUsersResponse);
    });

    test('handles network error', async () => {
      const networkError = new Error('Network Error');
      mockedAxios.get.mockRejectedValue(networkError);

      await expect(userService.fetchUsers()).rejects.toThrow(
        'An unexpected error occurred while fetching users'
      );
    });

    test('handles axios error', async () => {
      const axiosError = {
        isAxiosError: true,
        message: 'Request failed with status code 404',
      };
      mockedAxios.get.mockRejectedValue(axiosError);
      mockedAxios.isAxiosError.mockReturnValue(true);

      await expect(userService.fetchUsers()).rejects.toThrow(
        'Failed to fetch users: Request failed with status code 404'
      );
    });

    test('handles invalid response structure', async () => {
      mockedAxios.get.mockResolvedValue({ data: null });

      await expect(userService.fetchUsers()).rejects.toThrow(
        'Invalid API response structure'
      );
    });

    test('handles missing data object', async () => {
      mockedAxios.get.mockResolvedValue({ data: {} });

      await expect(userService.fetchUsers()).rejects.toThrow(
        'Invalid API response structure - missing data object'
      );
    });

    test('handles invalid users array', async () => {
      const invalidResponse = {
        data: {
          users: null,
        },
      };
      mockedAxios.get.mockResolvedValue({ data: invalidResponse });

      const result = await userService.fetchUsers();

      expect(result.data.users).toEqual([]);
    });

    test('logs API request and response', async () => {
      mockedAxios.get.mockResolvedValue({ data: mockUsersResponse });

      await userService.fetchUsers();

      expect(console.log).toHaveBeenCalledWith(
        'Fetching users from:',
        'https://9e06da9a-97cf-4701-adfc-9b9a5713bbb9.mock.pstmn.io/users'
      );
      expect(console.log).toHaveBeenCalledWith('API Response:', mockUsersResponse);
    });
  });
}); 