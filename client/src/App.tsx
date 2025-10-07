import { Link, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '/src/App.css';
import styled from 'styled-components';
import Header from './ui/Header';

const StyledContainer = styled.div`
  padding: 2rem;
`;

const StyledOutlet = styled.div`
  background-color: var(--color-gray-900);
  color: var(--color-grey-200);
`;

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StyledContainer className="w-full">
        <Header>
          <Link to={'/'}>MTF Inventory</Link>
        </Header>

        <StyledOutlet>
          <Outlet></Outlet>
        </StyledOutlet>
      </StyledContainer>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>
  );
}

export default App;
