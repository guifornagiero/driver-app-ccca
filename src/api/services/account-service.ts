import { SignupInputDTO, SignupOutputDTO } from "../models/dto/account-dto";
import { validateEmail, validateFields } from "../../utils/validate-fields";
import { AccountDAL } from "../dal/account-dal";
import { Account } from "../models/entity/account";

type Output = object | SignupOutputDTO;

const signup = async (account: SignupInputDTO): Promise<Output> => {
    if(!validateFields(account)) return { message: 'Invalid fields.' };
    const id = await AccountDAL.create(account);
    return id;
};

const getAccountByEmail = async (email: string) => {
    if(!validateEmail(email)) return { message: 'Invalid email.' };
    const account = await AccountDAL.getByEmail(email);
    return account;
}

export const AccountService = {
    signup,
    getAccountByEmail
};