import {useQuery} from "react-query";
import { Data} from "../types/pet.type";

const petsData: Data = [
    {
        location: '52.5200,13.4050',
        pets: [
            {
            id: '1',
            name: 'Buddy',
            breed: {
                name: 'Dog',
            },
            price: 100,
            pricingType: 'money',
            location: [52.5200, 13.4050],
            images: [{
                id: '1',
                urls: {
                    card: 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
                },
            }],
            contract: {
                name: 'BUY'
            }
        },
            {
            id: '2',
            name: 'Buddy',
            breed: {
                name: 'Dog',
            },
            price: 100,
            pricingType: 'money',
            location: [52.5200, 13.4050],
            images: [{
                id: '1',
                urls: {
                    card: 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
                },
            }],
            contract: {
                name: 'BUY'
            }
        },
            {
            id: '3',
            name: 'Buddy',
            breed: {
                name: 'Dog',
            },
            price: 100,
            pricingType: 'money',
            location: [52.5200, 13.4050],
            images: [{
                id: '1',
                urls: {
                    card: 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
                },
            }],
            contract: {
                name: 'BUY'
            }
        },
            {
            id: '4',
            name: 'Buddy',
            breed: {
                name: 'Dog',
            },
            price: 100,
            pricingType: 'money',
            location: [52.5200, 13.4050],
            images: [{
                id: '1',
                urls: {
                    card: 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
                },
            }],
            contract: {
                name: 'BUY'
            }
        },
        ]
    },
    {
        location: '42.5200,13.4050',
        pets: [
            {
                id: '1',
                name: 'Buddy',
                breed: {
                    name: 'Dog',
                },
                price: 100,
                pricingType: 'money',
                location: [52.5200, 13.4050],
                images: [{
                    id: '1',
                    urls: {
                        card: 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
                    },
                }],
                contract: {
                    name: 'BUY'
                }
            },
        ]
    },
    {
        location: '56.5200,10.4050',
        pets: [
            {
                id: '1',
                name: 'Buddy',
                breed: {
                    name: 'Dog',
                },
                price: 100,
                pricingType: 'money',
                location: [52.5200, 13.4050],
                images: [{
                    id: '1',
                    urls: {
                        card: 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
                    },
                }],
                contract: {
                    name: 'BUY'
                }
            },
            {
                id: '2',
                name: 'Buddy',
                breed: {
                    name: 'Dog',
                },
                price: 100,
                pricingType: 'money',
                location: [52.5200, 13.4050],
                images: [{
                    id: '1',
                    urls: {
                        card: 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
                    },
                }],
                contract: {
                    name: 'BUY'
                }
            },
        ]
    },
    {
        location: '42.5200,25.4050',
        pets: [
            {
                id: '1',
                name: 'Buddy',
                breed: {
                    name: 'Labrador',
                },
                price: 100,
                pricingType: 'money',
                location: [52.5200, 13.4050],
                images: [{
                    id: '1',
                    urls: {
                        card: 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
                    },
                }],
                contract: {
                    name: 'BUY'
                }
            },
        ]
    },
];
export const queryFunc = async ({location, radius}: { location: string, radius: number }) => {
    // Fetch pets data using location and radius
    // simulating empty location
    if (radius < 0.22 && location.slice(0, 2)==='52') {
        return new Promise((resolve) => {
            resolve([]);
        });
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(petsData);
        }, 1000);
    });
};

export const usePetQuery = (data: { location: string, radius: number }) => {
    const queryKey = ['pets', data];

    return useQuery({
        queryKey,
        queryFn: () => queryFunc(data),
        enabled: !!data,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });
}

