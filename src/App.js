import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StationList, Station } from './components/stations';
import { JourneyList } from './components/journeys';
import { Container } from '@mui/system';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Home from './components/Home';

function App() {
  return (
    <>
      <BrowserRouter>
      <ResponsiveAppBar />
      <Container maxWidth="xxl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/stations' element={<Navigate to="/" />} />
          <Route path='/stations/:id' element={<Station />} />
          <Route path='/journeys' element={<JourneyList />} />
        </Routes>
      </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
