import Container from 'react-bootstrap/Container';

import { OrderDetailsProvider } from 'contexts/OrderDetails';
import OrderEntry from 'pages/entry/OrderEntry';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
    return (
        <Container>
            <OrderDetailsProvider>
                <OrderEntry />
            </OrderDetailsProvider>
        </Container>
    );
}
