import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import DrinkList from './components/DrinkList';
import CocktailListHeading from './components/CocktailListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import Spinner from 'react-bootstrap/Spinner';

const App = () => {
	const [drinks, setDrinks] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [loading, setLoading] = useState(false);

	const getDrinksRequest = async (searchValue) => {
    setLoading(true)
		const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchValue}`;
    let response,responseJson;
    try {
		 response = await fetch(url);
		 responseJson = await response.json();
		console.log(responseJson,"responseJson");
    if (responseJson.drinks) {
      setDrinks(responseJson.drinks);
      setLoading(false)
    }
  } catch (error) {
    console.log('There was an error', error);
    setLoading(false)
  }
  
	};

	useEffect(() => {
		getDrinksRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('cocktail-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('cocktail-app-favourites', JSON.stringify(items));
	};

	const addFavouriteDrink = (drink) => {
		const newFavouriteList = [...favourites, drink];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteDrink = (drink) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.idDrink !== drink.idDrink
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	return (
		<div className='container-fluid cocktail-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<CocktailListHeading heading='Cocktails' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
      {loading?<Spinner animation="border" />:""}
     
      <DrinkList
					drinks={drinks}
					handleFavouritesClick={addFavouriteDrink}
					favouriteComponent={AddFavourites}
				/>
      
			
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<CocktailListHeading heading='Favourites' />
			</div>
		
				<DrinkList
					drinks={favourites}
					handleFavouritesClick={removeFavouriteDrink}
					favouriteComponent={RemoveFavourites}
				/>
			
      

		</div>
	);
};

export default App;
