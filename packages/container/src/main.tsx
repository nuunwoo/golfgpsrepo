import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '@pkg/reducer';
import Router from './router';
import { RouterProps } from '../../types/src/page';

const store = createStore(rootReducer);

const main = ({ loop, club_name, url, ws }: RouterProps) => (
  <Provider store={store}>
    <BrowserRouter>
      <Router
        loop={loop}
        club_name={club_name}
        url={url}
        ws={ws}
      />
    </BrowserRouter>
  </Provider>
);

export default main;
