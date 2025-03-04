
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Add script for GPT Engineer
const script = document.createElement('script');
script.src = 'https://cdn.gpteng.co/gptengineer.js';
script.type = 'module';
document.head.appendChild(script);

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
