// PUT /users – Actualización completa
describe('PUT /users – Actualización completa', () => {
    let BASE
    let headers

    before(() => {
        cy.env(['REQRES_URL', 'REQRES_API_KEY']).then(({ REQRES_URL, REQRES_API_KEY }) => {
            BASE = REQRES_URL
            headers = { 'x-api-key': REQRES_API_KEY }
        })
    })

    it('TC-API-013 | PUT /users/2 → 200 + cuerpo actualizado + updatedAt', () => {
        cy.fixture('api-data').then(({ updatedUser }) => {
            cy.request({
                method: 'PUT',
                url: `${BASE}/users/2`,
                headers,
                body: updatedUser,
            }).then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body.name).to.eq(updatedUser.name)
                expect(res.body.job).to.eq(updatedUser.job)
                expect(res.body.updatedAt).to.exist
            })
        })
    })
})