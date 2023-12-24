import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { persistor, store } from './app/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const themes = { dark:'dark', light: 'light'}
export const ThemeContext = createContext(themes);

ReactDOM.createRoot(document.getElementById('root')).render(
    
  <React.StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ThemeContext.Provider value={themes.light}>
                <App />
            </ThemeContext.Provider>
        </PersistGate>
    </Provider>
  </React.StrictMode>,
)
