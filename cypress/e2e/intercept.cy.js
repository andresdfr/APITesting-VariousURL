describe('Intercept Examples with testing URL', () => {

    it('Change the response of the list', function () {
        cy.visit('https://www.rahulshettyacademy.com/angularAppdemo')
        cy.intercept({
            method: 'GET',
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
        },
            {
                statusCode: 200,
                body: [
                    { "book_name": "La Divina Comedia", "isbn": "AFR", "aisle": "2222" }
                ]
            }).as('bookingResponse')
        cy.get('button.btn.btn-primary').click()
        cy.wait('@bookingResponse').should(({ request, response }) => {
            cy.get('tbody tr').should('have.length', response.body.length)
        })
    })

    it('Intercept request to get a 404', function () {
        cy.visit('https://www.rahulshettyacademy.com/angularAppdemo')

        cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty', (req) => {
            req.url = 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotraaa'
            req.continue((resp) => {
                //expect(resp.body.length).to.be.equal(0)
                expect(resp.statusCode).to.be.eq(404)
            })
        }).as('dummyRequest')
        cy.get('button.btn.btn-primary').click()
        cy.wait('@dummyRequest')
    })

    it('Normal request to get all the books without intercept', function () {
        cy.request('GET',
            'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty').then(response => {
                expect(response.isOkStatusCode).to.be.true
                expect(response.status).to.equal(200)
                expect(response.statusText).to.eq('OK')
                expect(response).to.have.property('headers')
                expect(response.duration).to.be.lt(2000)
            })
    })

})
