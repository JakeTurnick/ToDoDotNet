import {
    StrictMode,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import axios from 'axios'
import './index.css'
import App from './App.jsx'

import AuthProvider from '@/authProvider'
import RouteIndex from '@/routes/index'




createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <RouteIndex />
        </AuthProvider>
  </StrictMode>,
)
