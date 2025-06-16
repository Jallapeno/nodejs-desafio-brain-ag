import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { cpf } from 'cpf-cnpj-validator';

describe('ProducerController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /producer - cria um produtor', async () => {
    const bodyTest = {
      name: 'Producer Hytalo Test',
      cpfCnpj: cpf.generate(),
    };
    const response = await request(app.getHttpServer())
      .post('/producer')
      .send(bodyTest)
      .expect(201);
    expect(response.body).toMatchObject({});
  });

  it('PATCH /producer/:id - atualiza um produtor', async () => {
    const bodyTest = {
      name: 'Producer Hytalo Test Updated',
    };
    const response = await request(app.getHttpServer())
      .patch('/producer/16')
      .send(bodyTest)
      .expect(200);
    expect(response.body).toMatchObject({});
  });

});
