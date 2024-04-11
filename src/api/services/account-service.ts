import { SignupInputDTO } from "../models/dto/account-dto";
import { fixUserTypeData, invalidDriver, invalidPassenger, validateEmail, validateName, validateUserType } from "../../utils/validate-fields";
import { AccountDAL } from "../dal/account-dal";
import { validateCPF } from "../../utils/validate-cpf";

const signup = async (account: SignupInputDTO) => {
    if (!validateName(account.name)) throw new Error('Invalid name.');
    if (!validateEmail(account.email)) throw new Error('Invalid email');
    if (!validateCPF(account.cpf)) throw new Error('Invalid CPF');
    if (!validateUserType(account)) throw new Error('User cannot be driver and passenger.');
    if (invalidDriver(account)) throw new Error('Invalid car plate for driver.');
    if (invalidPassenger(account)) throw new Error('A passenger does not have a car plate.');
    if (!!await AccountDAL.getByEmail(account.email)) throw new Error('Email already exists on our database.');
    
    fixUserTypeData(account);
    
    const id = await AccountDAL.create(account);
    return id;
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