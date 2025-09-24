import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '/src/App.css';
import styled from 'styled-components';

const StyledContainer = styled.div``;

const StyledOutlet = styled.div`
  background-color: var(--color-gray-900);
  padding: 2rem;
  color: var(--color-grey-200);
`;

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
      <StyledContainer>
        <StyledOutlet>
          <Outlet></Outlet>
        </StyledOutlet>
      </StyledContainer>
    </QueryClientProvider>
  );
}

export default App;
