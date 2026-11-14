
describe('Portfolio visitor workflow', () => {
    it('navigates from Home to Projects and displays portfolio projects', () => {
        // Open the portfolio.
        cy.visit('http://localhost:5173/')

        // Verify the Home page loaded.
        cy.get('body').should('be.visible')

        // Navigate using the Projects link.
        cy.contains('a', 'Projects').click()

        // Confirm navigation succeeded.
        cy.get('h2').should('contain', 'Projects')

        // Verify projects retrieved from the backend are displayed.
        cy.get('.project-card', { timeout: 10000 })
            .should('have.length.at.least', 3)

        // Check the expected project titles.
        cy.contains('h3', 'Factory Through The Ages')
            .should('be.visible')

        cy.contains('h3', 'Gardens of Music')
            .should('be.visible')

        cy.contains('h3', 'HM4: Climb the Tower')
            .should('be.visible')

        // Keep the completed Projects page visible in the recording.
        cy.wait(5000)
    })
})
