import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PokemonDetails from './pages/PokemonDetails';
import Header from './components/header/header';
import FavoritePokemons from './pages/FavoritePokemons';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon-details/:id" element={<PokemonDetails />} />
        <Route path="/favorite-pokemons/" element={<FavoritePokemons />} />
      </Routes>
    </div>
  );
}

export default App;
