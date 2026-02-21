import React, { useState, useEffect, useCallback } from 'react';
import { getProjects, getFilterOptions, toggleProjectStatus, importProjects } from '../../services/adminService';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({});
  const [filterOptions, setFilterOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});

  // Import related state
  const [showImportModal, setShowImportModal] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [sourceMonth, setSourceMonth] = useState('');
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState(null);

  const fetchFilterOptions = async () => {
    try {
      const options = await getFilterOptions();
      setFilterOptions(options);
    } catch (err) {
      console.error('Failed to fetch filter options:', err);
    }
  };

  const fetchProjects = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const params = { ...filters, page };
      const response = await getProjects(params);
      setProjects(response.projects);
      setPagination(response.pagination);
    } catch (err) {
      console.error('Projects fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchFilterOptions();
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    fetchProjects();
  }, [filters, fetchProjects]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value || undefined
    }));
  };

  const handleToggleStatus = async (projectId) => {
    try {
      await toggleProjectStatus(projectId);
      fetchProjects(pagination.page);
    } catch (err) {
      alert('Failed to toggle project status');
      console.error(err);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ];
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid Excel file (.xls or .xlsx)');
        return;
      }
      setImportFile(file);
    }
  };

  const handleImport = async () => {
    if (!importFile || !sourceMonth) {
      alert('Please select a file and enter source month');
      return;
    }

    setImporting(true);
    setImportResult(null);

    try {
      const result = await importProjects(importFile, sourceMonth);
      setImportResult(result);

      // Refresh projects list
      fetchProjects();
      fetchFilterOptions();

      // Reset form
      setImportFile(null);
      setSourceMonth('');
      document.getElementById('file-input').value = '';

    } catch (error) {
      console.error('Import error:', error);
      setImportResult({
        message: 'Import failed',
        summary: { errors: 1 },
        errors: [{ reason: error.response?.data?.message || error.message }]
      });
    } finally {
      setImporting(false);
    }
  };

  const resetImportModal = () => {
    setShowImportModal(false);
    setImportFile(null);
    setSourceMonth('');
    setImportResult(null);
    setImporting(false);
    if (document.getElementById('file-input')) {
      document.getElementById('file-input').value = '';
    }
  };

  if (loading && projects.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Project Management</h2>
          <p className="text-gray-600">Manage and view all projects in the system.</p>
        </div>
        <button
          onClick={() => setShowImportModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Import Excel
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={filters.sector || ''}
            onChange={(e) => handleFilterChange('sector', e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Sectors</option>
            {filterOptions.sectors?.map(sector => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </select>

          <select
            value={filters.state || ''}
            onChange={(e) => handleFilterChange('state', e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All States</option>
            {filterOptions.states?.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>

          <select
            value={filters.status || ''}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            {filterOptions.statuses?.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <select
            value={filters.month || ''}
            onChange={(e) => handleFilterChange('month', e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Months</option>
            {filterOptions.months?.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sector
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  State
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value (₹)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    {loading ? 'Loading projects...' : 'No projects found'}
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {project.projectCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {project.projectTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {project.sector}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {project.state}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        project.status === 'Ongoing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{project.projectValue?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => {/* Handle view/edit */}}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggleStatus(project._id)}
                        className={`${
                          project.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                        }`}
                      >
                        {project.isActive ? 'Disable' : 'Enable'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} projects
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => fetchProjects(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-sm">
              Page {pagination.page} of {pagination.pages}
            </span>
            <button
              onClick={() => fetchProjects(pagination.page + 1)}
              disabled={pagination.page === pagination.pages}
              className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Add Project Button */}
      <div className="mt-8 text-center">
        <button className="bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
          + Add New Project
        </button>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Import Projects from Excel</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Excel File
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    accept=".xls,.xlsx"
                    onChange={handleFileChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {importFile && (
                    <p className="text-sm text-gray-600 mt-1">
                      Selected: {importFile.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Source Month
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Jan-2025"
                    value={sourceMonth}
                    onChange={(e) => setSourceMonth(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Format: MMM-YYYY (e.g., Jan-2025)
                  </p>
                </div>

                {importResult && (
                  <div className={`p-3 rounded-md ${importResult.summary?.errors > 0 ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
                    <h4 className="font-medium text-sm mb-2">
                      {importResult.message}
                    </h4>
                    <div className="text-sm space-y-1">
                      <p>Total Rows: {importResult.summary?.totalRows || 0}</p>
                      <p>Inserted: {importResult.summary?.inserted || 0}</p>
                      <p>Updated: {importResult.summary?.updated || 0}</p>
                      <p>Skipped: {importResult.summary?.skipped || 0}</p>
                      {importResult.errors && importResult.errors.length > 0 && (
                        <div className="mt-2">
                          <p className="font-medium">Errors:</p>
                          <div className="max-h-32 overflow-y-auto">
                            {importResult.errors.slice(0, 5).map((error, index) => (
                              <p key={index} className="text-red-600 text-xs">
                                Row {error.row}: {error.reason}
                              </p>
                            ))}
                            {importResult.errors.length > 5 && (
                              <p className="text-xs text-gray-500">
                                ... and {importResult.errors.length - 5} more errors
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={resetImportModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  disabled={importing}
                >
                  Cancel
                </button>
                <button
                  onClick={handleImport}
                  disabled={!importFile || !sourceMonth || importing}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {importing ? 'Importing...' : 'Import'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;