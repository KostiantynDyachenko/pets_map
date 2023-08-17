import React, { useState } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import dollar from '../assets/CurrencyCircleDollar.png'
import cross from '../assets/Line.png'
import ico from '../assets/ico.svg'
import ico_field from '../assets/ico_filed.svg'

const google_api = 'AIzaSyD7u-mIFJZVbQ-20sNfrABECqJbgTvNxr8'

export interface Pet {
  id: string,
  name: string,
  breed: {
    name: string,
  },
  price: number,
  pricingType: string,
  location: [number, number],
  images: Array<{
    id: string,
    urls: {
      card: string,
    },
  }>
}

export const Map = ({ pets }: { pets: Array<Pet> }) => {

  const [isLoading, setIsLoading] = useState(false);

  const [center] = useState({ lat: 52.5200, lng: 13.4050 });

  const handleZoomChanged = () => {
    setIsLoading(true);
    console.log('qwe')
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulate loading for 1 second
  };

  const [selectedPet, setSelectedPet] = useState<Pet | null>()

  return (
    <>

      <LoadScript googleMapsApiKey={google_api} >

        <GoogleMap
          options={{
            gestureHandling: 'greedy',
            disableDefaultUI: true,
            streetViewControl: false,
            mapTypeId: 'terrain',
          }}
          onZoomChanged={handleZoomChanged}
          mapContainerStyle={{
            width: '100%',
            height: '100vh'
          }}
          center={center}
          zoom={10}
        >

          {isLoading ? <div className="absolute top z-50 w-full flex justify-center">
            <div className='bg-white px-3 py-1 rounded-xl mt-5'>Loading...</div>
          </div> : <div className='h-10 w-full' />}


          {pets.map((pet: any) => (
            <Marker
              icon={{
                url: pet.id === selectedPet?.id ? ico : ico_field,
                scale: 7
              }}
              key={pet.id}
              position={pet.position}
              onClick={() => setSelectedPet(pet)}
            >
            </Marker>

          ))}

          {selectedPet && (
            <InfoWindow
              position={{ lat: selectedPet.location[0], lng: selectedPet.location[1] }}
              onCloseClick={() => setSelectedPet(null)}
              options={{}}

            >
              <div className="bg-blue h-auto"
              >

                <div className='h-auto w-44 high-specificity'>
                  <button onClick={() => setSelectedPet(null)} className='absolute bg-white bg-opacity-30 rounded-full top-1 left-1'>
                    <img src={cross} alt="" />

                  </button>
                  <img
                    src={selectedPet.images[0].urls.card}
                    alt={selectedPet.name}
                    className="w-full h-40 m-0 object-cover "
                  />
                </div>
                <div className='flex flex-row  rounded-t-xl bg-white absolute bottom-0 w-full h-12 pt-3 px-3 justify-between '>
                  <div className=''>
                    <h1 className='font-bold font-sans'>
                      {selectedPet.name}</h1>
                    <h2 className='font-sans'>{selectedPet.breed.name}</h2>
                  </div>
                  <div className='bg-customGreen flex flex-row h-fit items-center px-2 border border-customGreenDark rounded-lg' >
                    <img src={dollar} alt="d" className='h-5 mr-2' />
                    <h1 className='font-bold font-sans'>{selectedPet.price}€</h1>
                  </div>
                </div>

              </div>
            </InfoWindow>
          )}
        </GoogleMap>

      </LoadScript>
    </>
  )
}

