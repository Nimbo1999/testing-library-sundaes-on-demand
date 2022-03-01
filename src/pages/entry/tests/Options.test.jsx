// @ts-nocheck
import { screen } from '@testing-library/react';

import { renderWithOrderDetailsProvider } from 'test-utils/testing-library-util';

import Options from 'pages/entry/Options';

test('Display image for each scoop option from server', async () => {
    renderWithOrderDetailsProvider(<Options optionType="scoops" />);

    // Find images.
    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    // Confirm alt text of images
    const altText = scoopImages.map(element => element.alt);
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('Display image for each topping option from server', async () => {
    renderWithOrderDetailsProvider(<Options optionType="toppings" />);

    // Find images.
    const toppingImages = await screen.findAllByRole('img', { name: /topping$/i });
    expect(toppingImages).toHaveLength(3);

    // Confirm alt text of images
    const altText = toppingImages.map(element => element.alt);
    expect(altText).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping']);
});
