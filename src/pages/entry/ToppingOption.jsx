import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function ToopingOption({ name, imagePath, updateItemCount }) {
    const handleChange = ({ target }) => updateItemCount(name, target.checked ? 1 : 0);

    return (
        <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
            <img
                style={{ width: '75%' }}
                src={`http://localhost:3030/${imagePath}`}
                alt={`${name} topping`}
            />

            <Form.Group controlId={`${name}-toppings-checkbox`}>
                <Form.Check type="checkbox" onChange={handleChange} label={name} />
            </Form.Group>
        </Col>
    );
}
