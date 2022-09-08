// Important URL's:
// Documentation: https://pokeapi.co/

describe('Pokemon API for testing purposes', () => {
    it('Get pokemon by name', () => {
        cy.request({
            method: 'GET',
            url: Cypress.env('pokemonUrl') + '/pokemon/ditto',
        }).then(response => {
            expect(response.status).to.eq(200)
        })
    });
});