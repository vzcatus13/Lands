import { ColorModeScript } from '@chakra-ui/react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import PureErrorBoundary from './components/PureErrorBoundary';

ReactDOM.render(
  <StrictMode>
    <PureErrorBoundary>
      <ColorModeScript />
      <App />
    </PureErrorBoundary>
  </StrictMode>,
  document.getElementById('root')
);
