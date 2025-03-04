import React, { useState, useEffect } from 'react';
import styles from '../components/style/styles.module.css';
import {PokemonData, PokemonTable} from '../utils/pokemondata';
import { useDispatch, useSelector } from 'react-redux';
import {setPokemon, setLoading, setError, addPokemon, editPokemon, deletePokemon} from '../Redux/pokemonSlice'
// import PokemonTitle from '../utils/pokemonstyling';
import { PokemonTypography, PokemonAdd, PokemonButton } from '../utils/pokemonstyling';



const Fetchdata = () =>{
const dispatch = useDispatch();
const loading = useSelector((state) => state.pokemon.loading);
const pokemon = useSelector((state) => state.pokemon.list);
const error = useSelector((state) => state.pokemon.error);
// const[pokemon, setPokemon] = useState([]);
// const[loading, setLoading] = useState(true);
// const[error, setError] = useState(null);
const[newPokemon, setNewPokemon] = useState({name: " ", height: " ", weight: " "});
const[editingPokemon, setEditingPokemon] = useState(null);
const[editedData, seteditedData] = useState({name: " ", height: " ", weight: " "});

useEffect(()=>{
      
    const fetchdata = async () =>{
        dispatch(setLoading(true));
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
            if (!response.ok) {
             throw new Error('Network was not ok.');   
            }
            const pokemonData = await response.json();

            //fetch details for each pokemon

            const pokemonDetails = await Promise.all(
            pokemonData.results.map(async (poke) =>{
             const pokemonResponse = await fetch(poke.url);
             return pokemonResponse.json();
                })
            );
            dispatch(setPokemon(pokemonDetails));
            //  setPokemon(pokemonDetails);
        } catch (error) {
            // setError(error.message);
            dispatch(setError(error.message));
        } finally{
          dispatch(setLoading(false));
    }
  };
    fetchdata();
}, [dispatch]);

const handleAddPokemon = () =>{
  if(newPokemon.name.trim() === ""){
    alert("please enter pokemon name");
    return;
  }
  const id = pokemon.length+1;
  const newEntry ={
    id, 
    name: newPokemon.name,
    height: newPokemon.height || "Unknown",
    weight: newPokemon.weight || "Unknown",
    sprites:{front_default: " https://via.placeholder.com/100"},
    types:[{type:{name: "unknown"}}],
    abilities: [{ability:{name: "unknown"}}],
  };
  //  setPokemon([...pokemon, newEntry]);
  dispatch(addPokemon(newEntry));
   setNewPokemon({name: " ", height: " ", weight: " "});
}


// const handleEditPokemon = () =>{
//   dispatch(editPokemon({id: editingPokemon, updatedData: editedData}));
//   // setPokemon(
//   //    pokemon.map((poke) => 
//   //       poke.id === id ? {...poke, ...updatedData} : poke
//   //   )
//   // );
// };

const handleEditClick = (poke) =>{
  setEditingPokemon(poke.id);
  seteditedData({name: poke.name, height: poke.height, weight: poke.weight});
};

const handleUpdatedClick =()=>{
  // handleEditPokemon(editingPokemon, editedData);
  dispatch(editPokemon({id: editingPokemon, updatedData: editedData})); 
  setEditingPokemon(null);
}

const handleDelete = (id) =>{
    // setPokemon(pokemon.filter((poke) => poke.id !== id));
    dispatch(deletePokemon(id));
}


    return(
        <div>
            <PokemonTypography text={PokemonData.title1} />
            <div>
           <input 
           type="text"
           placeholder="enter pokemon name"
           value={newPokemon.name}
           onChange={(e) => setNewPokemon({...newPokemon, name: e.target.value})}
            />
            <input 
           type="text"
           placeholder="height"
           value={newPokemon.height}
           onChange={(e) => setNewPokemon({...newPokemon, height: e.target.value})}

            />
            <input 
           type="text"
           placeholder="weight"
           value={newPokemon.weight}
           onChange={(e) => setNewPokemon({...newPokemon, weight: e.target.value})}

            />
           {/* <button onClick={handleAddPokemon}>Add pokemon</button> */}
           <PokemonAdd onClick={handleAddPokemon} btnText={PokemonData.btn1}/>

           </div>

        {loading ? (
          <PokemonTypography text={PokemonData.text2} />
        ) : error ? (
          <p>Error: {error}</p>
        ) : (

           <table className={styles.pokemontable}>
            <thead>
                <tr>
                  {PokemonTable.map((header)=>(
                    <th key={header.key}>{header.label}</th>
                  ))}
                {/* <td>ID</td>
                <td>Name</td>
                <td>Images</td>
                <td>Height</td>
                <td>Weight</td>
                <td>Types</td>
                <td>Abilities</td> */}
                </tr>
            </thead>
<tbody>
            {pokemon.length > 0 ? (
              pokemon.map((poke) => (
                <tr key={poke.id}>
                  <td>{poke.id}</td>  
                  <td> 
                    {editingPokemon === poke.id ?(
                      <input 
                         type="text"
                         value={editedData.name}
                         onChange={(e) => seteditedData({...editedData, name: e.target.value})}
                      />
                    ):(
                      poke.name
                    )}
                     </td>
                  <td>{poke.sprites && poke.sprites.front_default ? ( 
                    <img className={styles.pokemonimage} src={poke.sprites.front_default} alt={poke.name} />
                  ) : (
                    <PokemonTypography text={PokemonData.text3} />
                  )}
                  </td>
                  <td>
                    {editingPokemon === poke.id ? (
                      <input 
                      type="text"
                       value={editedData.height}
                       onChange={(e)=>seteditedData ({...editedData, height: e.target.value})}                      
                      />
                    ):(
                      poke.height
                    )}

                  </td>
                  <td>
                   {editingPokemon === poke.id ? (
                    <input 
                    type="text"
                    value={editedData.weight}
                    onChange={(e) => seteditedData({...editedData, weight: e.target.value})}
                    />
                   ):(
                    poke.weight
                   )}
                  </td>
                  <td>{poke.types.map(type => type.type.name).join(',  ')}</td>
                  <td>{poke.abilities.map(ability => ability.ability.name).join(',  ')}</td>

                  <td>
                    {editingPokemon === poke.id ? (
                          // <button onClick={handleUpdatedClick}>save</button>
                         <PokemonButton onClick={handleUpdatedClick} btn={PokemonData.btn2}/>

                    ): (
                      // <button onClick={()=> handleEditClick(poke)}>Edit</button>  
                      <PokemonButton onClick={()=> handleEditClick(poke)} btn={PokemonData.btn3} />
                    )}

                    {/* <button onClick={()=> handleDelete(poke.id)}>Delete</button> */}
                    <PokemonButton onClick={()=> handleDelete(poke.id)} btn={PokemonData.btn4}/>

                  </td>
                </tr>
              ))
            ) : (
                <tr> 
                    <td colSpan="7">
                    {/* No Pokemon found. */}
                    <PokemonTypography text={PokemonData.text1} />
                    </td> 
                    </tr>
            )}
          </tbody>
          </table>
        )}
      </div>
  );
};

export default Fetchdata;