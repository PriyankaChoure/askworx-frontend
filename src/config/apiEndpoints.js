// API Endpoints Configuration
// Centralized mapping of all API endpoints
// Grouped by functionality for better organization

export const AUTH_API = {
  LOGIN: '/auth/login',
  REFRESH: '/auth/refresh',
  LOGOUT: '/auth/logout',
  CHANGE_PASSWORD: '/auth/change-password',
  RESET_FIRST_PASSWORD: '/auth/reset-first-password',
};

export const ADMIN_API = {
  GET_USERS: '/admin/users',
  CREATE_USER: '/admin/users',
  UPDATE_USER_STATUS: (userId, action) => `/admin/users/${userId}/${action}`,
  GET_SUBSCRIPTION_PLANS: '/admin/subscription-plans',
  GET_DASHBOARD_STATS: '/admin/dashboard/stats',
  ASSIGN_PLAN: '/admin/assign-plan',
  GET_PROJECTS: '/admin/projects',
  GET_PROJECT_FILTERS: '/admin/projects/filters',
  TOGGLE_PROJECT_STATUS: (projectId) => `/admin/projects/${projectId}/toggle-status`,
  IMPORT_PROJECTS: '/admin/projects/import',
};

export const USER_API = {
  // Placeholder for user-specific endpoints
  // Add as needed: e.g., GET_PROFILE: '/users/profile'
   GET_USER_SUBSCRIPTION_PLANS: '/users/subscription-plans',
};