import React from "react"
import { Routes, Route } from 'react-router-dom';
import Authentication from "./Components/Auth/Authentication";
import Home from "./Components/Home";
import UserStates from "./context/user/UserStates";
import { useLocation } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import Alertstates from "./context/alert/Alertstates";
import Chatstates from "./context/chats/Chatstates";
import Messagestates from "./context/Message/Messagestates";

function App() {
  const location = useLocation();

  return (
    <>
      <UserStates>
        <Alertstates>
          <Chatstates>
            <Messagestates>
              {location.pathname == "/login" || location.pathname == "/signup" ? <Authentication /> : ""}
              <Routes>
                <Route exact path='/' element={< Home />}></Route>
                <Route exact path='/login' element={< Login />}></Route>
                <Route exact path='/signup' element={< Signup />}></Route>
              </Routes>
            </Messagestates>
          </Chatstates>
        </Alertstates>
      </UserStates>
    </>
  )
}

export default App;
