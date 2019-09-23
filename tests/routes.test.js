const request = require('supertest')
const app = require('../app.js')
describe('Items API', () => {
    it('should show all items', async () => {
        const res = await request(app).get('/api/items')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('items')
    }),
    it('should show an item', async () => {
        const res = await request(app).get('/api/items/3')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('item')
    }),
    it('should create a new item', async () => {
        const res = await request(app)
            .post('/api/items')
            .send({
                title: 'Test Item',
                link: 'http://www.testing.com',
                userId: '1'
            })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('item')
    }),
    it('should update an item', async () => {
        const res = await request(app)
            .put('/api/items/1')
            .send({
                title: 'Update Test Item',
                link: 'http://www.testing.com',
                userId: '1'
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('item')
    }),
    it('should delete an item', async () => {
        const res = await request(app)
            .del('/api/items/1')
            .send({
                title: 'Update Test Item',
                link: 'http://www.testing.com',
                userId: '1'
            })
        expect(res.statusCode).toEqual(200)
        expect(res.text).toEqual("Item deleted")
    })
})