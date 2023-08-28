import React from 'react';
import {InfoWindow, InfoBox} from "@react-google-maps/api";
import cross from "../assets/Line.svg";
import FavoriteButton from "./FavoriteButton";
import PriceButton from "./PriceButton";
import {Record} from "../types/pet.type";
import {stringToLocation} from "../helpers/locationToString";

export const PetInfoWindow = ({
                                  selectedPet,
                                  onClose
                              }: { selectedPet: Record, onClose: () => void }) => {

    if (selectedPet.pets.length > 1) {
        return <InfoBox position={new google.maps.LatLng(stringToLocation(selectedPet.location))}
                        onCloseClick={onClose}
                        options={{
                            closeBoxURL: '',
                        }}
        >
            <div className="p-2 bg-white rounded-3xl max-h-60 w-80">
                {selectedPet.pets.map((pet) =>
                    <a href={'#'} key={pet.id} className='flex items-center justify-between cursor-default group rounded-xl hover:bg-gray-50'>
                        <div className='flex items-center'>
                            <img className="w-12 h-12 object-cover rounded-lg m-0.5" src={pet.images[0].urls.card}
                                 alt={pet.name}/>
                            <h2 className="font-medium text-base ml-2.5 text-customGray group-hover:text-neutral-900 group-hover:font-semibold">{pet.name}</h2>
                        </div>
                        <div className={'mr-3'}>
                            <PriceButton price={pet.price} pricingType={pet.pricingType}/>
                        </div>
                    </a>
                )
                }
            </div>
        </InfoBox>
    }

    return (
        <InfoWindow
            position={stringToLocation(selectedPet.location)}
            onCloseClick={onClose}
        >
            <div className="w-64 bg-white h-80 min-w-64 rounded-3xl">
                <button onClick={onClose}
                        className='absolute flex items-center justify-center w-6 h-6 bg-white rounded-full bg-opacity-30 top-4 left-4'>
                    <img src={cross} alt=""/>
                </button>
                <div className='absolute flex flex-col items-end top-4 right-4'>
                    <FavoriteButton data={selectedPet} isWhite={true}/>
                    <div
                        className={'bg-customGreenDark text-white h-8 w-10 flex items-center ' +
                            'justify-center rounded font-bold mt-4 ' +
                            'text-neutrals text-xs'}>
                        {selectedPet.pets[0].contract.name}
                    </div>
                </div>
                <img
                    src={selectedPet.pets[0].images[0].urls.card}
                    alt={selectedPet.pets[0].name}
                    className="object-cover w-full m-0 h-80"
                />
                <div
                    className='absolute bottom-0 flex items-center justify-between w-full p-4 bg-white rounded-t-xl'>
                    <div>
                        <h2 className="mb-1 text-base font-semibold">{selectedPet.pets[0].name}</h2>
                        <p className="text-sm font-medium text-customGray">{selectedPet.pets[0].breed.name}</p>
                    </div>
                    <PriceButton price={selectedPet.pets[0].price} pricingType={selectedPet.pets[0].pricingType}/>
                </div>
            </div>
        </InfoWindow>
    );
};

