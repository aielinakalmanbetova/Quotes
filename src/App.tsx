import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home/Home';
import Navbar from './components/Navbar/Navbar';
import QuoteAdd from './components/QuoteAdd/QuoteAdd';
import QuoteEdite from './components/QuoteEdit/QuoteEdite';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/category/:id' element={<Home />} />
        <Route path='/new-quote' element={<QuoteAdd />} />
        <Route path='/quotes/:id/edit' element={<QuoteEdite />} />
      </Routes>
    </>
  );
};

export default App;
