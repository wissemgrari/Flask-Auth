import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserContextProvider from './context/userContext';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <UserContextProvider>
      <div className='container'>
        <Router>
          <Routes>
            <Route path='/'>
              <Route index element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Route>
          </Routes>
        </Router>
        <ToastContainer
          position='top-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme='light'
        />
      </div>
    </UserContextProvider>
  );
}

export default App;
