import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash'
import { GetPokemonList } from '../actions/pokemonActions';
import { Link } from 'react-router-dom';

const PokemonList = () => {
  const dispatch = useDispatch();

  const pokemonList = useSelector(state => state.PokemonList)

  useEffect(() => {
    FetchData(1)
  })

  const FetchData = (page = 1) => {
    dispatch(GetPokemonList(page))
  }

  const ShowData = () => {
    if(!_.isEmpty(pokemonList.data)){
      return (
        <div className={"list-wrapper"}>
          {pokemonList.data.map(el => {
            return(
              <div className={"pokemon-item"}>
                <p>{el.name}</p>
                <Link to={`/pokemon/${el.name}`}>View</Link>
              </div>
            )
          })}
        </div>
      )        
    }

    if(pokemonList.loading) {
      return <p>loading...</p>
    }

    if(pokemonList.errorMsg !== "") {
      return <p>{pokemonList.errorMsg}</p>
    }

    return <p>Unable to get data</p>
  }

  return (
    <div>
      {ShowData()}
    </div>
  )
}

export default PokemonList;