import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

export default function SummaryForm() {
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const popover = (
        <Popover id="terms-and-conditions-popover">
            <Popover.Body>No ice cream will actually be deliveried.</Popover.Body>
        </Popover>
    );

    const chackBoxLabel = (
        <span>
            I agree to
            <OverlayTrigger trigger="hover" placement="auto" overlay={popover}>
                <span style={{ color: 'blue' }}>Terms and Conditions</span>
            </OverlayTrigger>
            .
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
