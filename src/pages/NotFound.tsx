
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-tagalong-gray">
      <div className="bg-white rounded-2xl shadow-md p-10 max-w-md text-center">
        <h1 className="text-6xl font-bold text-tagalong-purple mb-6">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Oops! Page not found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button 
          asChild
          className="bg-tagalong-purple hover:bg-tagalong-purple-dark text-white rounded-full tagalong-button"
        >
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
