import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <GoogleOAuthProvider clientId = '63811731752-1j2m5pdiontrrpvl9htjr17p0pp71aq1.apps.googleusercontent.com'>
            <App />
        </GoogleOAuthProvider>
    </StrictMode>
    
)
