import React from 'react';
import {Map} from './components/Map';""
import {
    QueryClient,
    QueryClientProvider
} from 'react-query';
import {usePetQuery} from "./hooks/usePetQuery";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Map useQuery={usePetQuery}/>
        </QueryClientProvider>
    );
}

export default App

