import { SignupInputDTO } from "../dto/account-dto"
import crypto from "crypto";

export interface Account {
    id: string
    name: string
    email: string
    cpf: string
    carPlate: string
    isPassenger: boolean
    isDriver: boolean
}

export const fromDTOintoAccount = (accountDTO: SignupInputDTO): Account => {
    return {
        id: crypto.randomUUID(),
        name: accountDTO.name,
        email: accountDTO.email,
        cpf: accountDTO.cpf,
        carPlate: accountDTO.isDriver ? accountDTO.carPlate : '',
        isDriver: !!accountDTO.isDriver,
        isPassenger: !!accountDTO.isPassenger
    }
}