import { createContext, useContext, useState, useMemo, useEffect } from 'react';
// @ts-ignore
import { pricePerItem } from 'constants/index';
import Utils from 'utils/index';

const OrderDetails = createContext({});

function calculateSubTotal(orderType, optionCounts) {
    let optionCount = 0;
    for (const count of optionCounts[orderType].values()) {
        optionCount += count;
    }
    return optionCount * pricePerItem[orderType];
}

export function OrderDetailsProvider(props) {
    const [optionsCounts, setOptionsCounts] = useState({
        scoops: new Map(),
        toppings: new Map()
    });

    const zeroCurrency = Utils.formatCurrency(0);

    const [totals, setTotals] = useState({
        scoops: zeroCurrency,
        toppings: zeroCurrency,
        grandTotal: zeroCurrency
    });

    useEffect(() => {
        const scoopsSubTotal = calculateSubTotal('scoops', optionsCounts);
        const toppingsSubTotal = calculateSubTotal('toppings', optionsCounts);
        const grandTotal = scoopsSubTotal + toppingsSubTotal;
        setTotals({
            scoops: Utils.formatCurrency(scoopsSubTotal),
            toppings: Utils.formatCurrency(toppingsSubTotal),
            grandTotal: Utils.formatCurrency(grandTotal)
        });
    }, [optionsCounts]);

    const value = useMemo(() => {
        function updateItemCount(itemName, newItemCount, optionType) {
            const newOptionCounts = { ...optionsCounts };

            const optionCountsMap = optionsCounts[optionType];
            optionCountsMap.set(itemName, parseInt(newItemCount));

            setOptionsCounts(newOptionCounts);
        }

        return [{ ...optionsCounts, totals }, updateItemCount];
    }, [optionsCounts, totals]);

    return <OrderDetails.Provider value={value} {...props} />;
}

export const useOrderDetails = () => {
    const context = useContext(OrderDetails);
    if (!context) throw new Error('you must use this context inside a OrderDetailsProvider');
    return context;
};
