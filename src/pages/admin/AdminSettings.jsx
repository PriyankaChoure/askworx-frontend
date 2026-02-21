import React, { useState } from 'react';
import ManageStates from '../../components/admin/ManageStates';
import ManageSectors from '../../components/admin/ManageSectors';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('states');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-2 text-gray-600">Manage master data configuration</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('states')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'states'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="flex items-center">
                <span className="w-5 h-5 mr-2">📍</span>
                States
              </span>
            </button>
            <button
              onClick={() => setActiveTab('sectors')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'sectors'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="flex items-center">
                <span className="w-5 h-5 mr-2">🏭</span>
                Sectors
              </span>
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'states' && <ManageStates />}
        {activeTab === 'sectors' && <ManageSectors />}
      </div>
    </div>
  );
}
