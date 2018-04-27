import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import * as pokemon from '../actions/pokemonActions';

@connect((store) => {
  return{
    pokemonsFavorites: store.pokemons.pokemonsFavorites,
  };
})

class PokemonRow extends React.Component {

  addToFavorite() {
    this.props.dispatch(pokemon.addToFavorite(this.props.pokemon.name, this.props.pokemon.name));
  }

  render() {

    const isInFavorite = !this.props.pokemonsFavorites.some((item) => {
      return item.name == this.props.pokemon.name
    });

    let types = '';

    if(this.props.pokemon.types){
      types = this.props.pokemon.types.reduce(function(prev, next){
        return prev.type.name + ', ' + next.type.name;
      });
    }

    return (
      <div className="pokemonRow">
        <div>
          <div className="name">
            <Link to={'/pokemon/' + this.props.pokemon.name}>
              { this.props.pokemon.name }
            </Link>
          </div>
          {
            isInFavorite
            ?
            <span className="favorite" onClick={ (e) => this.addToFavorite() }>add to favorite</span>
            :
            <span className="favorite in">in favorite</span>
          }
          <div className="clear"></div>
        </div>
        <div className="secondRow">
          {
            this.props.pokemon.sprites && this.props.pokemon.sprites.front_default
            ?
            <img src={this.props.pokemon.sprites.front_default}  />
            :
            ''
          }
          <div className="attributes-block">
            <div className="attributes-row">Weight: {this.props.pokemon.weight}</div>
            <div className="attributes-row">Height: {this.props.pokemon.height}</div>
            <div className="attributes-row">Type: {types}</div>
          </div>
          <div className="clear"></div>
        </div>
      </div>
    )
  }
}

export default PokemonRow