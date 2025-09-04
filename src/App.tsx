import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import RecommendationsPage from './pages/RecommendationsPage';
import FundDetailsPage from './pages/FundDetailsPage';
import { UserProvider } from './context/UserContext';
import { FundsProvider } from './context/FundsContext';

function App() {
  return (
    <UserProvider>
      <FundsProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="recommendations" element={<RecommendationsPage />} />
            <Route path="fund/:id" element={<FundDetailsPage />} />
          </Route>
        </Routes>
      </FundsProvider>
    </UserProvider>
  );
}

export default App;