import React from 'react';
import {InfoWindow} from "@react-google-maps/api";
import cross from "../assets/Line.svg";
import FavoriteButton from "./FavoriteButton";
import PriceButton from "./PriceButton";
import {Pet} from "./Map";

export const PetInfoWindow = ({
                                  selectedPet,
                                  onClose
                              }: { selectedPet: Pet, onClose: () => void }) => {

    return (
        <InfoWindow
            position={{lat: selectedPet.location[0], lng: selectedPet.location[1]}}
            onCloseClick={onClose}
        >
            <div className="bg-blue h-80 w-64">
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
                        {selectedPet.contract.name}
                    </div>
                </div>
                <img
                    src={selectedPet.images[0].urls.card}
                    alt={selectedPet.name}
                    className="w-full h-80 m-0 object-cover"
                />
                <div
                    className='flex justify-between items-center rounded-t-xl bg-white absolute bottom-0 w-full p-4'>
                    <div>
                        <h2 className="font-semibold font-['Poppins'] text-base mb-1">{selectedPet.name}</h2>
                        <p className="font-medium font-['Poppins'] text-customGray text-sm">{selectedPet.breed.name}</p>
                    </div>
                    <PriceButton price={selectedPet.price} pricingType={selectedPet.pricingType}/>
                </div>
            </div>
        </InfoWindow>
    );
};

