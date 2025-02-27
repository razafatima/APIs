import React, { useState, useEffect } from 'react';
import styles from '../components/style/styles.module.css';


const Fetchdata = () =>{
const[pokemon, setPokemon] = useState([]);
const[loading, setLoading] = useState(true);
const[error, setError] = useState(null);
const[newPokemon, setNewPokemon] = useState({name: " ", height: " ", weight: " "});
const[editingPokemon, setEditingPokemon] = useState(null);
const[editedData, seteditedData] = useState({name: " ", height: " ", weight: " "});

useEffect(()=>{
      
    const fetchdata = async () =>{
        
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
            if (!response.ok) {
             throw new Error('Network was not ok.');   
            }
            const pokemonData = await response.json();

            //fetch details for each pokemon

            const pokemonDetails = await Promise.all(
            pokemonData.results.map(async (poke) =>{
             const pokemonreponse = await fetch(poke.url);
             return pokemonreponse.json();
                })
            );
             setPokemon(pokemonDetails);
        } catch (error) {
            setError(error.message);
        } finally{
            setLoading(false);
        }
    };
    fetchdata();
}, [])

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
   setPokemon([...pokemon, newEntry]);
   setNewPokemon({name: " ", height: " ", weight: " "});
}


const handleEditPokemon = (id, updatedData) =>{
  setPokemon(
     pokemon.map((poke) => 
        poke.id === id ? {...poke, ...updatedData} : poke
    )
  );
};

const handleEditClick = (poke) =>{
  setEditingPokemon(poke.id);
  seteditedData({name: poke.name, height: poke.height, weight: poke.weight});
};

const handleUpdatedClick =()=>{
  handleEditPokemon(editingPokemon, editedData);
  setEditingPokemon(null);
}

const handleDelete = (id) =>{
    setPokemon(pokemon.filter((poke) => poke.id !== id));

}


    return(
        <div>
            <h1 className={styles.title}>Pokemon List</h1>

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
           <button onClick={handleAddPokemon}>Add pokemon</button>

           </div>

        {loading ? (
          <p>Loading......</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (

           <table className={styles.pokemontable}>
            <thead>
                <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Images</td>
                <td>Height</td>
                <td>Weight</td>
                <td>Types</td>
                <td>Abilities</td>
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
                    <p>No image available</p> 
                  )}
                  </td>
                  <td>
                    {editingPokemon === poke.id ? (
                      <input 
                      type="text"
                       value={editedData.id}
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
                    value={editedData.id}
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
                          <button onClick={handleUpdatedClick}>save</button>
                    ): (
                      <button onClick={()=> handleEditClick(poke)}>Edit</button>  
                    )}

                    <button onClick={()=> handleDelete(poke.id)}>Delete</button>

                  </td>
                </tr>
              ))
            ) : (
                <tr> 
                    <td colSpan="7">
                    No Pokemon found.
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