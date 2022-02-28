import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function SummaryForm() {
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const chackBoxLabel = (
        <span>
            I agree to <span style={{ color: 'blue' }}>Terms and Conditions</span>.
        </span>
    );

    return (
        <Form>
            <Form.Group controlId="terms-and-conditions">
                <Form.Check
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={e => setAcceptedTerms(e.target.checked)}
                    label={chackBoxLabel}
                />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={!acceptedTerms}>
                Confirm order
            </Button>
        </Form>
    );
}
