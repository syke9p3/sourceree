import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './app/store.js'
import { Provider } from 'react-redux'

const themes = { dark:'dark', light: 'lights on'}
export const ThemeContext = createContext(themes);

ReactDOM.createRoot(document.getElementById('root')).render(
    
  <React.StrictMode>
    <Provider store={store}>
        <ThemeContext.Provider value={themes.light}>
            <App />
        </ThemeContext.Provider>
    </Provider>
  </React.StrictMode>,
)
