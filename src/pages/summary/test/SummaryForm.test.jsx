import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

        userEvent.click(checkbox);
        expect(confirmButton).toBeEnabled();
        expect(checkbox).toBeChecked();

        userEvent.click(checkbox);
        expect(confirmButton).toBeDisabled();
        expect(checkbox).not.toBeChecked();
    });
});

describe('Should test the popover behaviour inside SummaryForm', () => {
    test('Popover should start hidden', () => {
        render(<SummaryForm />);
        const popover = screen.queryByText(/no ice cream will actually be deliveried./i);
        expect(popover).not.toBeInTheDocument();
    });

    test('Popover should appears when user mouseover to target element', () => {
        render(<SummaryForm />);
        const testAndConditions = screen.getByText(/Terms and Conditions/i);
        userEvent.hover(testAndConditions);

        const popover = screen.queryByText(/no ice cream will actually be deliveried./i);
        expect(popover).toBeInTheDocument();
    });

    test('Popover should disappear when user mouseout of target element', async () => {
        render(<SummaryForm />);
        const testAndConditions = screen.getByText(/Terms and Conditions/i);
        userEvent.hover(testAndConditions);

        const popover = screen.queryByText(/no ice cream will actually be deliveried./i);
        expect(popover).toBeInTheDocument();

        userEvent.unhover(testAndConditions);
        await waitForElementToBeRemoved(() =>
            screen.queryByText(/no ice cream will actually be deliveried./i)
        );
    });
});
