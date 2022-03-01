// @ts-nocheck
import { render, screen } from '@testing-library/react';

import Options from 'pages/entry/Options';
import { OrderDetailsProvider } from 'contexts/OrderDetails';

test('Display image for each scoop option from server', async () => {
    render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

    // Find images.
    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    // Confirm alt text of images
    const altText = scoopImages.map(element => element.alt);
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('Display image for each topping option from server', async () => {
    render(<Options optionType="toppings" />, { wrapper: OrderDetailsProvider });

    // Find images.
    const toppingImages = await screen.findAllByRole('img', { name: /topping$/i });
    expect(toppingImages).toHaveLength(3);

    // Confirm alt text of images
    const altText = toppingImages.map(element => element.alt);
    expect(altText).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping']);
});
