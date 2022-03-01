import { screen, waitFor } from '@testing-library/react';
import { renderWithOrderDetailsProvider } from 'test-utils/testing-library-util';
import { rest } from 'msw';
import { server } from '../../../mocks/server';

import OrderEntry from 'pages/entry/OrderEntry';

describe('Testing error handlers for ScoopOptions and ToopingOptions', () => {
    server.resetHandlers(
        rest.get('http://localhost:3030/scoops', (req, res, ctx) => res(ctx.status(500))),
        rest.get('http://localhost:3030/toppings', (req, res, ctx) => res(ctx.status(500)))
    );

    test('Expect to display alerts when occours an error with server api', async () => {
        renderWithOrderDetailsProvider(<OrderEntry />);

        await waitFor(async () => {
            const alerts = await screen.findAllByRole('alert');

            expect(alerts).toHaveLength(2);
        });
    });
});
