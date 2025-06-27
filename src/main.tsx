import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { store } from './shared/services/store/store';

import { RouterProvider } from 'react-router-dom';
import { MainRoutes } from './app/routes/mainRoutes';

import './app/styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={MainRoutes} />
  </Provider>
);
