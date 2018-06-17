import React, { Component } from 'react';
import ReactTable from "react-table";
import logo from './logo.svg';
import './App.css';

class MovieTableRow extends React.Component {
  render () {
    let title = this.props.title;
    let director = this.props.director;
    return (
      <tr>
        <td>
          {title}
        </td>
        <td>
          {director}
        </td>
      </tr>
    );  
  }
}

class MovieTable extends React.Component {
  constructor () { 
    super();
    this.state = { movies: [] }
  }

  componentDidMount() {
    this.props.getMovies()
    .then(movies => this.setState({ movies: movies }));
  }

  render() {
    const rows = [];
    let lastTitle = null;

    this.state.movies.forEach((movie) => {
      rows.push(
        <MovieTableRow
          title={movie.title}
          director={movie.director}
        />
      );
      lastTitle = movie.title;
    });

    return(
      <table>
        <thead>
          <tr>
            <th>Movie</th>
            <th>Director</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

async function getMovies() { 
  const response = await fetch('https://ghibliapi.herokuapp.com/films');
  const json = await response.json();
  console.log(json);
  return json;
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Movie Grid</h1>
        </header>
        <MovieTable getMovies={getMovies}/>
      </div>
    );
  }
}

export default App;