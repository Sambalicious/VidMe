import React, { Component } from 'react';
import { getMovies } from '../fakemovies/fakeMovies';
import { getGenres } from '../fakemovies/fakeGenreService'

import ListGroup from './common/ListGroup';
import Pagination from './common/Pagination';
import { paginate } from './common/utilities/paginate';
import MoviesTable from './common/MoviesTable';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox';

class Movies extends Component {
    state = {  
        movies: [],
        currentPage: 1,
        genres: [],
        pageSize: 4,
        sortColumn:{path:"title", order: 'asc'},
        selectedGenre: null,
        searchQuery: ''
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
        this.setState({selectedGenre: genre, searchQuery:"", currentPage: 1})
    };

    handleSearch = query => {
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
    };
     
    handleSort = (sortColumn) => {
        
        this.setState({sortColumn });

    }

    getPagedData = () => {
        const {
            pageSize,
             currentPage, 
             sortColumn,
              selectedGenre,
               searchQuery,
                movies:allMovies
        } = this.state;

        let filtered = allMovies;
    if (searchQuery)
     filtered = allMovies.filter(m =>
         m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
    else if (selectedGenre && selectedGenre._id) 
    filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);
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
                <Link to="/movies/new"
                style={{marginBottom:20}}
                className="btn btn-primary">New Movie</Link>



                <p>Showing {filtered.length} movies in the database. </p>
                <SearchBox value={this.getPagedData} onChange={this.handleSearch} />


                <MoviesTable 
                movies={movies}
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