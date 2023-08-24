export const locationToString = (lat: number, lng: number) => {
    return `${lat},${lng}`
}

export const stringToLocation = (location: string) => {
    const [latStr, lngStr] = location.split(',');
    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);

    return {lat, lng};
}
