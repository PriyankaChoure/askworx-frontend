import React, { useState, useEffect } from 'react';
import * as adminService from '../../services/adminService';

export default function ManageStates() {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', code: '' });
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch states on component mount
  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminService.getStates();
      setStates(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch states');
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setFormData({ name: '', code: '' });
    setEditingId(null);
    setShowForm(true);
  };

  const handleEditClick = (state) => {
    setFormData({ name: state.name, code: state.code || '' });
    setEditingId(state._id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({ name: '', code: '' });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('State name is required');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      if (editingId) {
        await adminService.updateState(editingId, formData);
      } else {
        await adminService.createState(formData);
      }

      // Refresh the list
      await fetchStates();
      handleCancel();
    } catch (err) {
      setError(err.message || 'Failed to save state');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (stateId) => {
    try {
      setError(null);
      await adminService.toggleState(stateId);
      await fetchStates();
    } catch (err) {
      setError(err.message || 'Failed to toggle state');
    }
  };

  // Filter states based on search term
  const filteredStates = states.filter(state =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (state.code && state.code.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Separate active and inactive
  const activeStates = filteredStates.filter(s => s.isActive);
  const inactiveStates = filteredStates.filter(s => !s.isActive);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading states...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-2xl">⚠️</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Manage States</h2>
        {!showForm && (
          <button
            onClick={handleAddClick}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <span className="mr-2">➕</span>
            Add State
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingId ? 'Edit State' : 'Add New State'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                State Name *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Karnataka"
              />
            </div>
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                State Code (Optional)
              </label>
              <input
                type="text"
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., KA"
                maxLength="3"
              />
              <p className="mt-1 text-xs text-gray-500">Max 3 characters, will be auto-converted to uppercase</p>
            </div>
            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                {submitting ? 'Saving...' : 'Save State'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      {!showForm && (
        <div>
          <input
            type="text"
            placeholder="Search states by name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      {/* Active States */}
      {!showForm && (
        <>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Active States ({activeStates.length})
            </h3>
            {activeStates.length === 0 ? (
              <p className="text-gray-500 italic">No active states found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Code
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {activeStates.map((state) => (
                      <tr key={state._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {state.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {state.code || '—'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                          <button
                            onClick={() => handleEditClick(state)}
                            className="text-blue-600 hover:text-blue-900 font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Deactivate ${state.name}?`)) {
                                handleToggleActive(state._id);
                              }
                            }}
                            className="text-red-600 hover:text-red-900 font-medium"
                          >
                            Deactivate
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Inactive States */}
          {inactiveStates.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Inactive States ({inactiveStates.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Code
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 opacity-75">
                    {inactiveStates.map((state) => (
                      <tr key={state._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                          {state.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {state.code || '—'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                          <button
                            onClick={() => {
                              if (window.confirm(`Activate ${state.name}?`)) {
                                handleToggleActive(state._id);
                              }
                            }}
                            className="text-green-600 hover:text-green-900 font-medium"
                          >
                            Activate
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
