/// <reference types="cypress" />

describe('My First Test', function () {
    it('Vist Home', function () {
        cy.visit('http://localhost:8000/#/home')
    })
})