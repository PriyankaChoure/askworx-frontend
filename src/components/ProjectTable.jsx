import React, { useState } from 'react';
import MultiSelect from './reusableElements/MultiSelectDropdown';
import ProjectDetails from './ProjectDetals';

const ProjectTable = ({ projects, groupedProjects, allowedStates, allowedSectors, filters, onFilterChange, isLoading }) => {
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grouped'
  const [selectedProject, setSelectedProject] = useState(null);

  const updateFilter = (key, value) => {
    console.log('key -', key, value);
    onFilterChange(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Clear all filters
  const handleClearFilters = () => {
    onFilterChange({
      states: allowedStates,
      sectors: allowedSectors,
      dateFilter: { type: 'LAST_7_DAYS', months: [] }
    });
  };


  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const hasActiveFilters = allowedSectors.length > 0 || allowedStates.length > 0;

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>

          {/* Month Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Time Filter
            </label>

            <div className="flex gap-4 mb-3">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={filters.dateFilter.type === 'LAST_7_DAYS'}
                  onChange={() =>
                    updateFilter('dateFilter', { type: 'LAST_7_DAYS', months: [] })
                  }
                />
                Last 7 Days
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={filters.dateFilter.type === 'MONTHS'}
                  onChange={() =>
                    updateFilter('dateFilter', {
                      type: 'MONTHS',
                      months: filters.dateFilter.months || []
                    })
                  }
                />
                Month Wise
              </label>
            </div>

            {filters.dateFilter.type === 'MONTHS' && (
              <div className="flex flex-wrap gap-2">
                {['Jan 2025', 'Feb 2025', 'Mar 2025'].map(month => (
                  <button
                    key={month}
                    onClick={() =>
                      updateFilter('dateFilter', {
                        type: 'MONTHS',
                        months: filters.dateFilter.months.includes(month)
                          ? filters.dateFilter.months.filter(m => m !== month)
                          : [...filters.dateFilter.months, month]
                      })
                    }
                    className={`px-4 py-2 rounded-lg text-sm ${
                      filters.dateFilter.months.includes(month)
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100'
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sector Filter */}
          <MultiSelect
            label="Sectors"
            options={allowedSectors}
            selected={filters.sectors}
            onChange={(updated) =>
              onFilterChange(prev => ({
                ...prev,
                sectors: updated
              }))
            }
          />

          {/* State Filter */}
          <MultiSelect
            label="States"
            options={allowedStates}
            selected={filters.states}
            onChange={(updated) =>
              onFilterChange(prev => ({
                ...prev,
                states: updated
              }))
            }
          />


          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* View Mode Selector */}
      <div className="flex gap-2">
        <button
          onClick={() => setViewMode('table')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            viewMode === 'table'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Table View
        </button>
        <button
          onClick={() => setViewMode('grouped')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            viewMode === 'grouped'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Grouped View
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Table View */}
      {!isLoading && viewMode === 'table' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {projects && projects.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-gray-900">Code</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-900">Title</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-900">Sector</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-900">State</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-900">Value</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-900">Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {projects.map((project) => (
                    <tr key={project._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-blue-600 font-medium cursor-pointer hover:underline">
                        <button onClick={() => setSelectedProject(project)}>
                          {project.projectCode}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-gray-900">{project.projectTitle}</td>
                      <td className="px-6 py-4">
                        <span className="inline-block bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                          {project.sector}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{project.state}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${
                          project.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : project.status === 'Completed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {project.projectValue ? `₹${parseInt(project.projectValue).toLocaleString()}` : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-xs">{formatDate(project.updatedDate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500">No projects found matching your filters.</p>
            </div>
          )}
        </div>
      )}

      {/* Grouped View */}
      {!isLoading && viewMode === 'grouped' && groupedProjects && (
        <div className="space-y-6">
          {/* Grouped by Sector */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">By Sector</h3>
            <div className="space-y-4">
              {Object.entries(groupedProjects.bySector || {}).map(([sector, projectList]) => (
                <div key={sector} className="bg-white rounded-lg shadow p-6">
                  <h4 className="font-medium text-gray-900 mb-3">
                    {sector} ({projectList.length})
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projectList.slice(0, 4).map((project) => (
                      <div key={project._id} className="border border-gray-200 rounded p-4">
                        <p className="font-medium text-gray-900">{project.projectCode}</p>
                        <p className="text-sm text-gray-600 mt-1">{project.projectTitle}</p>
                        <p className="text-xs text-gray-500 mt-2">{project.state}</p>
                      </div>
                    ))}
                  </div>
                  {projectList.length > 4 && (
                    <p className="text-sm text-gray-500 mt-3">
                      +{projectList.length - 4} more projects
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && projects && projects.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-500 mt-4">No projects available</p>
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2"
            >
              Try clearing your filters
            </button>
          )}
        </div>
      )}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative">
            {/* Project Details Component */}
            <ProjectDetails 
              project={selectedProject} 
              isOpen={true} 
              onClose={()=> setSelectedProject(null)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectTable;
