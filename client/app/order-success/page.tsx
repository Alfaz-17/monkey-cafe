export default function OrderSuccessPage() {
    return (
      <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Received!</h1>
        <p className="text-gray-600 mb-8">The kitchen has started preparing your order.</p>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border w-full max-w-sm">
            <p className="text-sm text-gray-500 mb-2">Order Status</p>
            <div className="text-xl font-bold text-green-600">Pending</div>
        </div>

        <button className="mt-8 text-green-700 font-medium underline">
            Track Order Status
        </button>
      </div>
    );
  }
