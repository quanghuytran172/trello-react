import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Board from "./pages/Board/Board";
import Boards from "./pages/Boards/Boards";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import ProtectedRoutes from "./ProtectedRoutes";
function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route element={<ProtectedRoutes />}>
                        <Route path='/' element={<Boards />} />
                        <Route path='/:user/boards' element={<Boards />} />
                        <Route path='/b/:id/:name' element={<Board />} />
                    </Route>
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
