export interface Pet {
    id: string,
    name: string,
    breed: {
        name: string,
    },
    price: number,
    pricingType: string,
    location: [number, number],
    images: Array<{
        id: string,
        urls: {
            card: string,
        }
    }>
    contract: {
        name: string
    }
}

export type Record = {
    location: string,
    pets: Array<Pet>
}
export type Data = Array<Record>
