import { endConnection, startConnection } from "../config/database";
import { Account } from "../models/entity/account";
import { SignupInputDTO, SignupOutputDTO } from "../models/dto/account-dto";
import crypto from "crypto";

const create = async (account: SignupInputDTO) => {
    const connection = startConnection();
    const id = crypto.randomUUID();
    try {
        await connection.query(`INSERT INTO cccat16.account
            (account_id, name, email, cpf, car_plate, is_passenger, is_driver) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [id, account.name, account.email, account.cpf, account.carPlate, account.isPassenger, account.isDriver]);
    } catch (error: any) {
        console.error("Database error: ", error.message);
    } finally {
        endConnection(connection);
    }
    const output: SignupOutputDTO = { accountId: id };
    return output;
};

const getByEmail = async (email: string) => {
    const connection = startConnection();
    try {
        const [account]: Account[] = await connection.query("SELECT * FROM cccat16.account WHERE email = $1", [email]);
        return account;
    } catch (error: any) {
        console.error("Database error: ", error.message);
    } finally {
        endConnection(connection);
    }
}

const getById = async (accountId: string) => {
    const connection = startConnection();
    try {
        const [account]: Account[] = await connection.query("SELECT * FROM cccat16.account WHERE account_id = $1", [accountId]);
        return account;
    } catch (error: any) {
        console.error("Database error: ", error.message);
    } finally {
        endConnection(connection);
    }
}

export const AccountDAL = {
    create,
    getById,
    getByEmail
};