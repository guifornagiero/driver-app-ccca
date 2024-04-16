import { AccountService } from "../src/api/services/account-service";
import sinon from 'sinon';
import crypto from 'crypto';
import { AccountDAL } from "../src/api/dal/account-dal";

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
        // Stub sobrescreve o retorno das funções signup e getAccount para os retornos que eu pré defini
        const signupStub = sinon.stub(AccountService, 'signup').resolves({ accountId: crypto.randomUUID() });
        const getAccountStub = sinon.stub(AccountService, 'getAccount').resolves(input);

        const responseSignup = await AccountService.signup(input);
        expect(responseSignup.accountId).toBeDefined();

        const responseGetAccount = await AccountService.getAccount(responseSignup.accountId);
        expect(responseGetAccount.name).toBe(input.name);
        expect(responseGetAccount.email).toBe(input.email);
        expect(responseGetAccount.cpf).toBe(input.cpf);
        // Stub restaura o comportamento original das funções
        signupStub.restore();
        getAccountStub.restore();
      })

      test('Deve criar uma conta para o passageiro e buscar por ID com SPY', async () => {
        const input: any = {
            name: 'John Doe',
            email: `john.doe${Math.round(Math.random() * 100)}@gmail.com`,
            cpf: '87748248800',
            isPassenger: true
        };
        // Spy se prepara para ficar de olho no comportamento da função getAccount
        const getAccountSpy = sinon.spy(AccountService, "getAccount");
        
        const responseSignup = await AccountService.signup(input);
        expect(responseSignup.accountId).toBeDefined();

        const responseGetAccount = await AccountService.getAccount(responseSignup.accountId);
        expect(responseGetAccount.name).toBe(input.name);
        expect(responseGetAccount.email).toBe(input.email);
        expect(responseGetAccount.cpf).toBe(input.cpf);
        // Spy verifica se foi chamado uma vez, e se foi chamado com o parametro esperado
        expect(getAccountSpy.calledOnce).toBe(true);
        expect(getAccountSpy.calledWith(responseSignup.accountId)).toBe(true);
      })

      test('Deve criar uma conta para o passageiro e buscar por ID com MOCK', async () => {
        const input: any = {
            name: 'John Doe',
            email: `john.doe${Math.round(Math.random() * 100)}@gmail.com`,
            cpf: '87748248800',
            isPassenger: true
        };
        // Eu digo para o Mock o que eu espero que aconteça dentro da função
        const getAccountMock = sinon.mock(AccountDAL);
        getAccountMock.expects("getByEmail").withArgs(input.email).once();

        const responseSignup = await AccountService.signup(input);
        expect(responseSignup.accountId).toBeDefined();

        const responseGetAccount = await AccountService.getAccount(responseSignup.accountId);
        
        expect(responseGetAccount.name).toBe(input.name);
        expect(responseGetAccount.email).toBe(input.email);
        expect(responseGetAccount.cpf).toBe(input.cpf);
        // Mock verifica se o que eu esperava que acontecesse aconteceu dentro da fn
        getAccountMock.verify();
      })
});