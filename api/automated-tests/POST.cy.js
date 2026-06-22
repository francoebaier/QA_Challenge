// POST /users – Crear usuario
describe('POST /users – Crear usuario', () => {
    let BASE
    let headers

    before(() => {
        cy.env(['REQRES_URL', 'REQRES_API_KEY']).then(({ REQRES_URL, REQRES_API_KEY }) => {
            BASE = REQRES_URL
            headers = { 'x-api-key': REQRES_API_KEY }
        })
    })

    it('TC-API-001 | POST exitoso → 201, body y Content-Type válidos', () => {
        cy.fixture('api-data').then(({ newUser }) => {
            cy.request({
                method: 'POST',
                url: `${BASE}/users`,
                headers,
                body: newUser,
            }).then((res) => {
                expect(res.status).to.eq(201)
                expect(res.body.name).to.eq(newUser.name)
                expect(res.body.job).to.eq(newUser.job)
                expect(res.body.id).to.exist
                expect(res.body.id).to.not.be.empty
                expect(res.body.createdAt).to.exist
                expect(res.headers['content-type']).to.include('application/json')
            })
        })
    })

    it('TC-API-002 | POST → extraer id → GET /users/{id} (flujo encadenado)', () => {
        cy.fixture('api-data').then(({ newUser }) => {
            cy.request({
                method: 'POST',
                url: `${BASE}/users`,
                headers,
                body: newUser,
            }).then((postRes) => {
                expect(postRes.status).to.eq(201)
                const userId = postRes.body.id
                expect(userId).to.exist

                // ReqRes no persiste usuarios creados: GET con el id del POST retorna 404
                // porque el dataset mock solo incluye los IDs del 1 al 12.
                cy.request({
                    method: 'GET',
                    url: `${BASE}/users/${userId}`,
                    headers,
                    failOnStatusCode: false,
                }).then((getRes) => {
                    expect(getRes.status).to.be.oneOf([200, 404])
                })
            })
        })
    })

    it('TC-API-003 | createdAt tiene formato ISO 8601', () => {
        cy.fixture('api-data').then(({ newUser }) => {
            cy.request({
                method: 'POST',
                url: `${BASE}/users`,
                headers,
                body: newUser,
            }).then((res) => {
                const iso8601 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z$/
                expect(res.body.createdAt).to.match(iso8601)
            })
        })
    })

    it('TC-API-004 | Tiempo de respuesta inferior a 3000ms', () => {
        cy.fixture('api-data').then(({ newUser }) => {
            cy.request({
                method: 'POST',
                url: `${BASE}/users`,
                headers,
                body: newUser,
            }).then((res) => {
                expect(res.duration).to.be.lessThan(3000)
            })
        })
    })

    it('TC-API-005 | POST sin campo "name" → 201 (mock acepta body parcial)', () => {
        cy.request({
            method: 'POST',
            url: `${BASE}/users`,
            headers,
            body: { job: 'Automation Engineer' },
        }).then((res) => {
            // ReqRes no valida campos requeridos — comportamiento documentado
            expect(res.status).to.eq(201)
            expect(res.body.id).to.exist
        })
    })

    it('TC-API-006 | POST sin campo "job" → 201 (mock acepta body parcial)', () => {
        cy.request({
            method: 'POST',
            url: `${BASE}/users`,
            headers,
            body: { name: 'Test User' },
        }).then((res) => {
            expect(res.status).to.eq(201)
            expect(res.body.id).to.exist
        })
    })

    it('TC-API-007 | POST con body vacío → 201 (mock no valida presencia de campos)', () => {
        cy.request({
            method: 'POST',
            url: `${BASE}/users`,
            headers,
            body: {},
        }).then((res) => {
            expect(res.status).to.eq(201)
            expect(res.body.createdAt).to.exist
        })
    })

    it('TC-API-008 | POST con tipos incorrectos → 201 (mock no valida tipos de datos)', () => {
        cy.request({
            method: 'POST',
            url: `${BASE}/users`,
            headers,
            body: { name: 99999, job: true },
        }).then((res) => {
            expect(res.status).to.eq(201)
        })
    })
})
