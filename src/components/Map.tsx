import React, {useState, useRef, useEffect} from 'react'
import {GoogleMap, LoadScript} from '@react-google-maps/api';
import {locationToString} from "../helpers/locationToString";
import {PetInfoWindow} from "./PetInfoWindow";
import {PetsMarkers} from "./PetsMarkers";
import {Data, Record} from "../types/pet.type";
import {Loader} from "./Loader";
import list_ico from '../assets/list_ico.svg'
import minus from '../assets/minus.svg'
import plus from '../assets/plus.svg'
import split from '../assets/split_line.svg'

const google_api = 'AIzaSyD7u-mIFJZVbQ-20sNfrABECqJbgTvNxr8'

const defCenter = {lat: 52.5200, lng: 13.4050}
export const Map = ({
                        useQuery
                    }: { useQuery: any }) => {
    const mapRef = useRef(null);
    const [selectedPet, setSelectedPet] = useState<Record | null>()
    const [zoom, setZoom] = useState(4);
    const [center, setCenter] = useState({lat: 52.5200, lng: 13.4050});

    const {data, isLoading} = useQuery({
        // @ts-ignore
        location: locationToString(center.lat, center.lng),
        radius: 10000 * Math.pow(2, 12 - zoom)
    })

    const pets: Data = data ? data : []

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
    const handleCenterChange = () => {
        setCenter(prevState => mapRef.current ? {
            // @ts-ignore
            lat: mapRef.current.getCenter().lat(),
            // @ts-ignore
            lng: mapRef.current.getCenter().lng()
        } : prevState)
    }

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
                        mapTypeId: 'roadmap',
                    }}
                    mapContainerStyle={{
                        width: '100%',
                        height: '100vh'
                    }}
                    zoom={zoom}
                    center={defCenter}
                    onCenterChanged={handleCenterChange}
                    onZoomChanged={
                        // @ts-ignore
                        () => setZoom(prevState => mapRef.current ? mapRef.current.zoom : prevState)}
                    onLoad={(map) => {
                        // @ts-ignore
                        mapRef.current = map
                    }}

                >
                    {isLoading ? <div className="absolute top z-50 w-full flex justify-center">
                        <Loader/>
                    </div> : null}
                    <div className='absolute top-8 w-full flex items-end flex-col '>
                        <div className="w-9 h-16 bg-white flex flex-col rounded-full items-center justify-around mr-8">
                            <button onClick={() => setZoom(prevState => prevState + 1)}>
                                <img src={plus} alt="+"/>
                            </button>
                            <img src={split} alt="-"/>
                            <button onClick={() => setZoom(prevState => prevState - 1)}>
                                <img src={minus} alt="-"/>
                            </button>
                        </div>


                    </div>
                    {pets && <PetsMarkers pets={pets} selected={selectedPet} onSelect={(pet) => setSelectedPet(pet)}/>}
                    {selectedPet && <PetInfoWindow selectedPet={selectedPet} onClose={() => setSelectedPet(null)}/>}
                </GoogleMap>
            </LoadScript>
            <div className='absolute bottom-10 w-full flex justify-center'>
                <button className="w-40 h-14 bg-[#141416] rounded-xl  flex items-center justify-center">
                    <p className="text-white font-['Poppins'] text-sm mr-2.5">Show a list</p>
                    <img src={list_ico} alt={''}/>
                </button>
            </div>
        </>
    )
}
