import React from 'react'
import { Link } from 'react-router-dom'

const AccessDeniedPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <i className="bi bi-x-circle-fill text-red-500 text-5xl mr-3"></i>
          <h2 className="text-2xl font-semibold">Access Denied</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Sorry, but you don't have access to view this page.
        </p>
        <Link
          to="/"
          className="block text-center bg-blue-500 text-white py-2 rounded-md transition hover:bg-blue-600"
        >
          Go back to home
        </Link>
      </div>
    </div>
  )
}

export default AccessDeniedPage