/*



import React, { Component } from 'react';
import NavBar from './components/components/navbar';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Products from './components/components/products';
import Posts from './components/components/posts';
import Dashboard from './components/admin/dashboard';
import Home from './components/components/home';
import ProductDetails from './components/components/productDetails';
import NotFound from './components/components/notFound';
  


class App extends Component {

    render() { 
        return ( 
            <BrowserRouter>
            <div>
                <NavBar />
                <div className="content">
                    <Switch >
                    <Route path="/products/:id" component={ProductDetails} />
                    <Route path='/products' component={Products} />
                   < Route path='/posts/:year?/:month?' component={Posts} />
                   <Route path='/admin' component={Dashboard}/>
                    <Redirect from='/messages' to="/posts" />
                   <Route path='/not-found' component={NotFound}/>
                   <Route path='/' exact component={Home} />
                   <Redirect to="/not-found"  />
                   </Switch>
                </div>
            </div>
            </BrowserRouter>
         );
    }
}
 
export default App;

*/

import React from 'react';
import Movies from './components/Movies';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Customer from './components/common/customer';
import Rentals from './components/common/Rentals';
import NotFound from './components/common/NotFound';
import Navbar from './components/common/NavBar';
import LoginForm from './components/common/LoginForm';

const App = () => {
    return ( 
        <div>
        <BrowserRouter>
        <Navbar />
        <main className="container">
        <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/customers" component={Customer} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/"  to='/movies' />
            <Redirect to="/not-found"  />
        </Switch>
        </main>
        </BrowserRouter>
        
        </div>
     );
}
 
export default App;