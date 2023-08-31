import React, {useState} from 'react';
import Czechia from "../../assets/countries/Czechia.svg";
import Poland from "../../assets/countries/Poland.svg";
import Deutschland from "../../assets/countries/Deutschland.svg";
import arrow from "../../assets/countries/arrow.svg";

const mockCountries = [
    {
        name: 'Kč (Czech koruna)',
        icon: Czechia,
    },
    {
        name: 'zł (Polish złoty)',
        icon: Poland,
    },
    {
        name: 'Euro',
        icon: Deutschland,
    },
]

export const CountryDropDown = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(mockCountries[0]);

    return (
        <div className={'relative inline-block text-left'}>
            <div className='h-10 bg-neutral-100 border-gray-200 border rounded-full flex items-center cursor-pointer'
                 onClick={() => setIsOpen(!isOpen)}>
                <img src={selected.icon} alt={selected.name} className={'rounded-full w-6 h-6 object-none mx-2'}/>
                <h2 className='font-medium'>{selected.name.split(' ')[0]}</h2>
                <img src={arrow} alt="Czechia" className={'mx-2'}/>
            </div>
            {isOpen ? <div
                className={'origin-top-right absolute right-0 mt-2 p-4 shadow-lg bg-white rounded-3xl'}>
                {mockCountries.map((country) => {
                    return <div
                        className={`w-72 block px-4 p-3 rounded-xl text-sm text-customGray hover:bg-neutral-100 flex items-center cursor-pointer ${selected.name === country.name && 'font-semibold bg-neutral-100 text-neutral-900' }`}
                        onClick={() => setSelected(country)}
                    >
                        <img src={country.icon} alt={country.name} className={'rounded-full w-6 h-6 object-none mx-2'}/>
                        <h2>{country.name}</h2>
                    </div>
                })}
            </div> : null}
        </div>
    );
};


