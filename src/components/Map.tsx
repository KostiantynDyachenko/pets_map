import React, {useState, useRef, useEffect} from 'react'
import {GoogleMap, LoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import cross from '../assets/Line.svg'
import ico from '../assets/ico.svg'
import ico_field from '../assets/ico_filed.svg'
import FavoriteButton from './FavoriteButton';
import PriceButton from './PriceButton';
import {Button} from "./Button";
import {locationToString} from "../helpers/locationToString";


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

export const Map = ({
                        pets,
                        useQuery
                    }: { pets: Array<Pet>, useQuery: any }) => {
    const mapRef = useRef(null);
    const [selectedPet, setSelectedPet] = useState<Pet | null>()
    const [zoom] = useState(14);
    const [center] = useState({lat: 52.5200, lng: 13.4050});

    const {isLoading} = useQuery(mapRef.current ? {
        // @ts-ignore
        location: locationToString(mapRef.current.getCenter().lat(), mapRef.current.getCenter().lng()),
        radius: 5
    } : {})

    const [click, setClick] = useState(false)

    const drag = useRef(false);
    const prevY = useRef(0);
    const speedUp = useRef(0);
    const speedDown = useRef(0);

    const handleTouchMove = (e: any) => {

        if (drag.current) {
            if (prevY.current - e.touches[0].clientY > 1.5) {
                if (speedUp.current > 5) {
                    // @ts-ignore
                    mapRef.current.setZoom(Math.min(mapRef.current.zoom + 1, 20))
                    speedUp.current = 0
                } else {
                    speedUp.current += 1
                }

            } else if (prevY.current - e.touches[0].clientY < -1.5) {

                if (speedDown.current > 5) {
                    // @ts-ignore
                    mapRef.current.setZoom(Math.max(mapRef.current.zoom - 1, 1))
                    speedDown.current = 0
                } else {
                    speedDown.current += 1
                }
            }
        }
        prevY.current = e.touches[0].clientY

    };
    const handleTouchStart = (e: any) => {

        if (e.touches.length < 2) {
            if (click) {
                drag.current = true
            } else {
                setClick(true)
                setTimeout(() => setClick(false), 200)
            }
        }
    };
    const handleTouchEnd = () => {
        drag.current = false
    };

    useEffect(() => {
        document.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    });

    return (
        <>
            <LoadScript googleMapsApiKey={google_api}>
                <GoogleMap
                    options={{
                        gestureHandling: 'greedy',
                        disableDefaultUI: true,
                        streetViewControl: false,
                        mapTypeId: 'terrain',
                    }}
                    mapContainerStyle={{
                        width: '100%',
                        height: '100vh'
                    }}
                    zoom={zoom}
                    center={center}
                    onLoad={(map) => {
                        // @ts-ignore
                        mapRef.current = map
                    }}


                >

                    {isLoading ? <div className="absolute top z-50 w-full flex justify-center">
                        <div className='bg-white px-3 py-1 rounded-xl mt-5'>Loading...</div>
                    </div> : <div className='h-10 w-full'/>}


                    {pets.map((pet: Pet) => (
                        <Marker
                            icon={{
                                url: pet.id === selectedPet?.id ? ico : ico_field,
                                scale: 7
                            }}
                            key={pet.id}
                            position={{lat: pet.location[0], lng: pet.location[1]}}
                            onClick={() => setSelectedPet(pet)}
                        >
                        </Marker>

                    ))}

                    {selectedPet && (
                        <InfoWindow
                            position={{lat: selectedPet.location[0], lng: selectedPet.location[1]}}
                            onCloseClick={() => setSelectedPet(null)}
                        >
                            <div className="bg-blue h-80"
                            >
                                <div className='h-auto w-64 high-specificity'>
                                    <button onClick={() => setSelectedPet(null)}
                                            className='absolute bg-white bg-opacity-30 rounded-full top-4 left-4 w-6 h-6  flex justify-center items-center '>
                                        <img src={cross} alt=""/>
                                    </button>
                                    <div className='absolute  top-4 right-4 flex flex-col items-end'>
                                        <FavoriteButton data={selectedPet} isWhite={true}/>
                                        <Button
                                            className={'block bg-neutrals2 h-8 w-10 flex items-center justify-center mt-4 rounded'}>
                                            <p className="font-bold font-['Poppins'] text-neutrals text-xs">BUY</p>
                                        </Button>
                                    </div>
                                    <img
                                        src={selectedPet.images[0].urls.card}
                                        alt={selectedPet.name}
                                        className="w-full h-80 m-0 object-cover "
                                    />
                                </div>
                                <div
                                    className='flex flex-row  rounded-t-[10px] bg-white absolute bottom-0 w-full h-auto p-[16px] justify-between '>
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
