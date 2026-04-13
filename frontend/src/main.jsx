import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { store } from './store';
import './index.css';

// Performance monitoring
if ('PerformanceObserver' in window) {
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.debug('LCP:', entry.renderTime || entry.loadTime);
        } else if (entry.entryType === 'first-input') {
          console.debug('FID:', entry.processingDuration);
        }
      }
    });
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
  } catch (e) {
    console.debug('Performance monitoring not supported');
  }
}

// Optimize images with loading="lazy"
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img:not([loading])');
  images.forEach((img) => {
    img.setAttribute('loading', 'lazy');
  });
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster position="top-right" toastOptions={{ className: 'glass-card !text-slate-900 dark:!text-slate-100', duration: 3000 }} />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
