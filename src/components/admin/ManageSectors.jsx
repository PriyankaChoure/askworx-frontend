import React, { useState, useEffect } from 'react';
import * as adminService from '../../services/adminService';

export default function ManageSectors() {
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '' });
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch sectors on component mount
  useEffect(() => {
    fetchSectors();
  }, []);

  const fetchSectors = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminService.getSectors();
      setSectors(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch sectors');
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setFormData({ name: '' });
    setEditingId(null);
    setShowForm(true);
  };

  const handleEditClick = (sector) => {
    setFormData({ name: sector.name });
    setEditingId(sector._id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({ name: '' });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Sector name is required');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      if (editingId) {
        await adminService.updateSector(editingId, formData);
      } else {
        await adminService.createSector(formData);
      }

      // Refresh the list
      await fetchSectors();
      handleCancel();
    } catch (err) {
      setError(err.message || 'Failed to save sector');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (sectorId) => {
    try {
      setError(null);
      await adminService.toggleSector(sectorId);
      await fetchSectors();
    } catch (err) {
      setError(err.message || 'Failed to toggle sector');
    }
  };

  // Filter sectors based on search term
  const filteredSectors = sectors.filter(sector =>
    sector.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Separate active and inactive
  const activeSectors = filteredSectors.filter(s => s.isActive);
  const inactiveSectors = filteredSectors.filter(s => !s.isActive);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading sectors...</p>
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
        <h2 className="text-2xl font-bold text-gray-900">Manage Sectors</h2>
        {!showForm && (
          <button
            onClick={handleAddClick}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <span className="mr-2">➕</span>
            Add Sector
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingId ? 'Edit Sector' : 'Add New Sector'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Sector Name *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Information Technology"
              />
            </div>
            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                {submitting ? 'Saving...' : 'Save Sector'}
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
            placeholder="Search sectors by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      {/* Active Sectors */}
      {!showForm && (
        <>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Active Sectors ({activeSectors.length})
            </h3>
            {activeSectors.length === 0 ? (
              <p className="text-gray-500 italic">No active sectors found</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeSectors.map((sector) => (
                  <div key={sector._id} className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{sector.name}</h4>
                        <p className="mt-1 text-xs text-gray-500">
                          Active • {new Date(sector.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => handleEditClick(sector)}
                        className="flex-1 text-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Deactivate ${sector.name}?`)) {
                            handleToggleActive(sector._id);
                          }
                        }}
                        className="flex-1 text-center px-3 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100"
                      >
                        Deactivate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Inactive Sectors */}
          {inactiveSectors.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Inactive Sectors ({inactiveSectors.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 opacity-75">
                {inactiveSectors.map((sector) => (
                  <div key={sector._id} className="bg-gray-50 rounded-lg shadow p-4 border border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-700">{sector.name}</h4>
                        <p className="mt-1 text-xs text-gray-500">
                          Inactive • {new Date(sector.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                        Inactive
                      </span>
                    </div>
                    <div className="mt-4 flex">
                      <button
                        onClick={() => {
                          if (window.confirm(`Activate ${sector.name}?`)) {
                            handleToggleActive(sector._id);
                          }
                        }}
                        className="flex-1 text-center px-3 py-2 border border-green-300 text-sm font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100"
                      >
                        Activate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
