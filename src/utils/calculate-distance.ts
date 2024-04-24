import { Coords } from "../api/models/entity/ride";

export const calculateDistance = (from: Coords, to: Coords): number => {
    const latVariation = to.lat - from.lat;
    const longVariation = to.long - from.long;
    const distance = Math.sqrt(Math.pow(latVariation, 2) + Math.pow(longVariation, 2))
    return Math.round(distance);
}