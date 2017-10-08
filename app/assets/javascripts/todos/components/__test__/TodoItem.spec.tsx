/* tslint:disable:ordered-imports */
import register from 'ignore-styles'
register(undefined, module => {
  const styles = [
    'contentLabel',
    'editButton',
    'contentCol',
    'dueDateCol',
    'error',
  ]
  module.exports = _.zipObject(styles, styles)
})
/* tslint:enable:ordered-imports */

import * as assert from 'assert'
import * as enzyme from 'enzyme'
import * as _ from 'lodash'
import 'mocha'
import * as React from 'react'
import { Request } from '../../reducers'
import TodoItem from '../TodoItem/render'
import './setup'

describe('<TodoItem />', () => {
  describe('display errors', () => {
    function item(updateRequest: Request, deleteRequest: Request) {
      const todo = {
        id: 1,
        content: 'todo',
        done: false,
        dueDate: '2017-09-30T07:32:08.591Z',
        createdAt: '2017-09-30T07:32:08.591Z',
        updatedAt: '2017-09-30T07:32:08.591Z',
      }
      return (
        <TodoItem
          id={1}
          todo={todo}
          updateRequest={updateRequest}
          deleteRequest={deleteRequest}
          onCheckboxChange={_.noop}
          onContentBlur={_.noop}
          onDueDateBlur={_.noop}
          onDestroyClick={_.noop}
        />
      )
    }

    context('when update request failed', () => {
      it('should render error message', () => {
        const updateRequest = { requesting: false, error: new Error('error') }
        const deleteRequest = { requesting: false, error: null }
        const wrapper = enzyme.shallow(item(updateRequest, deleteRequest))
        assert.equal(wrapper.find('.error').text(), 'Update todo failed')
      })
    })

    context('when delete request failed', () => {
      it('should render error message', () => {
        const updateRequest = { requesting: false, error: null }
        const deleteRequest = { requesting: false, error: new Error('error') }
        const wrapper = enzyme.shallow(item(updateRequest, deleteRequest))
        assert.equal(wrapper.find('.error').text(), 'Delete todo failed')
      })
    })

    context('when all requests succeeded', () => {
      it('should not render error message', () => {
        const updateRequest = { requesting: false, error: null }
        const deleteRequest = { requesting: false, error: null }
        const wrapper = enzyme.shallow(item(updateRequest, deleteRequest))
        assert(!wrapper.find('.error').exists())
      })
    })
  })
})
