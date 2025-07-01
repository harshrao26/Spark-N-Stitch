export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-white  ">
      <div className="text-center space-y-4">
        {/* Spinner */}
        <div className="flex justify-center">
          <div className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Brand Text */}
        {/* <h2 className="text-xl font-semibold text-gray-700">Processing your checkout...</h2>
        <p className="text-gray-500 text-sm">Hang tight! We're confirming your payment and finalizing your order.</p> */}
      </div>
    </div>
  );
}
