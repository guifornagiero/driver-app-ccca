import { Request, Response } from "express";
import { SignupInputDTO } from "../models/dto/account-dto";
import { AccountService } from "../services/account-service";

const signup = async (req: Request, res: Response) => {
    try {
        const output = await AccountService.signup(req.body as SignupInputDTO);
        res.send(output);
    } catch (error: any) {
        console.error("We found an error: ", error.message);
        return res.status(400).json({ error: error.message });
    }
};

const getAccount = async (req: Request, res: Response) => {
    const accountId: string = req.params.accountId;
    try {
        const account = await AccountService.getAccount(accountId);
        res.send(account);
    } catch (error: any) {
        console.error("We found an error: ", error.message);
        return res.status(400).json({ error: error.message });
    }
}

export const AccountController = {
    signup,
    getAccount
};