import { render } from '@testing-library/react';
import { OrderDetailsProvider } from 'contexts/OrderDetails';

/**
 * @param {React.ReactElement<any, string | React.JSXElementConstructor<any>>} ui React Ui
 * @param {import('@testing-library/react').RenderOptions} [options=undefined] options RenderOptions
 */
export const renderWithOrderDetailsProvider = (ui, options) =>
    render(ui, { wrapper: OrderDetailsProvider, ...options });
