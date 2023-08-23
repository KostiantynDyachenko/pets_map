import React, {useMemo} from 'react';
import {Marker} from "@react-google-maps/api";
import ico from "../assets/ico.svg";
import ico_field from "../assets/ico_filed.svg";
import {Pet} from "./Map";

export const PetsMarkers = ({
                                pets,
                                selected,
                                onSelect
                            }: { pets: Array<Pet>, selected?: Pet | null, onSelect: (pet: Pet | null) => void }) => {


    return useMemo(() => {

        const handleSelectMarker = (pet: Pet) => {
            onSelect(pet)
        }

        return (
            <>
                {pets.map((pet: Pet) => (
                    <Marker
                        icon={{
                            url: pet.id === selected?.id ? ico : ico_field,
                            scale: 7
                        }}
                        key={pet.id}
                        position={{lat: pet.location[0], lng: pet.location[1]}}
                        onClick={() => handleSelectMarker(pet)}
                    >
                    </Marker>
                ))}
            </>
        );
    }, [pets, selected, onSelect])
}


