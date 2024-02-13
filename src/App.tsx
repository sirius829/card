import React, { Suspense, lazy } from 'react';
import './styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CardList from './components/CardList';

const CardSearch = lazy(() => import('./components/CardSearch'));
const DeckerBuiler = lazy(() => import('./components/DeckBuilder'));
const AverageManaCost = lazy(() => import('./components/AverageManaCost'));

function App() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<CardList />} />
          <Route path='/deck' element={<DeckerBuiler />} />
          <Route path="/average-mana-cost" element={<AverageManaCost deck={[]} />} />
        </Routes>
      </Suspense>
  );
}

export default App;
