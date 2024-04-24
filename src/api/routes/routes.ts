import { Router } from "express";
import { AccountController } from "../controllers/account-controller";
import { RideController } from "../controllers/ride-controller";
import { RideService } from "../services/ride-service";
import { RideDALDatabase, RideDALMemory } from "../dal/ride.dal";

const router: Router = Router();

const rideDAL = new RideDALDatabase();
const rideService = new RideService(rideDAL);
const rideController = new RideController(rideService);

//#region Account 

router.post('/signup', AccountController.signup);
router.get('/getAccount/:accountId', AccountController.getAccount);

//#endregion

//#region Ride

router.post('/requestRide', (req, res) => rideController.requestRide(req, res));
router.get('/getRide/:rideId', (req, res) => rideController.getRide(req, res));

//#endregion

export default router;