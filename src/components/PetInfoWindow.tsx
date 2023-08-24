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
            <div className="bg-white rounded-3xl max-h-60 w-80 p-2">
                {selectedPet.pets.map((pet) =>
                    <div key={pet.id} className='group flex items-center justify-between cursor-default rounded-xl hover:bg-[#F4F5F6]'>
                        <div className='flex items-center'>
                            <img className="w-12 h-12 m-0 object-cover rounded-lg m-0.5" src={pet.images[0].urls.card}
                                 alt={pet.name}/>
                            <h2 className="font-['Poppins'] font-medium text-base ml-2.5 text-customGray group-hover:text-[#141416] group-hover:font-semibold">{pet.name}</h2>
                        </div>
                        <div className={'mr-3'}>
                            <PriceButton price={pet.price} pricingType={pet.pricingType}/>
                        </div>
                    </div>
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
            <div className="bg-white h-80 w-64 rounded-3xl">
                <button onClick={onClose}
                        className='absolute bg-white bg-opacity-30 rounded-full top-4 left-4 w-6 h-6 flex justify-center items-center'>
                    <img src={cross} alt=""/>
                </button>
                <div className='absolute top-4 right-4 flex flex-col items-end space-y-2'>
                    <FavoriteButton data={selectedPet} isWhite={true}/>
                    <div
                        className={'bg-gray-50 h-8 w-10 flex items-center ' +
                            'justify-center rounded font-bold font-[\'Poppins\'] ' +
                            'text-neutrals text-xs'}>
                        {selectedPet.pets[0].contract.name}
                    </div>
                </div>
                <img
                    src={selectedPet.pets[0].images[0].urls.card}
                    alt={selectedPet.pets[0].name}
                    className="w-full h-80 m-0 object-cover"
                />
                <div
                    className='flex justify-between items-center rounded-t-xl bg-white absolute bottom-0 w-full p-4'>
                    <div>
                        <h2 className="font-semibold font-['Poppins'] text-base mb-1">{selectedPet.pets[0].name}</h2>
                        <p className="font-medium font-['Poppins'] text-customGray text-sm">{selectedPet.pets[0].breed.name}</p>
                    </div>
                    <PriceButton price={selectedPet.pets[0].price} pricingType={selectedPet.pets[0].pricingType}/>
                </div>
            </div>
        </InfoWindow>
    );
};

