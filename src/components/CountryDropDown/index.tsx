import React from 'react';
import arrow from "../../assets/countries/arrow.svg";

type County = {
    name: string,
    icon: any
}

export interface IProp {
    type?: 'currency' | 'country',
    data: Array<County>
    selected: County
    onSelect: (county: County) => void
    isOpen: boolean
    onOpen: (isOpen: boolean) => void
    className?: string
}

export const CountryDropDown = ({
                                    type = 'currency',
                                    data,
                                    selected = data[0],
                                    onSelect,
                                    onOpen,
                                    isOpen,
                                    className
                                }: IProp) => {

    return (
        <div className={'relative inline-block text-left ' + className}>
            <div className='flex items-center h-10 border border-gray-200 rounded-full cursor-pointer bg-neutral-100'
                 onClick={() => onOpen(!isOpen)}>
                <img src={selected.icon} alt={selected.name} className={'rounded-full w-6 h-6 object-none mx-2'}/>
                {type === 'currency' ? <h2 className='mr-2 font-medium'>{selected.name.split(' ')[0]}</h2> : null}
                <img src={arrow} alt="Czechia" className={'mr-2'}/>
            </div>
            {isOpen ? <div
                className={'origin-top-right absolute right-0 mt-2 p-4 shadow-lg bg-white rounded-3xl '}>
                <div className='bg-white w-3.5 h-3.5 absolute top-[-4px] right-10 rotate-45 rounded'></div>
                <div className={'max-h-72 overflow-y-auto'}>
                    {data.map((country) => {
                        return <div
                            className={`w-64 mr-2.5 px-4 p-3 rounded-xl text-sm text-customGray hover:bg-neutral-100 flex items-center cursor-pointer 
                            ${selected.name === country.name && 'group bg-neutral-100 text-neutral-900'}`}
                            onClick={() => {
                                onSelect(country)
                                onOpen(false)
                            }}
                        >
                            <img src={country.icon} alt={country.name}
                                 className={'rounded-full w-6 h-6 object-none mx-2'}/>
                            <h2 className='font-semibold'>{country.name.split('(')[0]}</h2>
                            &nbsp;
                            <h2 className={selected.name === country.name ? "font-semibold" : 'font-medium'}>{
                                country.name.split('(')[1] && "(" + country.name.split('(')[1]}</h2>
                        </div>
                    })}
                </div>
            </div> : null}
        </div>
    );
};


