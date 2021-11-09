import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.render(
  <StrictMode>
    <ColorModeScript />
    <QueryClientProvider client={queryClient}>
      <App />

    </QueryClientProvider>
  </StrictMode>,
  document.getElementById('root')
);

