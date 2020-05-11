/// <reference types="cypress" />

context('Test App Dragonlearn', () => {
    it('Visit url', () => {
        cy.visit('http://localhost/app/Dragonlearn_NumberAndCountingFrom11To20_Practice/js/');
    })

    it('Verify title of app', () => {
        cy.title().should('eq', 'APP');
    })

    it('Verify url of app', () => {
        cy.url().should('include', 'Dragonlearn_NumberAndCountingFrom11To20_Practice');
    })

    it('Go to the module 1', () => {
        cy.wait(1000)
        cy.get('canvas').click(300,300)      
        
    })

    it ('Start module 1', () => {
        cy.wait(1000)
        cy.get('canvas').dblclick(450,300)
    })

    it('Click to the speaker 1', () => {
        cy.wait(1000);
        cy.get('canvas').click(200,80)
        
    })

    it('Exit module 1', () => {
        cy.wait(3000);
        cy.get('canvas').click(140,40)
        
    })

    it('Go to the module 2', () => {
        cy.get('canvas').click(500,300);
        cy.wait(2000);
        
    })

    it ('Start module 2', () => {
        cy.wait(1000)
        cy.get('canvas').dblclick(450,300)
    })

    it('Click to the speaker 2', () => {
        cy.wait(1000);
        cy.get('canvas').click(280,80)
        
    })

    it('Exit module 2', () => {
        cy.wait(3000);
        cy.get('canvas').click(140,40);

    })

    it('Go to the module 3', () => {
        cy.wait(1000);
        cy.get('canvas').click(900,300);
    
    })

    it ('Start module 3', () => {
        cy.wait(1000)
        cy.get('canvas').dblclick(450,300)
    })

    it('Click to the speaker 3', () => {
        cy.wait(1000);
        cy.get('canvas').click(200,80)
        
    })

    it('Exit module 3', () => {
        cy.wait(3000);
        cy.get('canvas').click(140,40);

    })

})