import React from 'react';
import {InfoWindow} from "@react-google-maps/api";
import cross from "../assets/Line.svg";
import FavoriteButton from "./FavoriteButton";
import PriceButton from "./PriceButton";
import {Pet} from "./Map";

export const PetInfoWindow = ({
                           selectedPet,
                           setSelectedPet
                       }: { selectedPet: Pet, setSelectedPet: (pet: Pet | null) => void }) => {

    return (
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
                        <span
                            className={'block bg-neutrals2 h-8 w-10 flex items-center justify-center mt-4 rounded'}>
                                            <p className="font-bold font-['Poppins'] text-neutrals text-xs">{selectedPet.contract.name}</p>
                                        </span>
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
    );
};

