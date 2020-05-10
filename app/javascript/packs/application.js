import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import rootReducer from '../react/reducers'
import { Provider } from 'react-redux'

import App from '../react/App'
import RedBox from 'redbox-react'

document.addEventListener('DOMContentLoaded', () => {
  let reactElement = document.getElementById('app')

  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  const appWithProvider = <Provider store={store}><App /></Provider>
  if (reactElement) {
    if(window.railsEnv && window.railsEnv === 'development'){
      try {
        render(appWithProvider, reactElement)
      } catch (e) {
        render(<RedBox error={e} />, reactElement)
      }
    }
    else {
      render(appWithProvider, reactElement)
    }
  }
})
