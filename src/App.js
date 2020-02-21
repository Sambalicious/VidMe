
import React from 'react';
import Movies from './components/Movies';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';

import Customer from './components/common/customer';
import Rentals from './components/common/Rentals';
import NotFound from './components/common/NotFound';
import Navbar from './components/common/NavBar';
import LoginForm from './components/common/LoginForm';
import Register from './components/common/Register';
import MovieForm from './components/common/MovieForm';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
    return ( 
       
        <Router>
         <div>
        <ToastContainer />
        <Navbar />
        <main className="container">
        <Switch>
            <Route path="/movies/new" component={MovieForm} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={LoginForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/customers" component={Customer} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/"  to="/movies" />
            <Redirect to="/not-found"  />
        </Switch>
        </main>
        </div>
        </Router>
        
        
     );
}
 
export default App;