// Authentication Service
// Handles all authentication-related API calls

import apiClient from './apiClient';
import { AUTH_API, USER_API } from '../config/apiEndpoints';

export const loginUser = async (credentials) => {
  const response = await apiClient.post(AUTH_API.LOGIN, credentials);
  return response.data;
};

export const refreshToken = async (refreshToken) => {
  const response = await apiClient.post(AUTH_API.REFRESH, { refreshToken });
  return response.data;
};

export const resetFirstPassword = async (userId, newPassword, confirmPassword) => {
  const response = await apiClient.post(AUTH_API.RESET_FIRST_PASSWORD, {
    userId,
    newPassword,
    confirmPassword
  });
  return response.data;
};

export const getUserSubscription = async (user) => {
  const response = await apiClient.get(USER_API.GET_USER_SUBSCRIPTION_PLANS, user, true);
  return response.data;
};

export const getUserProjects = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.months && filters.months.length > 0) {
    filters.months.forEach(month => params.append('months', month));
  }
  if (filters.sectors && filters.sectors.length > 0) {
    filters.sectors.forEach(sector => params.append('sectors', sector));
    // params.append('sectors', filters.sectors);
  }
  if (filters.states && filters.states.length > 0) {
    filters.states.forEach(state => params.append('states', state));
    // params.append('states', filters.states);
  }
  if (filters.page) params.append('page', filters.page);
  if (filters.limit) params.append('limit', filters.limit);

  const queryString = params.toString();
  const url = queryString ? `/users/projects?${queryString}` : '/users/projects';
  const response = await apiClient.get(url);
  return response.data;
};

export const exportProjectsToExcel = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.months && filters.months.length > 0) {
    filters.months.forEach(month => params.append('months', month));
  }
  if (filters.sectors && filters.sectors.length > 0) {
    filters.sectors.forEach(sector => params.append('sectors', sector));
  }

  const queryString = params.toString();
  const url = queryString ? `/users/projects/export/excel?${queryString}` : '/users/projects/export/excel';
  
  const response = await apiClient.get(url, {
    responseType: 'blob'
  });
  return response.data;
};