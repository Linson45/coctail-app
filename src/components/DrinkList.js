import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import HorizontalScroll from 'react-horizontal-scrolling'
const DrinkList = (props) => {
	const FavouriteComponent = props.favouriteComponent;
	const [show, setShow] = useState(false);
	const [drinkContent, setContent] = useState([]);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const dualFunctions=(drink)=>{
		handleShow();
		setContent(drink);
	}

	return (
		<> <HorizontalScroll>
			{props.drinks.map((drink, index) => (
				
				<div className='image-container d-flex justify-content-start col col-lg-2'>
					<img src={drink.strDrinkThumb} alt='Drink' onClick={()=>dualFunctions(drink)}></img>
					<div
						onClick={() => props.handleFavouritesClick(drink)}
						className='overlay d-flex align-items-center justify-content-center'
					>
						<FavouriteComponent />
					</div>
				</div>
				
			
			))
			}
			</HorizontalScroll>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
				  <Modal.Title>{drinkContent.strDrink}</Modal.Title>
				</Modal.Header>
				<img src={drinkContent.strDrinkThumb} alt='Drink' ></img>
				<Modal.Body>{drinkContent.strInstructions}</Modal.Body>
				<Modal.Footer>
				  <Button variant="secondary" onClick={handleClose}>
					Close
				  </Button>
				  
				</Modal.Footer>
			  </Modal>
		</>
	);
};

export default DrinkList;
