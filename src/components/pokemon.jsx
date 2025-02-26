import React, { useState, useEffect } from 'react';
import styles from '../components/style/styles.module.css';


const Fetchdata = () =>{
const[pokemon, setPokemon] = useState([]);
const[loading, setLoading] = useState(true);
const[error, setError] = useState(null);

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



    return(
        <div>
        <h1 className={styles.title}>Pokemon List</h1>
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
                  <td> {poke.name} </td>
                  <td>{poke.sprites && poke.sprites.front_default ? ( 
                    <img className={styles.pokemonimage} src={poke.sprites.front_default} alt={poke.name} />
                  ) : (
                    <p>No image available</p> 
                  )}
                  </td>
                  <td>{poke.height}</td>
                  <td>{poke.weight}</td>
                  <td>{poke.types.map(type => type.type.name).join(',  ')}</td>
                  <td>{poke.abilities.map(ability => ability.ability.name).join(',  ')}</td>
                  

                </tr>
              ))
            ) : (
                <tr> 
                    <td colSpan="7">
                    No Pokémon found.
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