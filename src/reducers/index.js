import { combineReducers } from "redux";

import pokemons from "./pokemonReducer";
import search from "./searchReducer";
import category from "./categoryReducer";

export default combineReducers({
  pokemons,
  search,
  category
});