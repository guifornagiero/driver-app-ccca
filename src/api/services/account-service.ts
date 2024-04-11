import { SignupInputDTO } from "../models/dto/account-dto";
import { invalidDriver, invalidPassenger, validateEmail, validateName, validateUserType } from "../../utils/validate-fields";
import { AccountDAL } from "../dal/account-dal";
import { validateCPF } from "../../utils/validate-cpf";
import { Account, fromDTOintoAccount } from "../models/entity/account";

const signup = async (accountDTO: SignupInputDTO) => {
    if (!validateName(accountDTO.name)) throw new Error('Invalid name.');
    if (!validateEmail(accountDTO.email)) throw new Error('Invalid email');
    if (!validateCPF(accountDTO.cpf)) throw new Error('Invalid CPF');
    if (!validateUserType(accountDTO)) throw new Error('User cannot be driver and passenger.');
    if (invalidDriver(accountDTO)) throw new Error('Invalid car plate for driver.');
    if (invalidPassenger(accountDTO)) throw new Error('A passenger does not have a car plate.');
    if (!!await AccountDAL.getByEmail(accountDTO.email)) throw new Error('Email already exists on our database.');

    const account: Account = fromDTOintoAccount(accountDTO);
    const output = await AccountDAL.create(account);
    return output;
};

const getAccount = async (accountId: string) => {
    if(!accountId) throw new Error('AccountId undefined.');
    const account = await AccountDAL.getById(accountId);
    return account;
}

export const AccountService = {
    signup,
    getAccount
};