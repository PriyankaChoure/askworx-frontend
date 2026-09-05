import React, { useState, useEffect } from 'react';
import MultiSelect from './reusableElements/MultiSelectDropdown';
import ProjectDetails from './ProjectDetals';

const ROWS_PER_PAGE = 10;

const ProjectTable = ({ projects, groupedProjects, allowedStates, allowedSectors, filters, onFilterChange, isLoading }) => {
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grouped'
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = projects ? projects.length : 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / ROWS_PER_PAGE));
  const paginatedProjects = projects
    ? projects.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE)
    : [];

  // Reset to page 1 whenever the underlying project list changes (e.g. filters change)
  useEffect(() => {
    setCurrentPage(1);
  }, [projects]);

  // Clear all filters
  const handleClearFilters = () => {
    onFilterChange({
      states: allowedStates,
      sectors: allowedSectors,
      dateFilter: { fromDate: null, toDate: null }
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

  // <input type="date"> requires a yyyy-MM-dd string value
  const toDateInputValue = (date) => {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().split('T')[0];
  };

  const hasActiveFilters = allowedSectors.length > 0 || allowedStates.length > 0;

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>

          {/* Date Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Filter</label>
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                From
                <input
                  type="date"
                  value={toDateInputValue(filters.dateFilter.fromDate)}
                  max={toDateInputValue(filters.dateFilter.toDate) || undefined}
                  onChange={(e) =>
                    onFilterChange(prev => ({
                      ...prev,
                      dateFilter: {
                        ...prev.dateFilter,
                        fromDate: e.target.value ? e.target.value : null
                      }
                    }))
                  }
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <label className="flex items-center gap-2 text-sm text-gray-600">
                To
                <input
                  type="date"
                  value={toDateInputValue(filters.dateFilter.toDate)}
                  min={toDateInputValue(filters.dateFilter.fromDate) || undefined}
                  onChange={(e) =>
                    onFilterChange(prev => ({
                      ...prev,
                      dateFilter: {
                        ...prev.dateFilter,
                        toDate: e.target.value ? e.target.value : null
                      }
                    }))
                  }
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>

              {(filters.dateFilter.fromDate || filters.dateFilter.toDate) && (
                <button
                  onClick={() => onFilterChange(prev => ({
                    ...prev,
                    dateFilter: { fromDate: null, toDate: null }
                  }))}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear dates
                </button>
              )}
            </div>
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
        <span className="ml-auto text-lg text-gray-700">
          Total Projects: {projects ? projects.length : 0}
        </span>
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
                    <th className="px-6 py-3 text-left font-semibold text-gray-900">Number</th>
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
                  {paginatedProjects.map((project, index) => (
                    <tr key={project._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <span className="inline-block bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                          {index + 1 + (currentPage - 1) * ROWS_PER_PAGE}
                        </span>
                      </td>
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
          ) : null}

          {/* Pagination Controls */}
          {projects && projects.length > 0 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Showing {(currentPage - 1) * ROWS_PER_PAGE + 1}
                {'-'}
                {Math.min(currentPage * ROWS_PER_PAGE, totalItems)} of {totalItems}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    // Show first, last, current, and neighbors of current page
                    return (
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(page - currentPage) <= 1
                    );
                  })
                  .reduce((acc, page, idx, arr) => {
                    if (idx > 0 && page - arr[idx - 1] > 1) {
                      acc.push('ellipsis-' + page);
                    }
                    acc.push(page);
                    return acc;
                  }, [])
                  .map((page) =>
                    typeof page === 'string' ? (
                      <span key={page} className="px-2 text-gray-400 text-sm">
                        …
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {(!projects || projects.length === 0) && (
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
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
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
