import { endConnection, startConnection } from "../config/database";
import { Ride } from "../models/entity/ride";
import { RideStatusEnum } from "../models/enum/ride-status-enum";

export interface RideDAL {
    saveRide(ride: Ride): Promise<void>;
    getRideByID(rideId: string): Promise<Ride | undefined>;
    getPassengerIncompletedRides(passengerId: string): Promise<Ride[]>;
}

export class RideDALDatabase implements RideDAL {
    async saveRide(ride: Ride): Promise<void> {
        const connection = startConnection();
        try {
            await connection.query(`INSERT INTO cccat16.ride
                (ride_id, passenger_id, driver_id, status, fare, distance, from_lat, from_long, to_lat, to_long, date)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
                [ride.ride_id, ride.passenger_id, ride.driver_id, ride.status, ride.fare, ride.distance, ride.from_lat, ride.from_long,
                ride.to_lat, ride.to_long, ride.date]);
        } catch (error: any) {
            console.error("Database error: ", error.message);
        } finally {
            await endConnection(connection);
        }
    }

    async getRideByID(rideId: string): Promise<Ride | undefined> {
        throw new Error("Method not implemented.");
    }

    async getPassengerIncompletedRides(passengerId: string): Promise<Ride[]> {
        const connection = startConnection();
        try {
            const rides: Ride[] = await connection.query(`SELECT * FROM cccat16.ride
                WHERE passenger_id = $1 AND status = $2`, 
                [passengerId, RideStatusEnum.requested.toString()]);
            return rides || [];
        } catch (error: any) {
            console.error("Database error: ", error.message);
            return [];
        } finally {
            await endConnection(connection);
        }
    }
}

export class RideDALMemory implements RideDAL {
    rides: Ride[] = [];

    async saveRide(ride: Ride): Promise<void> {
        this.rides.push(ride);
    }

    async getRideByID(rideId: string): Promise<Ride | undefined> {
        const ride = this.rides.find(ride => ride.ride_id === rideId);
        return ride;
    }

    async getPassengerIncompletedRides(passengerId: string): Promise<Ride[]> {
        const requestedRides = this.rides.filter(ride => ride.status !== RideStatusEnum.completed || RideStatusEnum.canceled);
        return requestedRides;
    }
}