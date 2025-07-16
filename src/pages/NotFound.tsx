
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="p-8">
          <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-8 h-8 text-stone-400" />
          </div>
          <h1 className="text-4xl font-bold text-stone-800 mb-2">404</h1>
          <h2 className="text-xl font-semibold text-stone-700 mb-4">Page Not Found</h2>
          <p className="text-stone-600 mb-6">
            The stone heritage site you're looking for seems to be lost in time.
          </p>
          <div className="space-y-3">
            <Link to="/" className="block">
              <Button className="w-full">
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Button>
            </Link>
            <Link to="/search" className="block">
              <Button variant="outline" className="w-full">
                <Search className="w-4 h-4 mr-2" />
                Search Sites
              </Button>
            </Link>
          </div>
          <p className="text-xs text-stone-500 mt-6">
            Route: {location.pathname}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
