import app from '../src/app'
import request from "supertest";
import { createConnection, Connection } from "typeorm";

let connection: Connection;
beforeAll(async () => {
  connection = await createConnection();
});

afterAll(async () => {
  await connection.close();
});

describe('Test API points', () => {
  it('create a url object', async () => {
    const result = await request(app).post('/api/short').send({
      url: "http://mywebsite.com"
    });
    expect(result.body).toHaveProperty("longUrl", "http://mywebsite.com/")
    expect(result.body).toHaveProperty("shortUrl")
    expect(result.status).toBe(200);
  })

  it('create a url object and redirect', async () => {
    const result = await request(app).post('/api/short').send({
      url: "http://mywebsite.com"
    });
    const redirect = await request(app).get('/' + result.body.shortUrl)
    expect(redirect.header.location).toMatch('http://mywebsite.com')
  })

  it('Should return bad URL', async () => {
    const result = await request(app).post('/api/short').send({
      url: "mywebsite.com"
    });
    expect(result.status).toBe(400);
  })

  it('Should return bad URL # 2', async () => {
    const result = await request(app).post('/api/short').send({
      url: "mywebsite"
    });
    expect(result.status).toBe(400);
  })

  it('Should return bad URL # 3', async () => {
    const result = await request(app).post('/api/short').send({
      url: "htttp://mywebsite.co.il"
    });
    expect(result.status).toBe(400);
  })

  it('Should return bad URL since bad redirect', async () => {
    const result = await request(app).get('/' + 123123123);
    expect(result.status).toBe(400);
  })

  it('Get home page', async () => {
    const result = await request(app).get('/');
    expect(result.status).toBe(200);
  })
})