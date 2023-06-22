import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query"
import { SocketProvider } from './context/SocketProvider';


//🥕React query instance
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
// RENDER APP
root.render(
    <React.StrictMode>
        <QueryClientProvider client = {queryClient}>
            <BrowserRouter>
                <SocketProvider>
                    <App />
                </SocketProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
);

