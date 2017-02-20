import React from 'react'
import { render } from 'react-dom'

import Panel from './Panel'

import '../scss/main.scss'

import Raven from 'raven-js'
import { sentryUrl } from '../data/config'

Raven.config(sentryUrl).install()

const App = React.createClass({
  render () {
    return (
      <Panel />
    )
  }
})

render(<App />, document.getElementById('app'))
