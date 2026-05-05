import React from 'react';

const ErrorBanner = ({ message, onRetry }) => {
  return (
    <div className="max-w-md mx-auto text-center py-12 px-6">
      <div className="bg-red-50 border border-red-200 p-8 rounded-3xl shadow-sm">
        <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-xl font-black text-red-900 mb-2 uppercase">Sync Error</h3>
        <p className="text-red-600 font-medium mb-6">{message}</p>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="bg-red-600 text-white font-bold px-8 py-3 rounded-2xl hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-red-200"
          >
            TRY AGAIN
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorBanner;
