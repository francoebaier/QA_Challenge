// DELETE /users – Eliminar usuario
describe('DELETE /users – Eliminar usuario', () => {
    let BASE
    let headers

    before(() => {
        cy.env(['REQRES_URL', 'REQRES_API_KEY']).then(({ REQRES_URL, REQRES_API_KEY }) => {
            BASE = REQRES_URL
            headers = { 'x-api-key': REQRES_API_KEY }
        })
    })

    it('TC-API-015 | DELETE /users/2 → 204 sin cuerpo de respuesta', () => {
        cy.request({
            method: 'DELETE',
            url: `${BASE}/users/2`,
            headers,
        }).then((res) => {
            expect(res.status).to.eq(204)
        })
    })
})