import { Coords } from "../entity/ride";

export interface RideDTO {
    passenger_id: string,
    from: Coords,
    to: Coords
}