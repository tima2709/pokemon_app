import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPokemons,
  getTypes,
  setPage,
  setPageSize,
} from '../redux/slices/pokemonSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Card from '../components/card/card';
import { Container, Grid, Pagination } from '@mui/material';
import SelectMUI from '../components/selectMUI/selectMUI';
import TypesOfPokemon from '../components/typesOfPokemon/typesOfPokemon';
import styles from './pagesStyles.module.css';
import { setTypesOfPokemon } from '../redux/slices/typeSlice';
import Typography from '@mui/material/Typography';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = useSelector((state) => state.pokemons.page);
  const pageSize = useSelector((state) => state.pokemons.pageSize);
  const totalCount = useSelector((state) => state.pokemons.totalCount);
  const searchItem = useSelector((state) => state.search.searchQuery);
  const typesOfPokemon = useSelector((state) => state.typesOfPokemon.typeQuery);

  useEffect(() => {
    if (parseInt(searchParams.get('page'), 10) !== page) {
      searchParams.set('page', page.toString());
      setSearchParams(searchParams);
      navigate(`?page=${page}`, { replace: true });
    }
  }, [page, searchParams, setSearchParams, navigate]);

  useEffect(() => {
    dispatch(
      getPokemons({
        page,
        pageSize,
        name: searchItem,
        types: typesOfPokemon,
      })
    );
    dispatch(getTypes());
  }, [dispatch, page, pageSize, searchItem, typesOfPokemon]);

  const pokemons = useSelector((state) => state.pokemons.data);
  const status = useSelector((state) => state.pokemons.status);
  const types = useSelector((state) => state.pokemons.types);
  const isLoading = status === 'loading';

  const handleChange = (event, value) => {
    dispatch(setPage(value));
  };

  const handleSelectChange = (e) => {
    dispatch(setPageSize(e.target.value));
  };

  return (
    <Container sx={{ padding: '20px' }}>
      {pokemons && (
        <div className={styles.sort_and_select}>
          <SelectMUI pageSize={pageSize} setPageSize={handleSelectChange} />
          <TypesOfPokemon
            types={types}
            selectedType={typesOfPokemon}
            setSelectedType={setTypesOfPokemon}
          />
        </div>
      )}
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {isLoading ? (
          [...Array(8)].map((_, idx) => (
            <Card key={idx} isLoading={isLoading} />
          ))
        ) : pokemons.length === 0 ? (
          <Typography variant="h6">Not Found</Typography>
        ) : (
          pokemons.map((pokemon) => <Card key={pokemon.id} pokemon={pokemon} />)
        )}
      </Grid>
      {pokemons && (
        <Pagination
          count={Math.ceil(totalCount / pageSize)}
          page={page}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
          className={styles.pagination}
        />
      )}
    </Container>
  );
};

export default Home;
