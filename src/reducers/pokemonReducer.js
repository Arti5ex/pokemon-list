export default function reducer (state = {
  pokemonsCount: '',
  pokemons: [],
  pokemonOnPage: '',
  pokemonsFavorites: JSON.parse(localStorage.getItem('pokemonFavorite')) ? JSON.parse(localStorage.getItem('pokemonFavorite')) : []
}, action) {
  switch (action.type) {
    case 'FETCH_POKEMONS': {
      console.log(action.payload)
      return {
        ...state,
        pokemonsCount: action.payload.count,
        pokemons: action.payload.results
      }
    }
    case 'FETCH_POKEMON': {
      const pokemon = action.payload
      const pokemons = state.pokemons.map((item) => {
        return item.name === action.payload.name ? pokemon : item
      })

      return {
        ...state,
        pokemons
      }
    }
    case 'SET_POKEMONS_COUNT': {
      return {
        ...state,
        pokemonsCount: action.payload.count
      }
    }
    case 'SET_POKEMONS': {
      console.log(action.payload)
      return {
        ...state,
        pokemons: action.payload ? action.payload : []
      }
    }
    case 'POKEMONS_PAGE': {
      return {
        ...state,
        pokemonOnPage: action.payload ? action.payload.pokemon : []
      }
    }
    case 'ADD_TO_FAVORITE': {
      let hasPokemon = state.pokemonsFavorites.some((item) => {
        return item.id === action.payload.id
      })

      if (!hasPokemon) {
        let pokemonFavorite = [...state.pokemonsFavorites, action.payload]
        localStorage.setItem('pokemonFavorite', JSON.stringify(pokemonFavorite))

        return {
          ...state,
          pokemonsFavorites: [...state.pokemonsFavorites, action.payload],
        }
      } else {
        return {
          ...state,
          pokemonsFavorites: [...state.pokemonsFavorites],
        }
      }
    }
    case 'REMOVE_FROM_FAVORITE': {
      let pokemonFavorite = state.pokemonsFavorites.filter(item => action.payload.id !== item.id)
      localStorage.setItem('pokemonFavorite', JSON.stringify(pokemonFavorite))

      return {
        ...state,
        pokemonsFavorites: pokemonFavorite
      }
    }
  }

  return state
}
