import React from 'react';
import PokemonTable from '../src/components/pokemon';
import AddPokemonForm from '../src/components/form';

const Home = () => {
    return (
        <div>
            <AddPokemonForm />
            <PokemonTable />
        </div>
    );
}

export default Home;
