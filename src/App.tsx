import React from 'react';
import { Map } from './components/Map';


const petsData = [
  {
    id: '1',
    name: "Buddy",
    bred: 'Dog',
    price: {
      type: 'card',
      amount: 100
    },
    position: { lat: 52.5100, lng: 13.4060 },
    pet_image: 'https://cdn.britannica.com/16/234216-050-C66F8665/beagle-hound-dog.jpg',
  },
  {
    id: '2',
    name: "Lucy",
    bred: 'Dog',
    price: {
      type: 'card',
      amount: 100
    },
    position: { lat: 52.5300, lng: 13.4055 },
    pet_image: 'https://cdn.britannica.com/16/234216-050-C66F8665/beagle-hound-dog.jpg',

  },
  {
    id: '3',
    name: "Lucy",
    bred: 'Dog',
    price: {
      type: 'card',
      amount: 100
    },
    position: { lat: 72.5300, lng: 23.4055 },
    pet_image: 'https://cdn.britannica.com/16/234216-050-C66F8665/beagle-hound-dog.jpg',

  }
];

function App() {
  return (
   
      <Map pets={petsData} />
    
  );
}

export default App;
