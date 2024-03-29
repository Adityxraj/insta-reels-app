import Signup from './Components/Signup';
import Login from './Components/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AuthProvider from './Context/AuthContext';
import Feed from './Components/Feed';
// import PrivateRoute from './Components/PrivateRoute';
import Profile from './Components/Profile';
import Ioa from './Components/Ioa';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/profile/:id" element={<Profile />}/>
          {/* Since we cant have different routes for different users, so we pass in "id" so as differentiate*/}
          <Route path="/" element={
            <PrivateRoute>
              <Feed />
            </PrivateRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;