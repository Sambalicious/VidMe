import React, { Component } from 'react';
import { getMovies } from '../fakemovies/fakeMovies';
import { getGenres } from '../fakemovies/fakeGenreService'
import Like from './common/Like';
import ListGroup from './common/ListGroup';
import Pagination from './common/Pagination';
import { paginate } from '../components/utilities/paginate';

class Movies extends Component {
    state = {  
        movies: [],
        currentPage: 1,
        genres: [],
        pageSize: 4
    };

    componentDidMount() {
        this.setState({
            movies: getMovies(),
            genres: getGenres()
        });
    }
    handleDelete = (movie) => {
      const movies =  this.state.movies.filter(c => c._id !==movie._id);
      this.setState({movies});
    }

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked
        this.setState({movies})
    } 

    handlePageChange = (page) => {
        this.setState({currentPage: page})
    }

    handleGenreSelect = genre => {
        this.setState({selectedGenre: genre})
    };
    render() {  

        const  { length: count } = this.state.movies;
        const {pageSize, currentPage,selectedGenre, movies: allMovies } = this.state
        if (count === 0) return <p>There are no movies in the database</p>;

        const filtered = selectedGenre ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
        const movies = paginate(filtered, currentPage, pageSize);
        
       
        return ( 
            <div className="row">
                <div className="col-3">
                    <ListGroup items={this.state.genres} 
                    onItemSelect={this.handleGenreSelect}
                    selectedItem={this.state.selectedGenre} />
                </div>
                <div className="col">
                <p>Showing {count} movies in the database. </p>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Stock</th>
                        <th>Rate</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map(movie =>
                    <tr key={movie._id}>
                        <td>{movie.title} </td>
                        <td>{movie.genre.name} </td>
                        <td>{movie.numberInStock} </td>
                        <td>{movie.dailyRentalRate} </td>
                        <td><Like onClick={() => this.handleLike(movie)} liked={movie.liked}/></td>
                        <td><button onClick={ () =>this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>

                    </tr>)}
                </tbody>
            </table>

            <Pagination 
            itemsCount={filtered.length} 
            pageSize={pageSize}
             onPageChange={this.handlePageChange} 
             currentPage={currentPage} />
                </div>
            
            </div>
         )
    }
}
 
export default Movies;