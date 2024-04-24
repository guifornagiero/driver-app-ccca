import { Request, Response } from "express";
import { RideService } from "../services/ride-service";
import { Ride } from "../models/entity/ride";

export class RideController {
    constructor(private readonly rideService: RideService) {
        this.rideService = rideService;
    }

    public async requestRide(req: Request, res: Response) {
        try {
            const output = await this.rideService.requestRide(req.body);
            res.json(output);
        }  catch (error: any) {
            console.error("We found an error: ", error.message);
            return res.status(400).json({ error: error.message });
        }
    }

    public async getRide(req: Request, res: Response) {
        const rideId: string = req.params.rideId;
        try {
            const ride: Ride = await this.rideService.getRide(rideId);
            res.json(ride);
        } catch (error: any) {
            console.error("We found an error: ", error.message);
            return res.status(400).json({ error: error.message });
        }
    }
}