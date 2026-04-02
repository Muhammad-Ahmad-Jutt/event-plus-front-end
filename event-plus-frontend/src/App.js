import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import Homepage from './pages/Homepage';

function App() {
  return (
    <>
      <Header />
      <main style={{ padding: '20px', marginTop: '60px' }}>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;