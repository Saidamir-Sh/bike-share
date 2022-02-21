import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MapComponent from './components/MapComponent'
import { configureStore, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter,  Routes, Route } from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';


const App = () => {
  return (
    <Provider store={configureStore}>
      <PersistGate persistor={persistor} loading={null}>
        <Container fluid={true} className='px-0 overflow-hidden'>
          <BrowserRouter>
           <Row>
             <Col md={12}>
               <Routes>
                 <Route exact path='/' element={<MapComponent />} />
               </Routes>
             </Col>
           </Row>
          </BrowserRouter>
        </Container>
      </PersistGate>
    </Provider>
  );
}

export default App;
