import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.jsx'
import LoginPage from './pages/Login'
import ToDoManager from './pages/ToDoManager'
import Home from './pages/Home'
import CreateToDo from './pages/ToDos/CreateToDo'
import ViewToDos from './pages/ToDos/ViewToDos'


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="Home" element={<Home /> } />
                    <Route path="Login" element={<LoginPage />} />
                    <Route path="ToDos" element={<ToDoManager />}>
                        <Route index element={<ViewToDos /> } />
                        <Route path="Create" element={<CreateToDo /> } />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
  </StrictMode>,
)
