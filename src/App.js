import React, { Component } from 'react';
import ReactTable from "react-table";
import logo from './logo.svg';
import './App.css';

const Modal = ({ handleClose, show, children }) => {
  let showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button onClick={handleClose}>close</button>
      </section>
    </div>
  );
};

class MovieTableCell extends React.Component {
  render () {
    let title = this.props.title;
    let director = this.props.director;
    let modal = this.props.showModal;
    return (
      <td>
        <a onClick={modal}>{title}</a>
      </td> 
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

  state = { show: false };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    const cells = [];
    let lastTitle = null;

    this.state.movies.forEach((movie) => {
      cells.push(
        <MovieTableCell
          showModal={this.showModal}
          title={movie.title}
        />
      );
      lastTitle = movie.title;
    });

    return(
      <table>
        <thead>
          <tr>
            <th>Movie</th>
          </tr>
        </thead>
        {cells}
      <Modal show={this.state.show} handleClose={this.hideModal}>
        <p>what up</p>
      </Modal> 
      </table>
    );
  }
}

async function getMovies() { 
  const response = await fetch('https://ghibliapi.herokuapp.com/films');
  const json = await response.json();
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