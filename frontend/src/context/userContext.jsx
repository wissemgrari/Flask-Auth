import { createContext, useReducer } from 'react';
import { userReducer } from './userReducer';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuth: JSON.parse(localStorage.getItem('auth')) || null,
  isLoading: false,
  error: null,
};

export const UserContext = createContext(initialState);

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
