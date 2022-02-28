import { render, screen, fireEvent } from '@testing-library/react';
import SummaryForm from 'pages/summary/SummaryForm';

describe('Should test behaviour of SummaryForm component', () => {
    test('Should match the initial conditions of form', () => {
        render(<SummaryForm />);
        const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
        expect(checkbox).not.toBeChecked();

        const confirmButton = screen.getByRole('button', { name: /confirm order/i });
        expect(confirmButton).toBeDisabled();
    });

    test('Should enable the button when pressing the checkbox', () => {
        render(<SummaryForm />);
        const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
        const confirmButton = screen.getByRole('button', { name: /confirm order/i });

        expect(confirmButton).toBeDisabled();

        fireEvent.click(checkbox);
        expect(confirmButton).toBeEnabled();
        expect(checkbox).toBeChecked();

        fireEvent.click(checkbox);
        expect(confirmButton).toBeDisabled();
        expect(checkbox).not.toBeChecked();
    });
});
