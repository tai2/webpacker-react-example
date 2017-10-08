import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { TodoConditions } from '../TodoConditions'

storiesOf('TodoConditions', module).add('typical', () => (
  <TodoConditions
    sortBy="dueDate"
    sortOrder="asc"
    doneFilter={false}
    onOrderChange={action('order changed')}
    onDoneFilterChange={action('done filter changed')}
  />
))
