import { useEffect, useState } from 'react';
import axios from 'axios';

import Row from 'react-bootstrap/row';

import ScoopOption from 'pages/entry/ScoopOption';
import ToopingOption from 'pages/entry/ToopingOption';
import AlertBanner from 'pages/common/AlertBanner';

/**
 * @param {{
 *  optionType: 'scoops' | 'toppings'
 * }} props Properties
 * @returns {JSX.Element}
 */
export default function Options({ optionType }) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const onLoadComplete = ({ data }) => setItems(data);

        axios.get(`http://localhost:3030/${optionType}`).then(onLoadComplete).catch(setError);
    }, [optionType]);

    if (error) return <AlertBanner />;

    // TODO: replace `null` with ToppingOption when available
    const ItemComponent = optionType === 'scoops' ? ScoopOption : ToopingOption;

    const optionItems = items.map(item => (
        <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />
    ));

    return <Row>{optionItems}</Row>;
}
