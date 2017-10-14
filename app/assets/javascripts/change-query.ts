import * as queryString from 'query-string'

function prepereSelectElems(): void {
  const doms = document.querySelectorAll(
    'select[data-change-query]'
  ) as NodeListOf<HTMLSelectElement>
  const query = queryString.parse(location.search)

  for (const select of doms) {
    if (query.sort_by) {
      select.value = query.sort_by
    }
    select.addEventListener('change', () => {
      query.sort_by = select.value
      location.search = `?${queryString.stringify(query)}`
    })
  }
}

function prepereCheckboxElems(): void {
  const doms = document.querySelectorAll(
    'input[type=checkbox][data-change-query]'
  ) as NodeListOf<HTMLInputElement>
  const query = queryString.parse(location.search)

  for (const checkbox of doms) {
    checkbox.checked = query.done && query.done !== 'false'
    checkbox.addEventListener('change', () => {
      query.done = checkbox.checked
      location.search = `?${queryString.stringify(query)}`
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  prepereSelectElems()
  prepereCheckboxElems()
})
