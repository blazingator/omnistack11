const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback()
    await connection.migrate.latest()
  })

  afterAll(() => {
    connection.destroy()
  })

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "APAD2",
        email: "contato@apad.org",
        whatsapp: "4700000000",
        city: "Rio do Sul",
        uf: "SC"
      })

      expect(response.body).toHaveProperty('id')
      expect(response.body.id).toHaveLength(8)
  })

  it('should return all ONGs registered on database', async () => {
    const response = await request(app)
      .get('/ongs')

      expect(response.body.length).toBeGreaterThanOrEqual(1)
  })
})
