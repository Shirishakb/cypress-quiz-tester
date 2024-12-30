describe('Tech Quiz E2E Test', () => {
    it('should start and complete the quiz', () => {
      cy.visit('/');
      
      // Start the quiz
      cy.contains('Start Quiz').click();
      cy.contains('Question').should('be.visible');
  
      // Answer all questions
      for (let i = 0; i < 10; i++) {
        cy.get('button').contains('Next').click();
      }
  
      // Verify score and restart option
      cy.contains('Your Score').should('be.visible');
      cy.contains('Start Over').should('be.visible').click();
  
      // Verify restart
      cy.contains('Start Quiz').should('be.visible');
    });
  });
  