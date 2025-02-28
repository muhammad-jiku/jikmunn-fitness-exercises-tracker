import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Footer from './_components/shared/Footer';
import Navbar from './_components/shared/Navbar';
import ExerciseDetailPage from './_pages/ExerciseDetailPage';
import HomePage from './_pages/HomePage';
import './App.css';

function App() {
  return (
    <Box width='400px' sx={{ width: { xl: '1488px' } }} m='auto'>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/exercise/:id' element={<ExerciseDetailPage />} />
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
