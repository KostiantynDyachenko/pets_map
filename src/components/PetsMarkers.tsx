import React, {useMemo} from 'react';
import {Marker} from "@react-google-maps/api";
import ico from "../assets/ico.svg";
import ico_field from "../assets/ico_filed.svg";
import {Pet} from "./Map";

export const PetsMarkers =({
                         pets,
                         selectedPet,
                         setSelectedPet
                     }: { pets: Array<Pet>, selectedPet?: Pet | null, setSelectedPet: (pet: Pet | null) => void }) =>{
    return useMemo(() => {

        return (
            <>
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
            </>
        );
    }, [pets, selectedPet, setSelectedPet])
}


