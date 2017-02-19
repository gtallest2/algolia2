import React from 'react'
import { render } from 'react-dom'
import algoliasearch from 'algoliasearch'

import Panel from './Panel'

import '../scss/main.scss'

import Raven from 'raven-js'
import { sentry_url } from '../data/config'

Raven.config(sentry_url).install()

const App = React.createClass({
  render() {
    return (
      <div className="welcome-container">
        <Panel />
      </div>
    )
  }
})


render(<App />, document.getElementById('app'))
