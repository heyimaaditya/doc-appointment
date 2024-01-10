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
import Users from "./pages/admin/Users";
import Doctors from "./pages/admin/Doctors";
import Profile from "./pages/doctor/Profile";
import BookingPage from "./pages/BookingPage";
import AppointmentsPage from './pages/AppointmentsPage';

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
              path="/appointments"
              element={
                <ProtectedRoute>
                  <AppointmentsPage/>
                </ProtectedRoute>
              }
            />
        <Route
              path="/doctor/profile/:id"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
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
        
         <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
             <Route
              path="/doctor/book-appointment/:doctorId"
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/doctors"
              element={
                <ProtectedRoute>
                  <Doctors />
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
