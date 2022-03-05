import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithOrderDetailsProvider } from 'test-utils/testing-library-util';

import Options from 'pages/entry/Options';
import OrderEntry from 'pages/entry/OrderEntry';

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

    test('Should change subtotal when interaction with an option', async () => {
        renderWithOrderDetailsProvider(<Options optionType="toppings" />);

        // Making sure that the total is 0.00
        // Note that `exact: false` it is used here to tell that the string could be not exact
        const toppingsTotal = screen.getByText('Toppings total: $', { exact: false });
        expect(toppingsTotal).toHaveTextContent('0.00');

        // update Cherries toppings to 1 and check the subtotal
        const vanillaInput = await screen.findByRole('checkbox', { name: 'Cherries' });
        userEvent.click(vanillaInput);
        expect(toppingsTotal).toHaveTextContent('1.50');

        // update M&Ms toppings to 1 and check the subtotal
        const mAndMsInput = await screen.findByRole('checkbox', { name: 'M&Ms' });
        userEvent.click(mAndMsInput);
        expect(toppingsTotal).toHaveTextContent('3.00');

        // update Hot fudge toppings to 1 and check the subtotal
        const hotFudge = await screen.findByRole('checkbox', { name: 'Hot fudge' });
        userEvent.click(hotFudge);
        expect(toppingsTotal).toHaveTextContent('4.50');
    });
});

describe('Grand total tests', () => {
    test('Grand total updates properly if scoop is added first', async () => {
        renderWithOrderDetailsProvider(<OrderEntry />);
        const total = screen.getByRole('heading', { name: /Grand total: \$/i });

        expect(total).not.toBeNull();
        expect(total).toHaveTextContent('$0.00');

        const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '1');

        expect(total).toHaveTextContent('$2.00');
    });

    test('Grand total updates properly if topping is added first', async () => {
        renderWithOrderDetailsProvider(<OrderEntry />);
        const total = await screen.findByRole('heading', { name: /Grand total: \$/i });

        const cherriesInput = await screen.findByRole('checkbox', { name: 'Cherries' });
        userEvent.click(cherriesInput);

        expect(total).toHaveTextContent('$1.50');
    });

    test('Grand total updates properly if item is removed', async () => {
        renderWithOrderDetailsProvider(<OrderEntry />);
        const total = await screen.findByRole('heading', { name: /Grand total: \$/i });

        const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '1');

        expect(total).toHaveTextContent('$2.00');

        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '0');

        expect(total).toHaveTextContent('$0.00');
    });
});
