import React from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import Search from './Search';
import Landing from './Bookshelf';
import AddIcon from './icons/add.svg';

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route path="/search" component={Search} />
          <Route exact path="/" component={Landing} />
        </Switch>
        <div>
          <Link to="/search" className="open-search SearchButton" />
        </div>
      </div>
    );
  }
}

export default BooksApp;
