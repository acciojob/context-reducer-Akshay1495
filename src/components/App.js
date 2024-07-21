import React, { createContext, useState, useContext } from 'react';

// Create Context for Authentication
const AuthContext = createContext();

// AuthProvider Component
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  const login = () => {
    setIsAuthenticated(true);
    setCurrentUser('rohan');
  };

  const signout = () => {
    setIsAuthenticated(false);
    setCurrentUser('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use Auth Context
const useAuth = () => useContext(AuthContext);

// Main App Component
const App = () => {
  return (
    <AuthProvider>
      <div className="app">
        <h1>Shopping List App</h1>
        <AuthButtons />
        <CurrentUser />
        <ShoppingList />
      </div>
    </AuthProvider>
  );
};

// AuthButtons Component
const AuthButtons = () => {
  const { login, signout } = useAuth();

  return (
    <div>
      <button id="login-btn" onClick={login}>Login</button>
      <button id="signout" onClick={signout}>Signout</button>
    </div>
  );
};

// CurrentUser Component
const CurrentUser = () => {
  const { isAuthenticated, currentUser } = useAuth();

  return (
    <div id="current-user">
      {`Current user: ${currentUser}, isAuthenticated: ${isAuthenticated ? 'Yes' : 'No'}`}
    </div>
  );
};

// ShoppingList Component
const ShoppingList = () => {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (inputValue.trim()) {
      setItems([...items, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeItem = (itemToRemove) => {
    setItems(items.filter(item => item !== itemToRemove));
  };

  const clearList = () => {
    setItems([]);
  };

  return (
    <div>
      <input
        id="shopping-input"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={addItem}>Add</button>
      <button id="clear-list" onClick={clearList}>Clear</button>
      <ul>
        {items.map(item => (
          <li key={item} id={`item-${item}`}>
            {item}
            <button id={`remove-${item}`} onClick={() => removeItem(item)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
