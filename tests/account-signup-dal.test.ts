import crypto from 'crypto';
import { AccountDAL } from '../src/api/dal/account-dal';
import { Account } from '../src/api/models/entity/account';

describe('Testes para a DAL de Signup', () => {
    test('Deve criar uma conta para o passageiro e buscar por ID', async () => {
        const account: Account = {
            account_id: crypto.randomUUID(),
            name: 'John Doe',
            email: `john.doe${Math.round(Math.random() * 100)}@gmail.com`,
            cpf: '87748248800',
            is_passenger: true,
            is_driver: false,
            car_plate: ''
        };
        await AccountDAL.create(account);
        const savedAccount = await AccountDAL.getById(account.account_id);
        expect(savedAccount!.account_id).toBe(account.account_id);
        expect(savedAccount!.name).toBe(account.name);
        expect(savedAccount!.email).toBe(account.email);
        expect(savedAccount!.cpf).toBe(account.cpf);
    })

    test('Deve criar uma conta para o passageiro e buscar por EMAIL', async () => {
        const account: Account = {
            account_id: crypto.randomUUID(),
            name: 'John Doe',
            email: `john.doe${Math.round(Math.random() * 100)}@gmail.com`,
            cpf: '87748248800',
            is_passenger: true,
            is_driver: false,
            car_plate: ''
        };
        await AccountDAL.create(account);
        const savedAccount = await AccountDAL.getByEmail(account.email);
        expect(savedAccount!.account_id).toBe(account.account_id);
        expect(savedAccount!.name).toBe(account.name);
        expect(savedAccount!.email).toBe(account.email);
        expect(savedAccount!.cpf).toBe(account.cpf);
    })
});