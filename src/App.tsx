import React, {useState} from 'react';
import {Map} from './components/Map';
import {
    QueryClient,
    QueryClientProvider
} from 'react-query';
import {usePetQuery} from "./hooks/usePetQuery";
import list_ico from "./assets/list_ico.svg";
import {BrowserRouter as Router} from 'react-router-dom';
import {CountryDropDown} from "./components/CountryDropDown";
import Czechia from "./assets/countries/Czechia.svg";
import Poland from "./assets/countries/Poland.svg";
import Deutschland from "./assets/countries/Deutschland.svg";


const queryClient = new QueryClient();
const mockCurrency = [
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

const mockCountry = [
    {
        name: 'Czechia',
        icon: Czechia,
    },
    {
        name: 'Polish',
        icon: Poland,
    },
    {
        name: 'Deutschland',
        icon: Deutschland,
    },
]

function App() {

    const [currencyIsOpen, setCurrencyIsOpen] = useState(false);
    const [countryIsOpen, setCountryIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(mockCountry[0]);
    const [selectedCurrency, setSelectedCurrency] = useState(mockCurrency[0]);

    const handleCountryOpen = (isOpen: boolean) => {
        setCountryIsOpen(isOpen)
        setCurrencyIsOpen(false)
    }

    const handleCurrencyOpen = (isOpen: boolean) => {
        setCurrencyIsOpen(isOpen)
        setCountryIsOpen(false)
    }

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <div className='absolute z-50 top-2 right-10'>
                    <CountryDropDown data={mockCurrency}
                                     isOpen={currencyIsOpen}
                                     onOpen={handleCurrencyOpen}
                                     selected={selectedCurrency}
                                     onSelect={setSelectedCurrency}
                                    className={'mr-4'}
                    />
                    <CountryDropDown data={mockCountry}
                                     type={'country'}
                                     isOpen={countryIsOpen}
                                     onOpen={handleCountryOpen}
                                     selected={selectedCountry}
                                     onSelect={setSelectedCountry}
                    />
                </div>

                <div
                    className='absolute top-0 left-0 w-full h-screen px-5 py-8 overflow-hidden bg-neutral-900/70 sm:p-10'>
                    <div className='w-full h-full overflow-hidden rounded-3xl'>
                        <Map useQuery={usePetQuery}/>
                    </div>
                </div>
                <div className='absolute flex justify-center w-full bottom-16'>
                    <button className="flex items-center justify-center w-32 h-10 bg-neutral-900 rounded-xl">
                        <p className="text-white text-sm mr-2.5">Show a list</p>
                        <img src={list_ico} alt={''}/>
                    </button>
                </div>
            </Router>
        </QueryClientProvider>
    );
}

export default App

