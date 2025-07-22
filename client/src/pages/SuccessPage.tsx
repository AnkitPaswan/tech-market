import { Button } from '../utils/Buttons';
import { CheckCircle } from 'lucide-react';

const SuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <CheckCircle className="text-green-500" size={80} />
      <h1 className="text-3xl font-bold mt-6 mb-2 text-gray-900">Payment Successful</h1>
      <p className="text-gray-700 mb-6 text-center max-w-md">
        Thank you for your purchase! Your order has been placed successfully.
      </p>
      <a href="/">
        <Button variant="primary" size="md">
          Go to Home
        </Button>
      </a>
    </div>
  );
};

export default SuccessPage;
