import {useQuery} from "react-query";


export const queryFunc = async ({location, radius}: { location: string, radius: number }) => {
    // Fetch pets data using location and radius
    return fetch('https://jsonplaceholder.typicode.com/todos/1')
};

export const usePetQuery = ({location, radius}: { location: string, radius: number }) => {
    const queryKey = ['pets', location, radius];


    return useQuery(queryKey, ()=>queryFunc({location, radius}));
}
