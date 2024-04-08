export interface SignupInputDTO {
    name: string
    email: string
    cpf: string
    carPlate: string
    password: string
    isPassenger: boolean
    isDriver: boolean
}

export interface SignupOutputDTO {
    accountId: string
}