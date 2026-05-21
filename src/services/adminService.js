// Admin Service
// Handles all admin-related API calls

import apiClient from './apiClient';
import { ADMIN_API } from '../config/apiEndpoints';

export const getUsers = async () => {
  const response = await apiClient.get(ADMIN_API.GET_USERS);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await apiClient.post(ADMIN_API.CREATE_USER, userData);
  return response.data;
};

export const updateUserStatus = async (userId, action) => {
  const response = await apiClient.patch(ADMIN_API.UPDATE_USER_STATUS(userId, action));
  return response.data;
};

export const getSubscriptionPlans = async () => {
  const response = await apiClient.get(ADMIN_API.GET_SUBSCRIPTION_PLANS);
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await apiClient.get(ADMIN_API.GET_DASHBOARD_STATS);
  return response.data;
};

/**
 * assignmentData may include:
 * { userId, planId, allowedStates, allowedSectors, isPanIndia,
 *   fromDate, toDate, isTrial }
 */
export const assignPlan = async (assignmentData) => {
  const response = await apiClient.post(ADMIN_API.ASSIGN_PLAN, assignmentData);
  return response.data;
};

export const getProjects = async (params = {}) => {
  const response = await apiClient.get(ADMIN_API.GET_PROJECTS, { params });
  return response.data;
};

export const getFilterOptions = async () => {
  const response = await apiClient.get(ADMIN_API.GET_PROJECT_FILTERS);
  return response.data;
};

export const toggleProjectStatus = async (projectId) => {
  const response = await apiClient.patch(ADMIN_API.TOGGLE_PROJECT_STATUS(projectId));
  return response.data;
};

export const importProjects = async (file, sourceMonth) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('sourceMonth', sourceMonth);

  const response = await apiClient.post(ADMIN_API.IMPORT_PROJECTS, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// ================== MASTER DATA ENDPOINTS ==================

// STATE MANAGEMENT
export const getStates = async (isActive = null) => {
  const params = isActive !== null ? { isActive } : {};
  const response = await apiClient.get('/admin/states', { params });
  return response.data;
};

export const getActiveStates = async () => {
  const response = await apiClient.get('/admin/states/active');
  return response.data;
};

export const getStateById = async (stateId) => {
  const response = await apiClient.get(`/admin/states/${stateId}`);
  return response.data;
};

export const createState = async (stateData) => {
  const response = await apiClient.post('/admin/states', stateData);
  return response.data;
};

export const updateState = async (stateId, stateData) => {
  const response = await apiClient.put(`/admin/states/${stateId}`, stateData);
  return response.data;
};

export const toggleState = async (stateId) => {
  const response = await apiClient.put(`/admin/states/${stateId}/toggle`);
  return response.data;
};

// SECTOR MANAGEMENT
export const getSectors = async (isActive = null) => {
  const params = isActive !== null ? { isActive } : {};
  const response = await apiClient.get('/admin/sectors', { params });
  return response.data;
};

export const getActiveSectors = async () => {
  const response = await apiClient.get('/admin/sectors/active');
  return response.data;
};

export const getSectorById = async (sectorId) => {
  const response = await apiClient.get(`/admin/sectors/${sectorId}`);
  return response.data;
};

export const createSector = async (sectorData) => {
  const response = await apiClient.post('/admin/sectors', sectorData);
  return response.data;
};

export const updateSector = async (sectorId, sectorData) => {
  const response = await apiClient.put(`/admin/sectors/${sectorId}`, sectorData);
  return response.data;
};

export const toggleSector = async (sectorId) => {
  const response = await apiClient.put(`/admin/sectors/${sectorId}/toggle`);
  return response.data;
};