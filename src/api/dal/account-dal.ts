import { endConnection, startConnection } from "../config/database";
import { Account } from "../models/entity/account";

const create = async (account: Account): Promise<void> => {
    const connection = startConnection();
    try {
        await connection.query(`INSERT INTO cccat16.account
            (account_id, name, email, cpf, car_plate, is_passenger, is_driver) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [account.id, account.name, account.email, account.cpf, account.carPlate, account.isPassenger, account.isDriver]);
    } catch (error: any) {
        console.error("Database error: ", error.message);
    } finally {
        endConnection(connection);
    }
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