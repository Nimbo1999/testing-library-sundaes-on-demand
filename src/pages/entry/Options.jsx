import { useEffect, useState } from 'react';
import axios from 'axios';

import Row from 'react-bootstrap/row';

import ScoopOption from 'pages/entry/ScoopOption';
import ToopingOption from 'pages/entry/ToopingOption';
import AlertBanner from 'pages/common/AlertBanner';

// @ts-ignore
import { pricePerItem } from 'constants/index';

import { useOrderDetails } from 'contexts/OrderDetails';

/**
 * @param {{
 *  optionType: 'scoops' | 'toppings'
 * }} props Properties
 * @returns {JSX.Element}
 */
export default function Options({ optionType }) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);

    // @ts-ignore
    const [orderDetails, updateItemCount] = useOrderDetails();

    useEffect(() => {
        const onLoadComplete = ({ data }) => setItems(data);

        axios.get(`http://localhost:3030/${optionType}`).then(onLoadComplete).catch(setError);
    }, [optionType]);

    if (error) return <AlertBanner />;

    // TODO: replace `null` with ToppingOption when available
    const ItemComponent = optionType === 'scoops' ? ScoopOption : ToopingOption;

    const [firstLetter] = optionType;
    const title = firstLetter.toUpperCase() + optionType.slice(1).toLowerCase();

    const optionItems = items.map(item => (
        <ItemComponent
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
            updateItemCount={(itemName, newItemCount) =>
                updateItemCount(itemName, newItemCount, optionType)
            }
        />
    ));

    return (
        <>
            <h2>{title}</h2>
            <p>{pricePerItem[optionType]} each</p>
            <p>
                {title} total: {orderDetails.totals[optionType]}
            </p>
            <Row>{optionItems}</Row>
        </>
    );
}
