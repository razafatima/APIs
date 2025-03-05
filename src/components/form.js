import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPokemon } from '../Redux/pokemonSlice';
import {PokemonAdd } from '../utils/pokemonstyling';
import { PokemonData, } from '../utils/pokemondata';

const AddPokemonForm = () => {
    const [name, setName] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const dispatch = useDispatch();

    const handleAdd = () => {
        if (!name || !weight || !height) return;
        const newPokemon = {
            id: Date.now(),
            name,
            image: "https://via.placeholder.com/50",
            weight,
            height
        };
        dispatch(addPokemon(newPokemon));
        setName("");
        setWeight("");
        setHeight("");
    };

    return (
        <div>
            <input 
            type="text" 
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            />
            <input 
            type="number" 
            placeholder="Weight" 
            value={weight} 
            onChange={(e) => setWeight(e.target.value)} 
            />
            <input 
            type="number" 
            placeholder="Height" 
            value={height} 
            onChange={(e) => setHeight(e.target.value)} 
            />
            {/* <button onClick={handleAdd} className="add-btn">Add</button> */}
            <PokemonAdd onClick={handleAdd} btnText={PokemonData.btn1} />
        </div>
    );
}

export default AddPokemonForm;
