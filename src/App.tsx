import React from 'react';
import {Map} from './components/Map';
import {
    QueryClient,
    QueryClientProvider
} from 'react-query';
import {usePetQuery} from "./hooks/usePetQuery";
import list_ico from "./assets/list_ico.svg";
import {BrowserRouter as Router} from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
    return (

        <QueryClientProvider client={queryClient}>
            <Router>
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

