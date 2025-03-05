import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemons, addPokemon, editPokemon, deletePokemon } from '../Redux/pokemonSlice';
import styles from '../components/style/styles.module.css';
import {PokemonButton, PokemonEdit} from '../utils/pokemonstyling';
import { PokemonData, PokemonTable } from '../utils/pokemondata';

const PokemonList = () => {
  const dispatch = useDispatch();
  const { pokemons, loading, error } = useSelector((state) => state.pokemon);
  const [newPokemon, setNewPokemon] = useState({ name: '', id: null, image: '', height: '', weight: '' });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (pokemons.length === 0) {
      dispatch(fetchPokemons());
    }
  }, [dispatch, pokemons.length]);

  const handleAddPokemon = () => {
    if (newPokemon.name) {
      dispatch(addPokemon({ ...newPokemon, id: Date.now() }));
      setNewPokemon({ name: '', id: null, image: '', height: '', weight: '' });
    }
  };

  const handleEditPokemon = (pokemon) => {
    setNewPokemon(pokemon);
    setEditMode(true);
  };

  const handleUpdatePokemon = () => {
    if (newPokemon.name) {
      dispatch(editPokemon({ id: newPokemon.id, updatedPokemon: newPokemon }));
      setNewPokemon({ name: '', id: null, image: '', height: '', weight: '' });
      setEditMode(false);
    }
  };

  const handleDeletePokemon = (id) => {
    dispatch(deletePokemon(id));
  };

  
  return (
    <div>
      {loading ? (
        <p>Loading.......</p> 
      ) : (
        <>
          <h1>{PokemonData.title1}</h1>
          {error && <p>Error: {error}</p>}
          
          <input
            type="text"
            value={newPokemon.name}
            onChange={(e) => setNewPokemon({ ...newPokemon, name: e.target.value })}
            placeholder="Add/Edit Pokémon"
            className="pokemon-input"
          />
          {editMode ? (
               <PokemonEdit onClick={handleUpdatePokemon} btnsText={PokemonData.btn5}/>
            // <button onClick={handleUpdatePokemon} className="update-button">Update Pokémon</button>
          ) : (
               <PokemonEdit onClick={handleAddPokemon} btnsText={PokemonData.btn4}/>
            // <button onClick={handleAddPokemon} className="add-button">Add Pokémon</button>
          )}
          
          <table className={styles.pokemontable}>
            <thead>

            <tr>
            {PokemonTable.map((header) => (
                <th key={header.key}>{header.label}</th>
                   ))}
                </tr>
              {/* <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Image</th>
                <th>Height (m)</th>
                <th>Weight (kg)</th>
                <th>Actions</th>
              </tr> */}
            </thead>
            <tbody>
              {pokemons.map((pokemon) => (
                <tr key={pokemon.id}>
                  <td>{pokemon.id}</td>
                  <td>{pokemon.name}</td>
                  <td>
                    <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
                  </td>
                  <td>{pokemon.height}</td> 
                  <td>{pokemon.weight}</td> 
                  <td>{pokemon.types?.map(type => type.type.name).join(', ') || 'N/A'}</td>
                  <td>{pokemon.abilities?.map(ability => ability.ability.name).join(', ') || 'N/A'}</td>



                  <td>
                    <PokemonButton btn={PokemonData.btn3} onClick={() => handleEditPokemon(pokemon)} />
                    {/* <button className="edit-button" onClick={() => handleEditPokemon(pokemon)}>Edit</button> */}
                    <PokemonButton btn={PokemonData.btn2} onClick={() => handleDeletePokemon(pokemon.id)} />
                    {/* <button className="delete-button" onClick={() => handleDeletePokemon(pokemon.id)}>Delete</button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default PokemonList;