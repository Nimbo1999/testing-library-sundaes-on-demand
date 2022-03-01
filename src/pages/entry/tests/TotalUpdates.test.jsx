import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithOrderDetailsProvider } from 'test-utils/testing-library-util';

import Options from 'pages/entry/Options';

describe('Tests of subtota component', () => {
    test('Should change subtotal when interaction with an option', async () => {
        renderWithOrderDetailsProvider(<Options optionType="scoops" />);

        // Making sure that the total is 0.00
        const scoopsTotal = screen.getByText('Scoops total: $', { exact: false });
        expect(scoopsTotal).toHaveTextContent('0.00');

        // update Vanilla scoop to 1 and check the subtotal
        const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '1');
        expect(scoopsTotal).toHaveTextContent('2.00');

        // update Chocolate scoop to 1 and check the subtotal
        const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
        userEvent.clear(chocolateInput);
        userEvent.type(chocolateInput, '2');
        expect(scoopsTotal).toHaveTextContent('6.00');
    });
});
