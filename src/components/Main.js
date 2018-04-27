import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import PokemonRow from './PokemonRow';
import TypeTag from './TypeTag';
import RightBar from './RightBar';

import * as pokemon from "../actions/pokemonActions";
import * as search from "../actions/searchActions";
import * as category from "../actions/categoryActions";

@connect((store) => {
  return {
    selectCategory: store.category.selectCategory,
    categoryList: store.category.categoryList,    
    pokemonsCount: store.pokemons.pokemonsCount,
    pokemons: store.pokemons.pokemons,
    searchText: store.search.searchText
  };
})

export default class Main extends React.Component {  

  async componentWillMount() {
    await this.props.dispatch(pokemon.fetchPokemons());
    await this.props.dispatch(category.fetchCategory());
  }

  changeSelect(text){
    this.props.dispatch(search.changeSelect(text));
  }

  search(){
    this.props.dispatch(search.search(this.props.searchText));
  }

  render() {
    const {search, value} = this.props;
    let pokemonResult, pokemonsCount = '';

    if(this.props.pokemons.length) {
      pokemonResult = this.props.pokemons.map((item, index) => {
        return <PokemonRow pokemon={item} key={index}/>;
      });

      pokemonsCount = 'Finded ' + this.props.pokemonsCount + ' pokemons';
    } else {
      pokemonResult = 'No result';
    }

    const categoryList = this.props.categoryList.map((item, index) => {
      return <TypeTag category={item} key={index}/>;
    });

    return (
      <div className="container">
        <div className="search-result">
          <div className="search-bar">
            <input type="text" 
              placeholder="Search by full name"
              value={this.props.searchText}
              onChange={(e) => this.changeSelect(e.target.value)}/>
            <button onClick={(e) => this.search()}>find</button>
          </div>
          <div className="category-bar">{ categoryList }</div>
          <div className="count-bar">{ pokemonsCount }</div>
          <div className="result-bar">
            {pokemonResult}
          </div>
        </div>
        <RightBar/>
        <div className="clear"></div>
      </div>
    );
  }
}