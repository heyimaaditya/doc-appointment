//import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinners';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';
import NotificationPage from './pages/NotificationPage';
function App() {
  const {loading}=useSelector((state)=>state.alerts);
  return (
    <BrowserRouter>
    {loading ? (
      <Spinner/>
    ):(
      <Routes>
        <Route path='/' 
        element={
          <ProtectedRoute>
            <HomePage/>
          </ProtectedRoute>
          }
        />
        <Route path='/login' 
        element={
          <PublicRoute>
            <Login/>
          </PublicRoute>
          }
        />
        <Route path='/register' 
        element={
          <PublicRoute>
            <Register/>
          </PublicRoute>
          }
        />
        <Route
              path="/notification"
              element={
                <ProtectedRoute>
                  <NotificationPage />
                </ProtectedRoute>
              }
            />
        <Route path='/apply-doctor' 
        element={
          <ProtectedRoute>
            <ApplyDoctor/>
          </ProtectedRoute>
          }
        />
      </Routes>
    )}
    </BrowserRouter>
      
  );
}

export default App;
