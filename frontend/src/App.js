import Footer from "./components/layout/Footer/Footer.js";
import Header from "./components/layout/Header/Header.js";
import webFont from "webfontloader";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState } from "react";
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/Product/ProductDetails.js";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
import LoginSignUp from "./components/User/LoginSignUp.js";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile.js";
import ProtectedRoute from "./components/Route/ProtectedRoute.js";
import UpdateProfile from "./components/User/UpdateProfile.js";
import UpdatePassword from "./components/User/UpdatePassword.js";
import ForgotPassword from "./components/User/ForgotPassword.js";
import ResetPassword from "./components/User/ResetPassword.js";
import Cart from "./components/Cart/Cart.js";
import Shipping from "./components/Cart/Shipping.js";
import ConfirmOrder from "./components/Cart/ConfirmOrder.js";
import Payment from "./components/Cart/Payment.js";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess.js";
import MyOrders from "./components/Order/MyOrders.js";
import OrderDetails from "./components/Order/OrderDetails.js";
import Dashboard from "./components/Admin/Dashboard.js";
import ProductList from "./components/Admin/ProductList.js";
import NewProduct from "./components/Admin/NewProduct.js";
import UpdateProduct from "./components/Admin/UpdateProduct.js";
import OrderList from "./components/Admin/OrderList.js";
import ProcessOrder from "./components/Admin/ProcessOrder.js";
import UsersList from "./components/Admin/UsersList.js";
import UpdateUser from "./components/Admin/UpdateUser.js";
import ProductReviews from "./components/Admin/ProductReviews.js";
import Contact from "./components/layout/Contact/Contact.js";
import About from "./components/layout/About/About.js";
import NotFound from "./components/layout/NotFound/NotFound.js";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("http://localhost:4000/api/stripeapikey", {
      withCredentials: true,
    });
    console.log(data.stripeApiKey);
    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <>
      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}

        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute exact path="/process/payment" component={Payment} />
          </Elements>
        )}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/product/:id" component={ProductDetails} />
          <Route exact path="/products" component={Products} />
          <Route path="/products/:keyword" component={Products} />
          <Route exact path="/Search" component={Search} />
          <Route exact path="/contact" component={Contact} />

          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={LoginSignUp} />
          <ProtectedRoute exact path="/account" component={Profile} />
          <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
          <ProtectedRoute
            exact
            path="/password/update"
            component={UpdatePassword}
          />
          <Route exact path="/password/forgot" component={ForgotPassword} />
          <Route
            exact
            path="/password/reset/:token"
            component={ResetPassword}
          />
          <Route exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/shipping" component={Shipping} />

          <ProtectedRoute exact path="/success" component={OrderSuccess} />
          <ProtectedRoute exact path="/orders" component={MyOrders} />

          <ProtectedRoute
            exact
            path="/order/confirm"
            component={ConfirmOrder}
          />
          <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
          <ProtectedRoute
            exact
            isAdmin={true}
            path="/admin/dashboard"
            component={Dashboard}
          />
          <ProtectedRoute
            exact
            isAdmin={true}
            path="/admin/products"
            component={ProductList}
          />
          <ProtectedRoute
            exact
            isAdmin={true}
            path="/admin/product"
            component={NewProduct}
          />
          <ProtectedRoute
            exact
            isAdmin={true}
            path="/admin/product/:id"
            component={UpdateProduct}
          />
          <ProtectedRoute
            exact
            isAdmin={true}
            path="/admin/orders"
            component={OrderList}
          />
          <ProtectedRoute
            exact
            isAdmin={true}
            path="/admin/order/:id"
            component={ProcessOrder}
          />
          <ProtectedRoute
            exact
            isAdmin={true}
            path="/admin/users"
            component={UsersList}
          />

          <ProtectedRoute
            exact
            isAdmin={true}
            path="/admin/user/:id"
            component={UpdateUser}
          />

          <ProtectedRoute
            exact
            isAdmin={true}
            path="/admin/reviews"
            component={ProductReviews}
          />

          <Route
            component={
              window.location.pathname === "/process/payment" ? null : NotFound
            }
          />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
