import React from 'react';
import Movies from './components/Movies';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Customer from './components/common/customer';

const App = () => {
    return ( 
        <BrowserRouter>
        <Switch>
            <Route path="/movies" component={Movies} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/customer" component={Customer} />
        </Switch>
        </BrowserRouter>
     );
}
 
export default App;