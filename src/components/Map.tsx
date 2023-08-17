import React, { useState, useRef } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import cross from '../assets/Line.svg'
import ico from '../assets/ico.svg'
import ico_field from '../assets/ico_filed.svg'
import FavoriteButton from './FavoriteButton';
import PriceButton from './PriceButton';
import { useQuery } from 'react-query';

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

export const Map = ({ pets, queryFunc }: { pets: Array<Pet>,  queryFunc:(query:{ location: string,radius: number,})=>void}) => {
  useQuery("pets",()=> queryFunc );

  const [isLoading, setIsLoading] = useState(false);

  const [center] = useState({ lat: 52.5200, lng: 13.4050 });

  const [zoom, setZoom] = useState(14);
  const mapRef = useRef(null);
  const doubleClickTimeout = useRef(null);
  const dragStartLat = useRef(null);
  const prevLat = useRef(null);
  const isDragging = useRef(false);

  const handleDoubleClick = () => {
        // @ts-ignore
    clearTimeout(doubleClickTimeout.current);
        // @ts-ignore
    doubleClickTimeout.current = setTimeout(() => {
      if (!isDragging.current) {
        setZoom((prevZoom) => prevZoom + 1);
      }
    }, 300);
  };

  const handleDragStart = () => {
    // @ts-ignore
    const latLng = mapRef.current.getCenter();
    dragStartLat.current = latLng.lat();
    prevLat.current = latLng.lat();
    isDragging.current = true;
  };

  const handleDrag = () => {
    if (isDragging.current) {
          // @ts-ignore
      const latLng = mapRef.current.getCenter();
          // @ts-ignore
      const deltaY = prevLat.current - latLng.lat();

      if (deltaY > 0) {
        setZoom((prevZoom) => prevZoom + 1);
      }

      prevLat.current = latLng.lat();
    }
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    dragStartLat.current = null;
    prevLat.current = null;
  };


  const handleZoomChanged = () => {
    // setIsLoading(true);
    // queryFunc({location:JSON.stringify(center), radius:5})
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 1000); // Simulate loading for 1 second
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
          zoom={zoom}
          onDblClick={()=>handleDoubleClick()}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        ref={mapRef}
      
        >

          {isLoading ? <div className="absolute top z-50 w-full flex justify-center">
            <div className='bg-white px-3 py-1 rounded-xl mt-5'>Loading...</div>
          </div> : <div className='h-10 w-full' />}


          {pets.map((pet: Pet) => (
            <Marker
              icon={{
                url: pet.id === selectedPet?.id ? ico : ico_field,
                scale: 7
              }}
              key={pet.id}
              position={{ lat: pet.location[0], lng: pet.location[1] }}
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
              <div className="bg-blue h-80"
              >

                <div className='h-auto w-64 high-specificity'>
                  <button onClick={() => setSelectedPet(null)} 
                  className='absolute bg-white bg-opacity-30 rounded-full top-4 left-4 w-6 h-6  flex justify-center items-center '>
                    <img src={cross} alt="" />
                  </button>
                  <div className='absolute  top-4 right-4'>
                    <FavoriteButton data={selectedPet} isWhite={true}/>
                  </div>
                  <img
                    src={selectedPet.images[0].urls.card}
                    alt={selectedPet.name}
                    className="w-full h-80 m-0 object-cover "
                  />
                </div>
                <div className='flex flex-row  rounded-t-[10px] bg-white absolute bottom-0 w-full h-auto p-[16px] justify-between '>
                  <div className=''>
                    <h2 className="font-semibold font-['Poppins'] text-base mb-[6px]">{selectedPet.name}</h2>
                    <p className="font-medium font-['Poppins'] text-customGray text-sm">{selectedPet.breed.name}</p>
                  </div>
                  <PriceButton price={selectedPet.price} pricingType={selectedPet.pricingType}/>

                </div>

              </div>
            </InfoWindow>
          )}
        </GoogleMap>

      </LoadScript>
    </>
  )
}
