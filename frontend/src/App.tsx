import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';

import useLocalStorage from 'use-local-storage';
import { useAppSelector } from './hooks/RTKHooks';
import { Toaster } from 'sonner';
import AdminNavbar from './components/admin/AdminNavbar';

function App() {
  const [darkMode, setDarkMode] = useLocalStorage('theme', false);
  const { user } = useAppSelector((state) => state.authReducer);
  const location = useLocation();
  return (
    <div
      className={`${darkMode ? 'dark' : 'light'} text-foreground bg-background`}
    >
      <Toaster
        richColors
        position="top-center"
        closeButton
        toastOptions={{
          style: {
            fontSize: '17px',
          },
        }}
      />
      <div className=" flex flex-col justify-between min-h-screen  ">
        {location.pathname.includes('admin') && user?.isAdmin ? (
          <AdminNavbar darkMode={darkMode} setDarkMode={setDarkMode} />
        ) : (
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        )}
        <div>
          <main className="mt-2 mb-auto max-w-5xl mx-auto px-2 md:px-0">
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
