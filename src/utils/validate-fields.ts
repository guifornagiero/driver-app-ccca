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
    account.isDriver !== account.isPassenger;

export const invalidDriver = (account: SignupInputDTO) => 
    account.isDriver && !validateCarPlate(account.carPlate);

export const invalidPassenger = (account: SignupInputDTO) => 
    account.isPassenger && !!account.carPlate && account.carPlate.length > 0;

export const fixPlate = (account: SignupInputDTO) => 
    account.carPlate = account.isDriver ? account.carPlate : '';