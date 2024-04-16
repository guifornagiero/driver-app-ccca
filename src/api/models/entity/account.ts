import { SignupInputDTO } from "../dto/account-dto"
import crypto from "crypto";

export interface Account {
    account_id: string
    name: string
    email: string
    cpf: string
    car_plate: string
    is_passenger: boolean
    is_driver: boolean
}

export const fromDTOintoAccount = (accountDTO: SignupInputDTO): Account => {
    return {
        account_id: crypto.randomUUID(),
        name: accountDTO.name,
        email: accountDTO.email,
        cpf: accountDTO.cpf,
        car_plate: accountDTO.is_driver ? accountDTO.car_plate : '',
        is_driver: !!accountDTO.is_driver,
        is_passenger: !!accountDTO.is_passenger
    }
}