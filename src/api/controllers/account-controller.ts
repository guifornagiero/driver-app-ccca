import { Request, Response } from "express";
import { SignupSchema } from "../schema/account";
import { SignupInputDTO } from "../models/dto/account-dto";
import { AccountService } from "../services/account-service";

const signup = async (req: Request, res: Response) => {
    if (!SignupSchema.safeParse(req.body).success) {
        return res.status(400).json({ message: "Invalid data format." });
    }
    const output = await AccountService.signup(req.body as SignupInputDTO);
    res.send(output);
};

const getAccount = async (req: Request, res: Response) => {
    res.send('getAccount');
};

export const AccountController = {
    signup,
    getAccount
};