// Important URL's:
// Documentation: https://restcountries.com/#rest-countries-users

describe('Countries API', () => {

    it('Get all countries', () => {
        cy.request({
            method: 'GET',
            url: Cypress.env('countriesUrl') + '/all/',
        }).then(response => {
            expect(response.status).to.equal(200)
            expect(response.statusText).to.equal("OK")
            expect(response.duration).to.be.lessThan(3000)
        })
    });

    it('Get countrie by name', () => {
        cy.request({
            method: 'GET',
            url: Cypress.env('countriesUrl') + '/name/costa rica',
        }).then(response => {
            cy.log(response)
            expect(response.status).to.equal(200)
            expect(response.statusText).to.equal("OK")
            expect(response.duration).to.be.lessThan(3000)
        })
    });


});