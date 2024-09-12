import apiClient from './apiClient';

const subjectService = {
  getSubjects: async () => {
    try {
      const response = await apiClient.get('/subjects');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.msg || 'Failed to fetch subjects');
    }
  },
};

export default subjectService;
