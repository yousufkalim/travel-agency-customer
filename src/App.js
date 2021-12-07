import { BrowserRouter, Route, Switch, Router } from "react-router-dom";

import Header from "./components/layout/Header";
import Homepage from "./components/Home";
import Login from "./components/auth/Login";
import Footer from "./components/layout/Footer";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard";
import SingleTour from "./components/singleTour";
import ScrollToTop from "./ScrollToTop";
import { ProtectedRoute } from "./protectedRoute";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import NotFound from "./components/NotFound";
import TripsList from "./components/trips/TripsList"; ///all trips
import AgencyTrips from "./components/trips/AgencyTrips"; ///all trips
import { toast } from "react-toastify"; /////to show toast messages
import "react-toastify/dist/ReactToastify.css"; ////toast message css

toast.configure({ limit: 1 }); ////configure toast and adding limit
toast.clearWaitingQueue(); ////no toast message in queue
function App() {
  console.log(window.location.origin);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main>
        <Switch>
          <Route path="/" component={Homepage} exact />
          <Route path="/triplist" component={TripsList} exact />{" "}
          <Route path="/AgencyTrips/:id" component={AgencyTrips} exact />{" "}
          {/* route to show all trips */}
          <Route path="/auth/login" component={Login} />
          <Route path="/auth/register" component={Register} />
          <Route path="/auth/forgotPassword" component={ForgotPassword} />
          <Route path="/auth/resetPassword/:token" component={ResetPassword} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <Route path="/tour/:city/:tripid" component={SingleTour} />
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />
      </main>
    </BrowserRouter>
  );
}

export default App;
