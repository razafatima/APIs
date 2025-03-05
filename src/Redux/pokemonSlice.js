import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    pokemons: JSON.parse(localStorage.getItem('pokemons')) || [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchPokemonsStart(state) {
      state.loading = false;
      state.error = null;
    },
    fetchPokemonsSuccess(state, action) {
      state.loading = false;
      state.pokemons = action.payload;
      localStorage.setItem('pokemons', JSON.stringify(action.payload));
    },
    fetchPokemonsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addPokemon(state, action) {
      state.pokemons.push(action.payload);
      localStorage.setItem('pokemons', JSON.stringify(state.pokemons));
    },
    editPokemon(state, action) {
      const { id, updatedPokemon } = action.payload;
      const index = state.pokemons.findIndex(pokemon => pokemon.id === id);
      if (index !== -1) {
        state.pokemons[index] = updatedPokemon;
        localStorage.setItem('pokemons', JSON.stringify(state.pokemons));
      }
    },
    deletePokemon(state, action) {
      const id = action.payload;
      state.pokemons = state.pokemons.filter(pokemon => pokemon.id !== id);
      localStorage.setItem('pokemons', JSON.stringify(state.pokemons));
    },
  },
});

export const {
  fetchPokemonsStart,
  fetchPokemonsSuccess,
  fetchPokemonsFailure,
  addPokemon,
  editPokemon,
  deletePokemon,
} = pokemonSlice.actions;

export const fetchPokemons = () => async (dispatch) => {
  dispatch(fetchPokemonsStart());
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=200');
    const detailedPokemons = await Promise.all(
      response.data.results.map(async (pokemon) => {
        const details = await axios.get(pokemon.url);
        return {
          id: details.data.id,
          name: details.data.name,
          image: details.data.sprites.front_default,
          height: details.data.height,
          weight: details.data.weight,
          abilities: details.data.abilities,
          types: details.data.types, 
        };
      })
    );
    dispatch(fetchPokemonsSuccess(detailedPokemons));
  } catch (error) {
    dispatch(fetchPokemonsFailure(error.message));
  }
};

export default pokemonSlice.reducer;