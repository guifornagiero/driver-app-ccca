import { SignupInputDTO, SignupOutputDTO } from "../models/dto/account-dto";
import { validateFields } from "../../utils/validate-fields";
import { AccountDAL } from "../dal/account-dal";

type Output = object | SignupOutputDTO;

const signup = async (account: SignupInputDTO): Promise<Output> => {
    if(!validateFields(account)) return { message: 'Invalid fields. ☹' };
    const id = await AccountDAL.create(account);
    return id;
};

export const AccountService = {
    signup
};