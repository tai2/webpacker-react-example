import * as _ from 'lodash'

type DictToDict = (obj: _.Dictionary<any>) => _.Dictionary<any>

export function snakeCaseKeys(obj: object): object {
  const tr: DictToDict = (o) => _.transform(o, (result, value, key) => {
    result[_.snakeCase(key)] = (_.isPlainObject(value) ? tr(value) : value)
  })
  return tr(obj)
}

export function camelCaseKeys(obj: object): object {
  const tr: DictToDict = (o) => _.transform(o, (result, value, key) => {
    result[_.camelCase(key)] = _.isPlainObject(value) ? tr(value) : value
  })
  return tr(obj)
}
