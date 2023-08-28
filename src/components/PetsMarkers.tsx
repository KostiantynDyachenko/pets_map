import React, {useMemo} from 'react';
import {Marker} from "@react-google-maps/api";
import ico from "../assets/ico.svg";
import ico_field from "../assets/ico_filed.svg";
import {Data, Record} from "../types/pet.type";
import {stringToLocation} from "../helpers/locationToString";
import {PetMarker, PetMarkerField} from "../assets/icons/PetMarker";

export const PetsMarkers = ({
                                pets,
                                selected,
                                onSelect,
    zoom
                            }: { pets: Data, selected?: Record | null, onSelect: (pet: Record | null) => void, zoom: number }) => {

    return useMemo(() => {

        const handleSelectMarker = (pet: Record | null) => {
            onSelect(pet)
        }
        const handleIcoChange = (count: number, isSelected: any): string => {
            if (count > 1 && isSelected) {
                return `data:image/svg+xml;charset=UTF-8;base64,${btoa(PetMarkerField(count))}`
            }
            if (count > 1) {
                return `data:image/svg+xml;charset=UTF-8;base64,${btoa(PetMarker(count))}`
            }
            if (isSelected) {
                return ico
            }
            return ico_field
        }

        return (
            <>
                {pets.map((record: Record) => (
                    <Marker
                        icon={{
                            url: handleIcoChange(record.pets.length, selected?.location === record.location),
                            //scaledSize: new google.maps.Size(Math.min(zoom*10, 80), Math.min(zoom*10,90)),
                            anchor: new window.google.maps.Point(10, 30)
                        }}
                        key={record.location}
                        position={stringToLocation(record.location)}
                        onClick={() => handleSelectMarker(!selected ? record : null)}
                    >
                    </Marker>
                ))}
            </>
        );
    }, [pets, selected, onSelect])
}


