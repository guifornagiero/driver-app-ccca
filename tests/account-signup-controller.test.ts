import axios from "axios";
import { Config, getConfig } from "../src/api/config/config";

const configuration: Config = getConfig();

describe('Testes para a CONTROLLER de Signup', () => {
    test('Deve criar uma conta para o passageiro', async () => {
        const input = {
            name: 'John Doe',
            email: `john.doe${Math.round(Math.random() * 100)}@gmail.com`,
            cpf: '87748248800',
            isPassenger: true
        };
        const responseSignup = await axios.post(`http://localhost:${configuration.port}/signup`, input);
        expect(responseSignup.status).toBe(200);
        const outputSignup = responseSignup.data;
        expect(outputSignup.accountId).toBeDefined();

        const responseGetAccount = await axios.get(
            `http://localhost:${configuration.port}/getAccount/${responseSignup.data.accountId}`
        );
        const outputGetAccount = responseGetAccount.data;
        expect(outputGetAccount.name).toBe(input.name);
        expect(outputGetAccount.email).toBe(input.email);
        expect(outputGetAccount.cpf).toBe(input.cpf);
    }),

    test('Deve retornar um erro de isDriver e isPassenger iguais', async () => {
        const input = {
            name: 'John Doe',
            email: `john.doe${Math.round(Math.random() * 10)}@gmail.com`,
            cpf: '87748248800',
            isPassenger: true,
            isDriver: true
        };
        try {
            await axios.post(`http://localhost:${configuration.port}/signup`,input);
            fail('O teste deveria ter lançado um erro.');
        } catch (error: any) {
            expect(error.response.data.error).toBe('User cannot be driver and passenger.');
            expect(error.response.status).toBe(400);
        }
      });
});