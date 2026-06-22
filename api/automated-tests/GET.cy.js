// GET /users – Consultar usuarios
describe('GET /users – Consultar usuarios', () => {
    let BASE
    let headers

    before(() => {
        cy.env(['REQRES_URL', 'REQRES_API_KEY']).then(({ REQRES_URL, REQRES_API_KEY }) => {
            BASE = REQRES_URL
            headers = { 'x-api-key': REQRES_API_KEY }
        })
    })
    it('TC-API-009 | GET /users?page=1 → 200 + estructura de lista paginada', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/users?page=1`,
            headers,
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).to.have.property('page', 1)
            expect(res.body).to.have.property('total')
            expect(res.body.data).to.be.an('array').and.not.be.empty
            expect(res.headers['content-type']).to.include('application/json')
        })
    })

    it('TC-API-010 | GET /users/2 → 200 + datos del usuario existente', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/users/2`,
            headers,
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.data).to.have.property('id', 2)
            expect(res.body.data).to.have.property('email')
            expect(res.body.data).to.have.property('first_name')
            expect(res.body.data).to.have.property('last_name')
            expect(res.body.data).to.have.property('avatar')
        })
    })

    it('TC-API-011 | GET /users/9999 → 404 usuario inexistente', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/users/9999`,
            headers,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eq(404)
            expect(res.body).to.deep.eq({})
        })
    })

    it('TC-API-012 | GET /users/abc → 404 ID no numérico', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/users/abc`,
            headers,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eq(404)
        })
    })
})