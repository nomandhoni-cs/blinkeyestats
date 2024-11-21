import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Overview from './pages/Overview';
import Details from './pages/Details';
import Version from './pages/Version';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="details" element={<Details />} />
          <Route path="version/:tagName" element={<Version />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;