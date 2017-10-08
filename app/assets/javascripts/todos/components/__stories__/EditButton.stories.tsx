import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import EditButton from '../EditButton/render'

storiesOf('EditButton', module)
  .add('typical', () => <EditButton onClick={action('clicked')} />)
  .add('disabled', () => <EditButton disabled onClick={action('clicked')} />)
