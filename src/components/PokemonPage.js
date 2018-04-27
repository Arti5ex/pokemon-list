import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import RightBar from './RightBar';

import * as pokemon from '../actions/pokemonActions';

@connect((store, ownProps) => {
  return{
    pokemonId: ownProps.match.params.id,
    pokemons: store.pokemons.pokemons,
    pokemonsFavorites: store.pokemons.pokemonsFavorites,
    pokemonOnPage: store.pokemons.pokemonOnPage,
  };
})

export default class PokemonPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    let pokemonItem = this.props.pokemons.filter((item) => {
      return this.props.pokemonId == item.name;
    });

    this.props.dispatch(pokemon.pokemonOnPage(pokemonItem[0]));
  }

  addToFavorite() {
    this.props.dispatch(pokemon.addToFavorite(this.props.pokemonId, this.props.pokemonOnPage.name));
  }

  render() {
    const pokemonItem = this.props.pokemons.filter((item) => {
      return this.props.pokemonId == item.name;
    });

    const isInFavorite = !this.props.pokemonsFavorites.some((item) => {
      return item.name == this.props.pokemonId
    });

    return (
      <div className="container">
        <div className="search-result pokemon-info">
          <div className="go-back">
            <Link to={'/'}>
                Main Page
            </Link>
          </div>
          <div>
            <h1>{ this.props.pokemonOnPage.name }</h1>
            {
              this.props.pokemonOnPage.sprites && this.props.pokemonOnPage.sprites.front_default
              ?
              <img src={this.props.pokemonOnPage.sprites.front_default}  />
              :
              ''
            }
            {
              isInFavorite
              ?
              <div className="favorite" onClick={ (e) => this.addToFavorite() }>add to favorite</div>
              :
              <div className="favorite in">in favorite</div>
            }
            <div className="attributes-block">
            <div className="attributes-row">Weight: {this.props.pokemonOnPage.weight}</div>
            <div className="attributes-row">Height: {this.props.pokemonOnPage.height}</div>
            <div className="attributes-row">Weight: </div>
            </div>
          </div>
        </div>
        <RightBar/>
        <div className="clear"></div>
      </div>
    )
  }
}