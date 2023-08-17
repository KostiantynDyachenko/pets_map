import React from 'react';
import { Map, Pet } from './components/Map';


const petsData: Array<Pet> = [
  {
    id: '1',
    name: 'Lucy',
    breed: {
      name: 'Dog',
    },
    price: 100,
    pricingType: 'money',
    location: [ 52.5200, 13.4050],
    images: [{
      id: '1',
      urls: {
        card: 'https://cdn.britannica.com/16/234216-050-C66F8665/beagle-hound-dog.jpg',
      },
    }]
  },
 
];

function App() {
  return (

    <Map pets={petsData} />

  );
}

export default App;
