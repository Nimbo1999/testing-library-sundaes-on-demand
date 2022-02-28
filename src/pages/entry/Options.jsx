import { useEffect, useState } from 'react';
import axios from 'axios';

import Row from 'react-bootstrap/row';

import ScoopOption from 'pages/entry/ScoopOption';

/**
 * @param {{
 *  optionType: 'scoops' | 'toppings'
 * }} props Properties
 * @returns {JSX.Element}
 */
export default function Options({ optionType }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const onLoadComplete = ({ data }) => setItems(data);

        axios
            .get(`http://localhost:3030/${optionType}`)
            .then(onLoadComplete)
            .catch(() => {
                // TODO: handle response errors
            });
    }, [optionType]);

    // TODO: replace `null` with ToppingOption when available
    const ItemComponent = optionType === 'scoops' ? ScoopOption : null;

    const optionItems = items.map(item => (
        <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />
    ));

    return <Row>{optionItems}</Row>;
}
