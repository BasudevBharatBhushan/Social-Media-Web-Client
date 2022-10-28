import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import 'semantic-ui-css/semantic.min.css'
import "./App.css";
import { Container } from "semantic-ui-react";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";
import MenuBar from "./components/MenuBar";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={ <AuthRoute> <Login /> </AuthRoute>}/>
            <Route path="register" element={ <AuthRoute> <Register/> </AuthRoute>}/>
            <Route exact path = "/posts/:postId" element = {<SinglePost/>}/>
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
