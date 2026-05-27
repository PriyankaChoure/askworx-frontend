import React from "react";

const ProjectDetails = ({project, isOpen, onClose}) => {
    if (!isOpen || !project) return null;
    return (
        <>
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
        />
        {/* Modal */}
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-full overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Project Details</h2>
                    <button
                    onClick={onClose}
                    className="text-white hover:bg-blue-700 rounded-full p-1 transition"
                    >
                    ✕
                    </button>
                </div>
                <div className="px-6 py-6">
                    {/* Plan Info */}
                    <div className="mb-6">
                        <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">Project</h3>
                    <span className="text-xl font-semibold text-gray-900 mr-10">Code:</span>
                    <span className="text-xl font-semibold text-gray-600">{project.projectCode}</span>
                    <br/>
                    <span className="text-xl font-semibold text-gray-900 mr-2">Product:</span>
                    <span className="text-xl font-semibold text-gray-600"> {project.product}</span>
                    <br/>
                    <span className="text-xl font-semibold text-gray-900 mr-10">Title:</span>
                    <span className="text-xl font-semibold text-gray-600"> {project.projectTitle}</span>
                    </div>
                    <div>
                        <br/>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2 mr-4">Details</h3>
                        <p className="text-xl font-bold text-gray-600">{project.projectDetails}</p>
                    </div>
                    <div>
                        <br/>
                        <span className="text-xl font-semibold text-gray-900 mr-4">Status:</span>
                        <span className="text-xl font-semibold text-gray-600">{project.status}</span>
                        <br/>
                        <span className="text-xl font-semibold text-gray-900 mr-8">City:</span>
                        <span className="text-xl font-semibold text-gray-600"> {project.city}</span>
                        <br/>
                        <span className="text-xl font-semibold text-gray-900 mr-4">State:</span>
                        <span className="text-xl font-semibold text-gray-600"> {project.state}</span>
                    </div>
                    <div>
                        <br/>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">Contact Details</h3>
                        <span className="text-xl font-semibold text-gray-900 mr-4">Contact:</span>
                        <span className="text-xl font-semibold text-gray-600">{project.contactDetails}</span>
                        <br/>
                        <span className="text-xl font-semibold text-gray-900 mr-2">Expected Completion Date:</span>
                        <span className="text-xl font-semibold text-gray-600">{project?.expectedCompletionDate ?? "N/A"}</span>
                        <br/>
                        <span className="text-xl font-semibold text-gray-900 mr-4">Contractor Name:</span>
                        <span className="text-xl font-semibold text-gray-600">{project.contractor}</span>
                        <br/>
                        <span className="text-xl font-semibold text-gray-900 mr-12">Project Cost:</span>
                        <span className="text-xl font-semibold text-gray-600">{project.projectValue}</span>
                        <br/>                        
                    </div>
                    
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default ProjectDetails;