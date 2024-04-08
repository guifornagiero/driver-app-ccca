import { SignupInputDTO } from "../api/models/dto/account-dto";
import { validateCPF } from "./validate-cpf";

export const validateFields = (account: SignupInputDTO) => {
    return validateName(account.name) &&
        validateEmail(account.email) &&
        validateCarPlate(account.carPlate) &&
        validateCPF(account.cpf) &&
        validatePassengerOrDriver(account.isPassenger, account.isDriver);
}

const validateName = (name: string) => {
    const regex = /^[a-zA-Z]+\s[a-zA-Z]+$/;
    return regex.test(name);
};

export const validateEmail = (email: string) => {
    const regex = /^(.+)@(.+)$/;
    return regex.test(email);
};

const validateCarPlate = (carPlate: string) => {
    const regex = /[A-Z]{3}[0-9]{4}/;
    return regex.test(carPlate);
};

const validatePassengerOrDriver = (isPassenger: boolean, isDriver: boolean) => {
    return isPassenger !== isDriver;
};