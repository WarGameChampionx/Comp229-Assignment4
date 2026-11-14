
describe('Portfolio visitor workflow', () => {
    it('navigates from Home to Projects and displays portfolio projects', () => {

        // Monitor the real backend API request.
        cy.intercept('GET', '**/api/projects').as('getProjects')

        // Open the portfolio.
        cy.visit('http://localhost:5173/')

        // Verify the Home page loaded.
        cy.get('body').should('be.visible')

        // Navigate using the Projects link.
        cy.contains('a', 'Projects').click()

        // Allow time for the cloud backend to respond.
        cy.wait('@getProjects', {
            requestTimeout: 120000,
            responseTimeout: 120000
        }).its('response.statusCode').should('eq', 200)

        // Confirm navigation succeeded.
        cy.get('h2').should('contain', 'Projects')

        // Verify the projects are displayed.
        cy.get('.project-card', { timeout: 20000 })
            .should('have.length.at.least', 3)

        cy.contains('h3', 'Factory Through The Ages')
            .should('be.visible')

        cy.contains('h3', 'Gardens of Music')
            .should('be.visible')

        cy.contains('h3', 'HM4: Climb the Tower')
            .should('be.visible')

        // Keep the finished page visible in the recording.
        cy.wait(5000)
    })
})
