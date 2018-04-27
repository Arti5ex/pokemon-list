import axios from 'axios';

export function fetchPokemon (name) {
  return function (dispatch) {
    axios.get('/api/pokemon/' + name)
      .then(response => {
        dispatch({
          type: 'FETCH_POKEMON',
          payload: JSON.parse(response.data)
        })
      })
  }
}

export function fetchPokemons () {
  return function (dispatch) {
    axios.get('/api/pokemons')
      .then((response) => {
        const pokemonsResult = JSON.parse(response.data)
        dispatch({type: 'FETCH_POKEMONS', payload: pokemonsResult})

        pokemonsResult.results.map(element => {
          dispatch(fetchPokemon(element.name))
        })
      })
  }
}

export function fetchPokemonsByType (id) {
  return function (dispatch) {
    axios.get('/api/type')
      .then((response) => {
        const pokemonsResult = JSON.parse(response.data)
        dispatch({type: 'FETCH_POKEMONS', payload: pokemonsResult})

        pokemonsResult.results.map(element => {
          dispatch(fetchPokemon(element.name))
        })
      })
  }
}

export function pokemonOnPage (pokemon) {
  return {
    type: 'POKEMONS_PAGE',
    payload: {
      pokemon
    }
  }
}

export function addToFavorite (id, name) {
  return {
    type: 'ADD_TO_FAVORITE',
    payload: {
      id,
      name
    }
  }
}

export function removeFromFavorite (id, name) {
  return {
    type: 'REMOVE_FROM_FAVORITE',
    payload: {
      id
    }
  }
}
