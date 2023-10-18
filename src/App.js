import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Countries from './components/Countries';
import CountriesSingle from './components/CountriesSingle';
import Home from './components/Home';
import Layout from './pages/Layout';

import 'bootstrap-icons/font/bootstrap-icons.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from 'react-scroll-to-top';
import ProtectedRoute from './auth/ProtectedRoute';
import { auth } from './auth/firebase';
import Favourites from './components/Favourites';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  const [user] = useAuthState(auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route element={<ProtectedRoute user={user} />}>
            <Route path='/countries' element={<Countries />} />
            <Route path='/favourites' element={<Favourites />} />
            <Route path='/countries/:single' element={<CountriesSingle />} />
          </Route>
        </Route>
      </Routes>
      <Toaster position='bottom-center' />
      <ScrollToTop
        smooth
        component={<i className='bi bi-arrow-up'></i>}
        className='rounded-circle p-2 bg-primary text-white'
      />
    </BrowserRouter>
  );
};

export default App;
