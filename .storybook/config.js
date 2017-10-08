import { configure } from '@storybook/react'
import 'stylesheets/application.scss'

const req = require.context('javascripts', true, /\.stories\.tsx$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module)
