// @ts-nocheck
import Options from 'pages/entry/Options';

import { useOrderDetails } from 'contexts/OrderDetails';

export default function OrderEntry() {
    const [optionsCounts] = useOrderDetails();

    return (
        <div>
            <Options optionType="scoops" />
            <Options optionType="toppings" />
            <h2>Grand total: {optionsCounts?.totals?.grandTotal}</h2>
        </div>
    );
}
