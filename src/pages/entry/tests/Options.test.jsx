// @ts-nocheck
import { render, screen } from '@testing-library/react';
import Options from 'pages/entry/Options';

test('Display image for each scoop option from server', async () => {
    render(<Options optionType="scoops" />);

    // Find images.
    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    // Confirm alt text of images
    const altText = scoopImages.map(element => element.alt);
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});
