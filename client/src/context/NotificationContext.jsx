import { createContext, useContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

const NotificationContext = createContext();

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, { ...action.payload, id: uuidv4() }];
    case 'REMOVE':
      return state.filter(n => n.id !== action.payload);
    default:
      return state;
  }
}

export const NotificationProvider = ({ children }) => {
  const [notifications, dispatch] = useReducer(reducer, initialState);

  const notify = (message, type = 'info', duration = 5000) => {
    const id = uuidv4();
    dispatch({ type: 'ADD', payload: { message, type, id } });
    if (duration) {
      setTimeout(() => dispatch({ type: 'REMOVE', payload: id }), duration);
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications, notify }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);