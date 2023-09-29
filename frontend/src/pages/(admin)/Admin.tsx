import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import useLocalStorage from 'use-local-storage';

function Admin() {
  const [darkMode] = useLocalStorage('theme', false);

  return (
    <div
      className={`${
        darkMode ? 'dark' : 'light'
      } min-h-[70vh] text-foreground bg-background`}
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
      <div className=" mt-2 mb-auto ">
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
