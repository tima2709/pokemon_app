import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import PokemonDetails from "./pages/PokemonDetails";
import Header from "./components/header/header";

function App() {
    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/pokemon-details/:id" element={<PokemonDetails/>}/>
            </Routes>
        </div>
    );
}

export default App;
