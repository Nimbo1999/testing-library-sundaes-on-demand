import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '../../../mocks/server';

import OrderEntry from 'pages/entry/OrderEntry';
import { OrderDetailsProvider } from 'contexts/OrderDetails';

describe('Testing error handlers for ScoopOptions and ToopingOptions', () => {
    server.resetHandlers(
        rest.get('http://localhost:3030/scoops', (req, res, ctx) => res(ctx.status(500))),
        rest.get('http://localhost:3030/toppings', (req, res, ctx) => res(ctx.status(500)))
    );

    test('Expect to display alerts when occours an error with server api', async () => {
        render(<OrderEntry />, { wrapper: OrderDetailsProvider });

        await waitFor(async () => {
            const alerts = await screen.findAllByRole('alert');

            expect(alerts).toHaveLength(2);
        });
    });
});
