import { AccountService } from "../src/api/services/account-service";
import sinon from 'sinon';
import crypto from 'crypto';

describe('Testes para a SERVICE de Signup', () => {
    test('Deve criar uma conta para o passageiro e buscar por ID', async () => {
        const input: any = {
            name: 'John Doe',
            email: `john.doe${Math.round(Math.random() * 100)}@gmail.com`,
            cpf: '87748248800',
            isPassenger: true
        };
        const responseSignup = await AccountService.signup(input);
        expect(responseSignup.accountId).toBeDefined();

        const responseGetAccount = await AccountService.getAccount(responseSignup.accountId);
        expect(responseGetAccount.account_id).toBeDefined();
        expect(responseGetAccount.name).toBe(input.name);
        expect(responseGetAccount.email).toBe(input.email);
        expect(responseGetAccount.cpf).toBe(input.cpf);
    })

    test('Deve retornar um erro de isDriver e isPassenger iguais', async () => {
        const input: any = {
            name: 'John Doe',
            email: `john.doe${Math.round(Math.random() * 10)}@gmail.com`,
            cpf: '87748248800',
            isPassenger: true,
            isDriver: true
        };
        try {
            await AccountService.signup(input);
            fail('O teste deveria ter lançado um erro.');
        } catch (error: any) {
            expect(error.message).toBe('User cannot be driver and passenger.');
        }
      });

      test('Deve criar uma conta para o passageiro e buscar por ID com STUB', async () => {
        const input: any = {
            name: 'John Doe',
            email: `john.doe${Math.round(Math.random() * 100)}@gmail.com`,
            cpf: '87748248800',
            isPassenger: true
        };
        sinon.stub(AccountService, 'signup').resolves({ accountId: crypto.randomUUID() });
        sinon.stub(AccountService, 'getAccount').resolves(input);

        const responseSignup = await AccountService.signup(input);
        expect(responseSignup.accountId).toBeDefined();

        const responseGetAccount = await AccountService.getAccount(responseSignup.accountId);
        expect(responseGetAccount.name).toBe(input.name);
        expect(responseGetAccount.email).toBe(input.email);
        expect(responseGetAccount.cpf).toBe(input.cpf);
      })
});