import { SignupInputDTO } from "../api/models/dto/account-dto";

export const validateName = (name: string) => {
    const regex = /[a-zA-Z] [a-zA-Z]+/;
    return regex.test(name);
};

export const validateEmail = (email: string) => {
    const regex = /^(.+)@(.+)$/;
    return regex.test(email);
};

export const validateCarPlate = (carPlate: string) => {
    const regex = /[A-Z]{3}[0-9]{4}/;
    return regex.test(carPlate);
};

export const validateUserType = (account: SignupInputDTO) => 
    account.is_driver !== account.is_passenger;

export const invalidDriver = (account: SignupInputDTO) => 
    account.is_driver && !validateCarPlate(account.car_plate);

export const invalidPassenger = (account: SignupInputDTO) => 
    account.is_passenger && !!account.car_plate && account.car_plate.length > 0;