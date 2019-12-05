describe('Form', () => {
    beforeEach(() => {
        cy.visit('/')
        .wait(3000)
    })
  
    it('add item and delte item', () => {
        const input = "2 kilos de manzana"
        cy.get('[data-cy=openModal]')
        .click()
        .focused().should('have.class', 'input')
        .get('[data-cy=input]')
        .type(input)
        .should('have.value', input)
        .get('[data-cy=addItem]').click()
        .wait(1500)
        .get('li')
        .should('have.length', 1)
        .first()
        .find('button')
        .click()
        .wait(1500)
        .get('[data-cy=empty]').should('have.text', 'The list is empty')
    })
})