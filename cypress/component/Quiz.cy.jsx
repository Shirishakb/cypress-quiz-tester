import React from 'react';
import { mount } from 'cypress/react';
import Quiz from '../../client/src/components/Quiz'; 

describe('Quiz Component', () => {
    it('renders the Quiz component', () => {
        mount(<Quiz />);
        cy.get('[data-cy=quiz-container]').should('exist');
    });

    it('displays the correct question', () => {
        const question = 'What is the capital of France?';
        mount(<Quiz question={question} />);
        cy.get('[data-cy=question]').should('contain', question);
    });

    it('handles answer selection', () => {
        const answers = ['Paris', 'London', 'Berlin', 'Madrid'];
        mount(<Quiz answers={answers} />);
        cy.get('[data-cy=answer]').should('have.length', answers.length);
        cy.get('[data-cy=answer]').first().click();
        cy.get('[data-cy=answer]').first().should('have.class', 'selected');
    });
});