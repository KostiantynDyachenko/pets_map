import React from 'react';
import {Map, Pet} from './components/Map';
import {
    QueryClient,
    QueryClientProvider, useQuery,
} from 'react-query';

const queryClient = new QueryClient();

const petsData: Array<Pet> = [
    {
        id: '1',
        name: 'Buddy',
        breed: {
            name: 'Dog',
        },
        price: 100,
        pricingType: 'money',
        location: [52.5200, 13.4050],
        images: [{
            id: '1',
            urls: {
                card: 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
            },
        }]
    },

];

function App() {

    function usePetQuery({location, radius}: { location: { lat: number, lng: number }, radius: number }) {
        const queryKey = ['pets', location, radius];
        const fetchPets = async () => {
            // Fetch pets data using location and radius
            return fetch('https://jsonplaceholder.typicode.com/todos/1')
        };

        return useQuery(queryKey, fetchPets);
    }


    return (
        <QueryClientProvider client={queryClient}>

            <Map pets={petsData} useQuery={usePetQuery}/>

        </QueryClientProvider>

    );
}

export default App
