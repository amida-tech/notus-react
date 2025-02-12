import { createRoot } from 'react-dom/client';
import App from './App';
import './assets/styles/App.scss';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
