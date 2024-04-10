import axios from "axios";
import { Config, getConfig } from "../src/api/config/config";

const configuration: Config = getConfig();

describe('Testes para a rota de signup', () => {
    test('Deve criar uma conta para o passageiro', async () => {
        const input = {
            name: 'John Doe',
            email: `john.doe${Math.round(Math.random() * 100)}@gmail.com`,
            cpf: '87748248800',
            isPassenger: true
        };
        const output = await axios.post(`http://localhost:${configuration.port}/signup`, input);
        expect(output.status).toBe(200);
        expect(output.data).toHaveProperty('accountId');
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

    test('Deve buscar pelo email guifornagiero.c@hotmail.com e retornar a Account', async () => {
        const email = { email: 'guifornagiero.c@hotmail.com' };

        const output = await axios.get(`http://localhost:${configuration.port}/getAccountByEmail`, { data: email });
        expect(output.status).toBe(200);
        expect(output.data).toHaveProperty('name', 'Guilherme Fornagiero');
      });

    test('Deve buscar pelo email fernanda@gmail.com e retornar um erro', async () => {
        const email = { email: 'fernanda@gmail.com' };

        try {
            await axios.get(`http://localhost:${configuration.port}/getAccountByEmail`,{ data: email });
            fail('O teste deveria ter lançado um erro.');
        } catch (error: any) {
            expect(error.response.data.error).toBe('Account not found.');
            expect(error.response.status).toBe(400);
        }
    });
});