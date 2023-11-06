import { BrowserRouter,Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Restaurant from './pages/Restaurant';
import Add from './pages/Add';
import Search from './pages/Search';
import Update from './pages/Update';
import Signup from './pages/signup';
import Login from './pages/Login';
import Logout from './pages/logout';
import Layout from "./components/Layout"
import Profile from './pages/Profile';
import ProtectedRoute from './pages/ProtectedRoute';
import AdminRoute from './pages/AdminRoute';
import Notallow from './pages/NotAllow'

function App() {
  

  return (
    <BrowserRouter>
   
    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<Restaurant />}/>
      <Route path='add' element={<AdminRoute> <Add /> </AdminRoute> }/>
      <Route path='search' element={<ProtectedRoute> <Search /> </ProtectedRoute> }/>
      <Route path='Signup' element={<Signup />}/>
      <Route path='Login' element={<Login />}/>
      <Route path='Logout' element={<Logout />}/>
      <Route path='Profile' element={<ProtectedRoute> <Profile /> </ProtectedRoute> }/>
    
      <Route path='Update/:restaurantId' element={<Update />}/>
      <Route path='notallow' elment={<Notallow />} />
      </Route>
    </Routes>

    </BrowserRouter>
    
  );
}

export default App;
