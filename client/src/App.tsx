import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Navbar from './_components/shared/Navbar';
import AuthPage from './_pages/AuthPage';
import DashboardPage from './_pages/DashboardPage';
import WorkoutsPage from './_pages/WorkoutsPage';
import { RootState } from './_state/store';
import { lightTheme } from './utils/theme';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;

function App() {
  const { currentUser } = useSelector((state: RootState) => state.user);
  console.log('first user', currentUser);

  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        {currentUser ? (
          <Container>
            <Navbar currentUser={currentUser} />
            <Routes>
              <Route path='/' element={<DashboardPage />} />
              <Route path='/workouts' element={<WorkoutsPage />} />
            </Routes>
          </Container>
        ) : (
          <Container>
            <AuthPage />
          </Container>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
