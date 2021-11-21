import { ChakraProvider, theme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Country from './pages/Country';
import Home from './pages/Home';
import HomeErrorBoundary from './pages/Home/ErrorBoundary';
import store from './store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import Bookmarks from './pages/Bookmarks';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const persistor = persistStore(store);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ChakraProvider theme={theme}>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route
                  path="/"
                  element={
                    <HomeErrorBoundary>
                      <Home />
                    </HomeErrorBoundary>
                  }
                />
                <Route
                  path="/country/:countryCode"
                  element={
                    <ErrorBoundary>
                      <Country />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/bookmarks"
                  element={
                    <ErrorBoundary>
                      <Bookmarks />
                    </ErrorBoundary>
                  }
                />
              </Routes>
            </BrowserRouter>
          </ChakraProvider>
        </PersistGate>
      </ReduxProvider>
    </QueryClientProvider>
  );
};

export default App;
