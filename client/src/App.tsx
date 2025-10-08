import { Link, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '/src/App.css';
import styled from 'styled-components';
import Header from './ui/Header';
import { PaginationContextProvider } from './app/contexts/PaginationContextProvider';
import { Toaster } from 'react-hot-toast';

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
        <PaginationContextProvider>
          <StyledOutlet>
            <Outlet></Outlet>
          </StyledOutlet>
        </PaginationContextProvider>
      </StyledContainer>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          position: 'bottom-right',
          success: {
            duration: 2000,
          },

          error: {
            duration: 3000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '12px 20px',
            backgroundColor: 'var(--color-grey-800)',
            color: 'var(--color-grey-200)',
            border: '1px solid var(--color-grey-700)',
          },
        }}
      ></Toaster>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>
  );
}

export default App;
