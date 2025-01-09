import Quiz from '../../client/src/components/Quiz';

describe('Quiz Component', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: '/api/questions/random',
    },
    { 
      // fixture: 'questions_copy.json', 
      fixture: 'questions.json', 
      statusCode: 200 
    }
    ).as('getRandomQuestions');
  });

  it('should start the quiz and display the first question', () => {
    cy.mount(<Quiz />);
    cy.contains('button', 'Start Quiz').click();
    cy.get('.card').should('be.visible');
    cy.get('h2').should('not.be.empty'); 
  });

  it('should answer a question and move to the next one', () => {
    cy.mount(<Quiz />);
    cy.contains('button', 'Start Quiz').click();
    cy.get('button').contains('1').click();
    cy.get('.card').should('be.visible');
    cy.get('h2').should('not.be.empty');
  });

  it('should complete the quiz and display the score', () => {
     cy.mount(<Quiz />);
     cy.get('button').contains('Start Quiz').click();  
            for (let i = 0; i < 5; i++) {
            cy.get('button').contains('1').click();
      }
     // Verify the score is displayed
      cy.get('.alert-success')
      .should('be.visible')
      .and('contain', 'Your score');
   });

  it('should restart the quiz after completion', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();  

    // answer all questions
    for (let i = 0; i < 5; i++) {
      cy.get('button').contains('1').click();
    }
    // restart the quiz
    cy.get('button').contains('Take New Quiz').click();

    // Verify quiz restarts
    cy.get('.card').should('be.visible');
    cy.get('h2').should('not.be.empty');
  });
});
