import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import Login from './components/Home/login/Login';
import { AuthWrapper } from './assets/wrapper/AuthWrapper'


function App() {
  return (
    <BrowserRouter>
      <AuthWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        </Routes>
      </AuthWrapper>
    </BrowserRouter>
  );
}

export default App;
