import logo from './logo.svg';
import './App.css';
import Signup from './Components/Signup';
import Login from './Components/Login';
import { SignalCellularAltSharp } from '@material-ui/icons';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AuthProvider from './Context/AuthContext';
import Feed from './Components/Feed';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/" element={<Feed />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
