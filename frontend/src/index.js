import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import App from './App';
import reportWebVitals from './reportWebVitals';
<<<<<<< Updated upstream
import store from "./redux/store";
=======
>>>>>>> Stashed changes

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <React.StrictMode>
<<<<<<< Updated upstream
      <App />
    </React.StrictMode>
  </Provider>,
);
reportWebVitals();
=======
      {/* <Router> */}
      <App />
      {/* </Router> */}
    </React.StrictMode>
  </Provider>,
);
reportWebVitals();
>>>>>>> Stashed changes
