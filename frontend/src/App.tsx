import { Outlet } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';

import useLocalStorage from 'use-local-storage';

function App() {
  const [darkMode, setDarkMode] = useLocalStorage('theme', false);
  return (
    <div
      className={`${darkMode ? 'dark' : 'light'} text-foreground bg-background`}
    >
      <div className=" flex flex-col justify-between min-h-screen  ">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div>
          <main className="mt-2 max-w-5xl mx-auto px-2 md:px-0">
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
