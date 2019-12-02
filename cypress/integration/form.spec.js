describe('Form', () => {
    beforeEach(() => {
        cy.visit('/')
    })
  
    it('add item and delte item', () => {
        const input = "2 kilos de manzana"
        cy.get('.btn_open-modal').click()
        .focused().should('have.class', 'input')
        .get('.input')
        .type(input)
        .should('have.value', input)
        .get('.btn-add').click()
        .get('li')
        .first()
        .find('button')
        .click()
        .get('.empty')
        .should('have.text', 'La lista esta vacia')
    })
})