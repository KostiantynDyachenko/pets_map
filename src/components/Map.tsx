import React, {useState, useRef, useEffect} from 'react'
import {GoogleMap, LoadScript} from '@react-google-maps/api';
import {locationToString} from "../helpers/locationToString";
import {PetInfoWindow} from "./PetInfoWindow";
import {PetsMarkers} from "./PetsMarkers";
import {Data, Record} from "../types/pet.type";
import {Loader} from "./Loader";
import minus from '../assets/minus.svg'
import plus from '../assets/plus.svg'
import split from '../assets/split_line.svg'
import {Modal} from "./Modal";

const google_api = 'AIzaSyD7u-mIFJZVbQ-20sNfrABECqJbgTvNxr8'

const defCenter = {lat: 52.5200, lng: 13.4050}
const {innerWidth: width, innerHeight: height} = window;

export const Map = ({
                        useQuery
                    }: { useQuery: any }) => {
    const mapRef = useRef(null);
    const [selectedPet, setSelectedPet] = useState<Record | null>()
    const [zoom, setZoom] = useState(4);
    const [center, setCenter] = useState({lat: 52.5200, lng: 13.4050});
    const [isModalVisible, setModalVisible] = useState(false);

    const {data, isLoading, refetch} = useQuery({
        // @ts-ignore
        location: locationToString(center.lat, center.lng),
        radius: 156543.03392 * Math.cos(center.lat * Math.PI / 180) / Math.pow(2, zoom) * Math.max(width, height) / 2
    })
    // eslint-disable-next-line
    const pets: Data = data ? data : []

    useEffect(() => {
        if (pets.length === 0 && !isLoading) setModalVisible(true)
    }, [pets, isLoading]);

    const handleModalSubmit = () => {
        setModalVisible(false)
        refetch()
    }
    const [click, setClick] = useState(false)

    const drag = useRef(false);
    const prevY = useRef(0);
    const speedUp = useRef(0);
    const speedDown = useRef(0);

    const handleTouchMove = (e: any) => {

        if (drag.current) {
            if (prevY.current - e.touches[0].clientY > 1.5) {
                if (speedUp.current > 15) {
                    // @ts-ignore
                    mapRef.current.setZoom(Math.min(mapRef.current.zoom + 1, 20))
                    speedUp.current = 0
                } else {
                    speedUp.current += 1
                }

            } else if (prevY.current - e.touches[0].clientY < -1.5) {

                if (speedDown.current > 15) {
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
                        height: '100%'
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
                    {isLoading ? <div className="absolute z-50 flex justify-center w-full top">
                        <Loader/>
                    </div> : null}
                    <div className='absolute flex flex-col items-end w-full top-8'>
                        <div className="flex flex-col items-center justify-around h-16 mr-8 bg-white rounded-full w-9">
                            <button onClick={() => setZoom(prevState => prevState + 1)}>
                                <img src={plus} alt="+"/>
                            </button>
                            <img src={split} alt="-"/>
                            <button onClick={() => setZoom(prevState => prevState - 1)}>
                                <img src={minus} alt="-"/>
                            </button>
                        </div>
                    </div>
                    <Modal isOpen={isModalVisible} onSubmit={handleModalSubmit}/>
                    {pets && <PetsMarkers pets={pets} selected={selectedPet} onSelect={(pet) => setSelectedPet(pet)}/>}
                    {selectedPet && <PetInfoWindow selectedPet={selectedPet} onClose={() => setSelectedPet(null)}/>}
                </GoogleMap>
            </LoadScript>
        </>
    )
}
