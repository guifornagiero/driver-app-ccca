import { RideDAL, RideDALMemory } from "../../src/api/dal/ride.dal";
import { RideDTO } from "../../src/api/models/dto/ride-dto";
import { RideStatusEnum } from "../../src/api/models/enum/ride-status-enum";
import { RideService } from "../../src/api/services/ride-service";

let rideService: RideService;

beforeEach(async () => {
    const rideDAL: RideDAL = new RideDALMemory();
    rideService = new RideService(rideDAL);
})

describe('Teste para SERVICE de Ride', () => {
    test('Deve criar uma Ride e retornar o RideId utilizando FAKE', async () => {
        const rideDTO: RideDTO = {
            passenger_id: "0d1ec111-9512-4c3b-b8ca-76e4639030d0",
            from: {
                lat: 100,
                long: 400
            },
            to: {
                lat: 400,
                long: 1000
            }
        };
        const responseRequest = await rideService.requestRide(rideDTO);
        expect(responseRequest.rideId).toBeDefined();

        const responseGetRide = await rideService.getRide(responseRequest.rideId);
        expect(responseGetRide.ride_id).toBe(responseRequest.rideId);
        expect(responseGetRide.status).toBe(RideStatusEnum.requested);
        expect(responseGetRide.passenger_id).toBe(rideDTO.passenger_id);
    });

    test('Não deve criar uma Ride se o usuário não for passageiro utilizando FAKE', async () => {
        const rideDTO: RideDTO = {
            passenger_id: "a405ffdb-d2f5-492c-8949-310b1123834a",
            from: {
                lat: 100,
                long: 400
            },
            to: {
                lat: 400,
                long: 1000
            }
        };
        await expect(() => rideService.requestRide(rideDTO)).rejects.toThrow(new Error('User is not a passenger.'));
    });

    test('Não deve criar uma Ride se o usuário já tiver uma Ride REQUESTED utilizando FAKE', async () => {
        const firstRideDTO: RideDTO = {
            passenger_id: "0d1ec111-9512-4c3b-b8ca-76e4639030d0",
            from: {
                lat: 100,
                long: 400
            },
            to: {
                lat: 400,
                long: 1000
            }
        };
        const responseFirstRequest = await rideService.requestRide(firstRideDTO);
        expect(responseFirstRequest.rideId).toBeDefined();
        const responseGetRide = await rideService.getRide(responseFirstRequest.rideId);
        expect(responseGetRide.ride_id).toBe(responseFirstRequest.rideId);
        expect(responseGetRide.status).toBe(RideStatusEnum.requested);
        expect(responseGetRide.passenger_id).toBe(firstRideDTO.passenger_id);

        const secondRideDTO: RideDTO = {
            passenger_id: "0d1ec111-9512-4c3b-b8ca-76e4639030d0",
            from: {
                lat: 400,
                long: 400
            },
            to: {
                lat: 670,
                long: 1000
            }
        };
        await expect(() => rideService.requestRide(secondRideDTO)).rejects.toThrow(new Error('User has incompleted rides.'));
    });
})