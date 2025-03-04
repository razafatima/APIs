import { createSlice } from "@reduxjs/toolkit";



const pokemonSlice = createSlice({

    name: "pokemon",
    initialState: {
        // pokemon:[],
        list:[],
        loading: true,
        error:null,
    },
      //State Update
    reducers:{
        setPokemon: (state, action) =>{
            state.list = action.payload;
            state.loading = false;
        },

        //loading state update 
      setLoading:(state, action)=>{
        state.loading = action.payload;
      },

      //Error state update
      setError:(state,action)=>{
        state.error = action.payload;
        state.loading = false;
      },

      //New Pokemon Add
      addPokemon:(state, action) => {
        state.list.push(action.payload);
      },

      //Edit Pokemon
      
      editPokemon: (state, action) => {
      const { id, updatedData } = action.payload; 
       const index = state.list.findIndex((poke) => poke.id === id);
        if (index !== -1) {
      state.list[index] = { ...state.list[index], ...updatedData };
  }
},
      //Delete Pokemon
      deletePokemon: (state, action) => {
        state.list = state.list.filter((poke) => poke.id !== action.payload);
      }
    }
})

export const {setPokemon, setLoading, setError, addPokemon, deletePokemon, editPokemon} = pokemonSlice.actions;
export default pokemonSlice.reducer;