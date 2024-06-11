import React from 'react'
import LoginForm from './LoginForm';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App(){
    return (
        <BrowserRouter>
        <Route>
            <Route path='/login' element={LoginForm}> </Route>
        </Route>
        </BrowserRouter>
    )
}

export default App;