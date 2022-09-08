// Important URL's:
// Site: https://restful-booker.herokuapp.com/
// Documentation: https://restful-booker.herokuapp.com/apidoc/index.html
// API: https://restful-booker.herokuapp.com/booking

const bookingData = require('../fixtures/bookingData.json')

describe('BOOKING API Testing URL', () => {
  it('Get All Booking IDs', () => {
    cy.request({
      method: 'GET',
      url: Cypress.env('bookingUrl') + '/booking/'
    }).then(response => {
      expect(response.status).to.eq(200)
      expect(response.statusText).to.equal("OK")
      expect(response.duration).to.be.lessThan(3000)
      expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')
    })
  })

  it('Create Booking', () => {
    cy.request({
      method: 'POST',
      url: Cypress.env('bookingUrl') + '/booking/',
      body: bookingData.postData
    }).then(response => {
      expect(response.status).to.equal(200)
      expect(response.statusText).to.equal("OK")
      expect(response.duration).to.be.lessThan(3000)
      expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')

      // Save the bookingid to use it in further tests
      cy.wrap(response.body.bookingid).as('bookingID')
    })
  });

  // When the wrap is not working change the "=>" for the "function()"
  it('Get Booking information by ID', function () {
    cy.request({
      method: 'GET',
      url: Cypress.env('bookingUrl') + '/booking/' + this.bookingID
    }).then(response => {
      expect(response.status).to.eq(200)
      expect(response.statusText).to.equal("OK")
      expect(response.duration).to.be.lessThan(3000)
      expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')
    })
  })

  // Problem with permissions with this last 2 tests, 403 forbidden
  it.skip('Update Booking by ID', function () {
    const newBookingData = bookingData.postData
    newBookingData.additionalneeds = "Airport Transport"
    cy.request({
      method: 'PUT',
      url: Cypress.env('bookingUrl') + '/booking/' + this.bookingID,
      body: newBookingData
    }).then(response => {
      expect(response.status).to.equal(200)
      expect(response.statusText).to.equal("OK")
      expect(response.duration).to.be.lessThan(3000)
    })
  });

  it.skip('DELETE Booking by ID', function () {
    cy.request({
      method: 'DELETE',
      url: Cypress.env('bookingUrl') + '/booking/' + this.bookingID,
    }).then(response => {
      expect(response.status).to.equal(204)
      expect(response.body).to.equal('')
      expect(response.duration).to.be.lessThan(3000)
    })
  })

})