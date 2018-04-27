import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import PokemonFavorite from './PokemonFavorite';

@connect((store) => {
  return{
    pokemonsFavorites: store.pokemons.pokemonsFavorites,    
  };
})

class RightBar extends React.Component {

  render() {
    const pokemonFavoritesResult = this.props.pokemonsFavorites.map((item, index) => {
      return <PokemonFavorite pokemon={item} key={index}/>;
    });

    return (
      <div className="right-bar">
        <div className="favorites-title">Favorites</div>
        {pokemonFavoritesResult}
      </div>
    )
  }
}

export default RightBar