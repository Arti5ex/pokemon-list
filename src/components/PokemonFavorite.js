import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import * as pokemon from '../actions/pokemonActions';

@connect((store) => {
  return{
  };
})

export default class PokemonFavorite extends React.Component {

  removeFromFavorite() {
    this.props.dispatch(pokemon.removeFromFavorite(this.props.pokemon.id));
  }

  render() {
    return (
      <div className="pokemonFavoriteRow">
        <span>{this.props.pokemon.name}</span>
        <span className="remove" onClick={(e) => this.removeFromFavorite()}>x</span>
      </div>
    )
  }
}