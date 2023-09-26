import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import useLocalStorage from 'use-local-storage';

function Admin() {
  const [darkMode] = useLocalStorage('theme', false);

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
      <div>
        <div>
          <main className="mt-2 max-w-5xl mx-auto px-2 md:px-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default Admin;
