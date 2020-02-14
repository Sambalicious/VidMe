import React from 'react';
import Form from './Form';
import Joi from 'joi-browser';
import { getGenres } from '../../fakemovies/fakeGenreService';
import { getMovie } from '../../fakemovies/fakeMovies';
import { saveMovie } from './../../fakemovies/fakeMovies';


class MovieForm extends Form {
    state = { 
        data: {
            title: '', genreId:'', numberInStock:'', dailyRentalRate:''
    },
     genre:[], errors:{} 
}
    schema = {
       _id: Joi.string(),
        title:Joi.string().required().label('Username'),
        genre:Joi.string().required().label('Genre'),
        stock:Joi.number().integer().min(1).max(100).required().label('Number in Stock'),
        rate: Joi.number().min(0).max(10).required().required().label('Daily Rental Rate')
    }
   
    

   componentDidMount(){
       const genres = getGenres();
       this.setState({genres});

       const movieId = this.props.match.params.id;

       if (movieId === "new")return;

       const movie = getMovie(movieId);
       if (!movie) return this.props.history.replace('/not-found');
       this.setState({ data: this.mapToViewModel(movie)});
        
   }
   mapToViewModel=(movie) => {
       return{
           _id:movie._id,
           title:movie.title,
           genreId:movie.genre._id,
           numberInStock: movie.numberInStock,
           dailyRentalRate: movie.dailyRentalRate
       }
   }

   doSubmit = () => {
   
    //call the server
    saveMovie(this.state.data);
    this.props.history.push('/movies');
}
   
    render() { 
        return ( 
            <div>
            <h1>Movie Form</h1>
            
            <form onSubmit={this.handleSubmit}>
               
                {this.renderInput("title", 'Title')}
                {this.renderSelect("genreId", 'Genre', this.state.genre)}
                {this.renderInput("stock", 'Number in Stock')}
                {this.renderInput("rate", 'Daily Rental Rate')}

                {this.renderButton('Save')}
            </form>


        </div>
         );
    }
}
 
export default MovieForm;
