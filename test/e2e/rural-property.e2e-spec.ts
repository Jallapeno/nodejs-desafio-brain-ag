import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('RuralPropertyController (e2e)', () => {
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

  it('POST /rural-property - create a rural property', async () => {
    const bodyTest = {
      name: 'Test e2e Property',
      city: 'Test e2e City',
      state: 'Test e2e State',
      totalArea: 100,
      arableArea: 80,
      vegetationArea: 20,
      producer: 1
    };
    const response = await request(app.getHttpServer())
      .post('/rural-property')
      .send(bodyTest)
      .expect(201);
    expect(response.body).toMatchObject({});
  });

})
