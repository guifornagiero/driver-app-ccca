import { RideDTO } from "../dto/ride-dto"
import crypto from 'crypto'
import { RideStatusEnum } from "../enum/ride-status-enum"
import { calculateDistance } from "../../../utils/calculate-distance"

export interface Coords {
	lat: number,
	long: number
}

export interface Ride {
    ride_id: string,
	passenger_id: string,
	driver_id: string | null,
	status: number,
	fare: number,
	distance: number,
	from_lat: number,
	from_long: number,
	to_lat: number,
	to_long: number,
	date: Date
}

export const fromDTOtoRide = (rideDTO: RideDTO): Ride => {
	return {
		ride_id: crypto.randomUUID(),
		passenger_id: rideDTO.passenger_id,
		driver_id: null,
		status: RideStatusEnum.requested,
		fare: 0,
		distance: calculateDistance(rideDTO.from, rideDTO.to),
		from_lat: rideDTO.from.lat,
		from_long: rideDTO.from.long,
		to_lat: rideDTO.to.lat,
		to_long: rideDTO.to.long,
		date: new Date()
	}
}