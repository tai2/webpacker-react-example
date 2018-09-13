/* tslint:disable:ordered-imports */
import register from 'ignore-styles'
register(undefined, module => {
  const styles = ['item', 'content', 'dueDate', 'error']
  module.exports = _.zipObject(styles, styles)
})
/* tslint:enable:ordered-imports */

import * as assert from 'assert'
import * as enzyme from 'enzyme'
import * as _ from 'lodash'
import 'mocha'
import * as React from 'react'
import { Request } from '../../reducers'
import TodoAddForm from '../TodoAddForm/render'
import './setup'

describe('<TodoAddForm />', () => {
  describe('display errors', () => {
    function item(request: Request) {
      return (
        <TodoAddForm
          content="todo item"
          dueDate={new Date()}
          addTodoRequest={request}
          onAddTodo={_.noop}
          onChangeContent={_.noop}
          onChangeDueDate={_.noop}
        />
      )
    }

    context('when request failed', () => {
      it('should render error message', () => {
        const request = { requesting: false, error: new Error('error') }
        const wrapper = enzyme.shallow(item(request))
        assert(wrapper.find('.error').exists())
      })
    })

    context('when request succeeded', () => {
      it('should not render error message', () => {
        const request = { requesting: false, error: null }
        const wrapper = enzyme.shallow(item(request))
        assert(!wrapper.find('.error').exists())
      })
    })
  })
})
