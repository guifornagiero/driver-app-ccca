export interface SignupInputDTO {
    name: string
    email: string
    cpf: string
    car_plate: string
    password: string
    is_passenger: boolean
    is_driver: boolean
}

export interface SignupOutputDTO {
    accountId: string
}