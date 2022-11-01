export const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOG_IN':
      localStorage.setItem('auth', true);
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        error: null,
        user: action.payload,
        isAuth: true,
      };
    case 'LOG_OUT':
      localStorage.removeItem('user');
      localStorage.removeItem('auth');
      return {
        ...state,
        error: null,
        user: null,
        isAuth: null,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
