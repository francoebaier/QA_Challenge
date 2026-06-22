/**
 * cy.reqresRequest(options)
 * Wrapper de cy.request para la API de ReqRes.
 * Inyecta automáticamente la URL base y el header x-api-key desde las env vars.
 *
 * Uso:
 *   cy.reqresRequest({ method: 'POST', url: '/users', body: { ... } })
 *   cy.reqresRequest({ method: 'GET',  url: '/users/2' })
 */
Cypress.Commands.add('reqresRequest', (options) => {
  return cy.env(['REQRES_URL', 'REQRES_API_KEY']).then(({ REQRES_URL, REQRES_API_KEY }) => {
    return cy.request({
      ...options,
      url: `${REQRES_URL}${options.url}`,
      headers: {
        'x-api-key': REQRES_API_KEY,
        ...(options.headers ?? {}),
      },
    })
  })
})
