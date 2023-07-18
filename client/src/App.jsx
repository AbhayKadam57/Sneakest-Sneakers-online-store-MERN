import Cart from "./pages/Cart";
import Home from "./pages/Home";
import ProductPage from "./pages/productPage";
import SingleProduct from "./pages/SingleProduct";
import Login from "./pages/login";
import Register from "./pages/register";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useSelector } from "react-redux";

const App = () => {
  const User = useSelector((state) => state.user.currentUser);

  console.log(User);

  return (
    <Router>
      <div>
        <Routes>
          <Route
            exact
            path="/"
            element={User ? <Home /> : <Navigate to="/login" />}
          />
          <Route exact path="/products/:category" element={<ProductPage />} />
          <Route path="/product/:category/:id" element={<SingleProduct />} />
          <Route path="/:userID/cart" element={<Cart />} />
          <Route
            path="/login"
            element={User ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
