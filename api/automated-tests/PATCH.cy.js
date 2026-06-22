// PATCH /users – Actualización parcial
describe('PATCH /users – Actualización parcial', () => {
    let BASE
    let headers

    before(() => {
        cy.env(['REQRES_URL', 'REQRES_API_KEY']).then(({ REQRES_URL, REQRES_API_KEY }) => {
            BASE = REQRES_URL
            headers = { 'x-api-key': REQRES_API_KEY }
        })
    })
    it('TC-API-014 | PATCH /users/2 → 200 + campo parcial actualizado', () => {
        cy.fixture('api-data').then(({ patchUser }) => {
            cy.request({
                method: 'PATCH',
                url: `${BASE}/users/2`,
                headers,
                body: patchUser,
            }).then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body.job).to.eq(patchUser.job)
                expect(res.body.updatedAt).to.exist
            })
        })
    })
})