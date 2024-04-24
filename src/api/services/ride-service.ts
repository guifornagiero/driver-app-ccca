import { calculateDistance } from "../../utils/calculate-distance";
import { RideDAL } from "../dal/ride.dal";
import { RideDTO } from "../models/dto/ride-dto";
import { Account } from "../models/entity/account";
import { Ride, fromDTOtoRide } from "../models/entity/ride";
import { AccountService } from "./account-service";

export class RideService {
    constructor(private readonly rideDAL: RideDAL) {
        this.rideDAL = rideDAL;
    }

    public async requestRide(rideDTO: RideDTO) {
        const passenger: Account = await AccountService.getAccount(rideDTO.passenger_id);
        if (!passenger.is_passenger) throw new Error('User is not a passenger.');
        const incompletedRides: Ride[] = await this.rideDAL.getPassengerIncompletedRides(passenger.account_id);
        if (incompletedRides.length > 0) throw new Error('User has incompleted rides.');

        const ride = fromDTOtoRide(rideDTO);
        await this.rideDAL.saveRide(ride);
        return { 
            rideId: ride.ride_id 
        };
    }

    public async getRide(rideId: string) {
        if (!rideId) throw new Error('RideId undefined.');
        const ride = await this.rideDAL.getRideByID(rideId);
        if(!ride) throw new Error('Ride not found.');
        return ride;
    }
}