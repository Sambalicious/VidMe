import React, { Component } from 'react';
import { getMovies } from '../fakemovies/fakeMovies';
import { getGenres } from '../fakemovies/fakeGenreService'

import ListGroup from './common/ListGroup';
import Pagination from './common/Pagination';
import { paginate } from './common/utilities/paginate';
import MoviesTable from './common/MoviesTable';
import _ from 'lodash';

class Movies extends Component {
    state = {  
        movies: [],
        currentPage: 1,
        genres: [],
        pageSize: 4,
        sortColumn:{path:"title", order: 'asc'}
    };

    componentDidMount() {
        const genres = [{_id: '',name: 'All Genres'}, ...getGenres()]
        this.setState({
            movies: getMovies(),
            genres

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
        this.setState({selectedGenre: genre, currentPage: 1})
    };
     
    handleSort = (path) => {
        
        this.setState({sortColumn : {path, order: 'asc'}});


    }
    render() {  

        const  { length: count } = this.state.movies;
        const {pageSize, currentPage,selectedGenre,sortColumn, movies: allMovies } = this.state
        if (count === 0) return <p>There are no movies in the database</p>;

        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const movies = paginate(sorted, currentPage, pageSize);
        
       
        return ( 
            <div className="row">
                <div className="col-3">
                    <ListGroup items={this.state.genres} 
                    onItemSelect={this.handleGenreSelect}
                    selectedItem={this.state.selectedGenre} />
                </div>
                <div className="col">
                <p>Showing {filtered.length} movies in the database. </p>
                <MoviesTable movies={movies}
                onSort={this.handleSort}
                onLike={this.handleLike}
                sortColumn={sortColumn}
                 onDelete={this.handleDelete} />

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