import { Button } from '../utils/Buttons';
import { XCircle } from 'lucide-react';

const CancelPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <XCircle className="text-red-500" size={80} />
      <h1 className="text-3xl font-bold mt-6 mb-2 text-gray-900">Payment Cancelled</h1>
      <p className="text-gray-700 mb-6 text-center max-w-md">
        Your payment was cancelled. You can continue shopping or try again later.
      </p>
      <a href="/">
        <Button variant="primary" size="md">
          Go to Home
        </Button>
      </a>
    </div>
  );
};

export default CancelPage;
