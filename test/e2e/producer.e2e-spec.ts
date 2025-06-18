import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';

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

  it('POST /producer - add new producer', async () => {
    const bodyTest = {
      name: 'Producer e2e Test Posted',
      cpfCnpj: '58453523045',
    };
    const response = await request(app.getHttpServer())
      .post('/producer')
      .send(bodyTest)
      .expect(201);
    expect(response.body).toMatchObject({});
  });

  it('PATCH /producer/:id - update a producer by id', async () => {
    const bodyTest = {
      name: 'Producer e2e Test Updated',
    };

    const producerList = await request(app.getHttpServer())
      .get('/producer/listByCpfCnpj/58453523045')
      .expect(200);

    expect(producerList.body).toMatchObject({
      cpfCnpj: '58453523045',
    });

    const producerId = producerList.body.id;

    const response = await request(app.getHttpServer())
      .patch(`/producer/${producerId}`)
      .send(bodyTest)
      .expect(200);
    expect(response.body).toMatchObject({});
  });

  it('GET /producer/listByCpfCnpj/:cpfCnpj - list producer by cpfCnpj', async () => {
    const response = await request(app.getHttpServer())
      .get('/producer/listByCpfCnpj/58453523045')
      .expect(200);
    expect(response.body).toMatchObject({
      cpfCnpj: '58453523045',
    });
  });

  it('DELETE /producer/:id - delete a producer by id', async () => {
    const producerList = await request(app.getHttpServer())
      .get('/producer/listByCpfCnpj/58453523045')
      .expect(200);

    expect(producerList.body).toMatchObject({
      cpfCnpj: '58453523045',
    });

    const producerId = producerList.body.id;

    const response = await request(app.getHttpServer())
      .delete(`/producer/${producerId}`)
      .expect(200);
    expect(response.body).toMatchObject({});
  });

});
