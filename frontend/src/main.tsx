import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import Login from './pages/Login.tsx';
import Home from './pages/Home.tsx';
import Register from './pages/Register.tsx';
import { store } from './store.tsx';
import axios from 'axios';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Admin from './pages/(admin)/Admin.tsx';
import ProtectAdmin from './protect/protectAdmin.tsx';
import Dashboard from './pages/(admin)/Dashboard.tsx';
import Categories from './pages/(admin)/Categories.tsx';
import Colors from './pages/(admin)/Colors.tsx';
import Products from './pages/(admin)/Products.tsx';
import Profile from './pages/Profile.tsx';
import Size from './pages/(admin)/Size.tsx';
import CreateProduct from './pages/(admin)/CreateProduct.tsx';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:4000/' : '';

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index={true} element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route
        path="admin/:id"
        element={
          <ProtectAdmin>
            <Admin />
          </ProtectAdmin>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="categories" element={<Categories />} />
        <Route path="sizes" element={<Size />} />
        <Route path="colors" element={<Colors />} />
        <Route path="products" element={<Products />} />
        <Route path="products/create" element={<CreateProduct />} />
      </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <RouterProvider router={router} />
        </NextUIProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
