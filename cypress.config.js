const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    env: {
      bookingUrl: 'https://restful-booker.herokuapp.com',
      countriesUrl: 'https://restcountries.com/v3.1',
      pokemonUrl: 'https://pokeapi.co/api/v2',
      reqresUrl: 'https://reqres.in/api'
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
