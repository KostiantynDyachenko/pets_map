import {useQuery} from "react-query";
import {Pet} from "../components/Map";

const petsData: Array<Pet> = [
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
        name: 'Buddy2',
        breed: {
            name: 'Dog',
        },
        price: 100,
        pricingType: 'money',
        location: [52.5300, 13.4350],
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
        name: 'Buddy3',
        breed: {
            name: 'Dog',
        },
        price: 100,
        pricingType: 'money',
        location: [51.9194, 19.1451],
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
        name: 'Buddy3',
        breed: {
            name: 'Dog',
        },
        price: 100,
        pricingType: 'money',
        location: [41.9028, 12.4964],
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
        id: '5',
        name: 'Buddy3',
        breed: {
            name: 'Dog',
        },
        price: 100,
        pricingType: 'money',
        location: [37.9838, 23.7275],
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
        id: '6',
        name: 'Buddy3',
        breed: {
            name: 'Dog',
        },
        price: 100,
        pricingType: 'money',
        location: [38.7223, -9.1393],
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
        id: '7',
        name: 'Buddy3',
        breed: {
            name: 'Dog',
        },
        price: 100,
        pricingType: 'money',
        location: [48.3794, 31.1656],
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
];
export const queryFunc = async ({location, radius}: { location: string, radius: number }) => {
    // Fetch pets data using location and radius
    // simulating request on server for testing
    if (radius === 15) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([petsData[0]]);
            }, 500);
        });
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(petsData);
        }, 500);
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

