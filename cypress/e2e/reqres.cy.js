// Important URL's:
// Documentation: https://reqres.in/

describe('Front End testing with a real API', () => {

    it('GET - List Users', function () {
        cy.request({
            method: 'GET',
            url: Cypress.env('reqresUrl') + '/users?page=2',
        }).then(response => {
            expect(response.status).to.equal(200)
            expect(response.isOkStatusCode).to.equal(true)
            expect(response.duration).to.be.lessThan(2000)
            expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')
            expect(response.headers.server).to.be.equal("cloudflare")
            expect(response.headers.vary).to.be.equal("Accept-Encoding")
            expect(response.body.total_pages).to.be.equal(2)
            expect(response.body.support.text).to.be.contain('To keep ReqRes free, contributions towards server costs are appreciated!')
            expect(response.body.support.url).to.be.equal('https://reqres.in/#support-heading')
        })
    })

    it('Get - Single User', function () {
        cy.request({
            method: 'GET',
            url: Cypress.env('reqresUrl') + '/users/2'
        }).then(response => {
            //console.log(response)
            expect(response.status).to.eq(200)
            expect(response.body.data.id).to.eq(2)
            expect(response.body.data.email).to.eq('janet.weaver@reqres.in')
            expect(response.body.data.first_name).to.eq('Janet')
        })
    })

    it('GET - Single user not Found', function () {
        cy.request({
            method: 'GET',
            url: Cypress.env('reqresUrl') + '/users/23',
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.equal(404)
            expect(response.statusText).to.equal("Not Found")
            expect(response.duration).to.be.lessThan(1000)
        })
    })

    it('POST - Create', function () {
        let numRandom = Math.random() * (100 - 1) + 1;
        let myBody = `{"name": "nombre_${numRandom}","job": "leader"}`
        cy.request({
            method: 'POST',
            url: Cypress.env('reqresUrl') + '/users',
            body: myBody
        }).then(response => {
            expect(response.status).to.equal(201)
        })
    })

    it('PUT - Update', function () {
        cy.request({
            method: 'PUT',
            url: Cypress.env('reqresUrl') + '/users/2',
            body: {
                "firstName": "Andres",
                "lastName": "Fernandez",
                "email": "yo@example.com",
                "location": {
                    "city": "SJ",
                    "country": "CR"
                },
                "employer": {
                    "jobTitle": "QA Automation",
                    "company": "Microsoft"
                }
            }
        }).then(response => {
            expect(response.status).to.eq(200)
            expect(response.body.firstName).to.eq('Andres')
            expect(response.body.lastName).to.eq('Fernandez')
            expect(response.body.email).to.eq('yo@example.com')
            expect(response.body.location.city).to.eq('SJ')
            expect(response.body.location.country).to.eq('CR')
            expect(response.body.employer.jobTitle).to.eq('QA Automation')
            expect(response.body.employer.company).to.eq('Microsoft')
        })
    })

    it('PATCH - Update', function () {
        cy.request({
            method: 'PATCH',
            url: Cypress.env('reqresUrl') + '/users/3',
            body: {
                "name": "Naza",
                "job": "Admin"
            }
        }).then(response => {
            expect(response.status).to.eq(200)
            expect(response.statusText).to.equal("OK")
            expect(response.body.name).to.eq('Naza')
            expect(response.body.job).to.eq('Admin')
            expect(response.duration).to.be.lessThan(1000)
        })
    })

});