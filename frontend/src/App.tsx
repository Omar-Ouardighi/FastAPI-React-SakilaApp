import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UsersPage from './pages/UsersPage';
import { Button } from "./components/ui/button";
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="border-b">
          <div className="container flex h-16 items-center px-4">
            <div className="flex gap-6 md:gap-10">
              <Link to="/users">
                <Button variant="ghost">
                  Users Management
                </Button>
              </Link>
              <Link to="/charts">
                <Button variant="ghost">
                  Films Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto py-12 px-16 ">
              <Routes>
                <Route path="/users" element={<UsersPage />} />
                <Route path="/charts" element={<DashboardPage />} />
                <Route path="/" element={<UsersPage />} />
              </Routes>

        </main>
      </div>
    </Router>
  );
}

export default App;