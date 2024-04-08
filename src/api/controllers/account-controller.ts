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

const getAccountByEmail = async (req: Request, res: Response) => {
    try {
        const account = await AccountService.getAccountByEmail(req.body.email as string);
        if (!account) throw new Error('Account not found.');
        res.send(account);
    } catch (error: any) {
        console.error("We found an error: ", error.message);
        return res.status(400).json({ error: error.message });
    }
};

export const AccountController = {
    signup,
    getAccountByEmail
};