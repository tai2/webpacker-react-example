import queryString from 'query-string';

function prepereSelectElems() {
  const doms = document.querySelectorAll('select[data-change-query]');
  const query = queryString.parse(location.search);

  for (const select of doms) {
    if (query.sort_by) {
      select.value = query.sort_by;
    }
    select.addEventListener('change', e => {
      query.sort_by = e.target.value;
      location.search = `?${queryString.stringify(query)}`;
    });
  }
}

function prepereCheckboxElems() {
  const doms = document.querySelectorAll('input[type=checkbox][data-change-query]');
  const query = queryString.parse(location.search);

  for (const checkbox of doms) {
    checkbox.checked = query.done && query.done !== 'false';
    checkbox.addEventListener('change', e => {
      query.done = e.target.checked;
      location.search = `?${queryString.stringify(query)}`;
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  prepereSelectElems();
  prepereCheckboxElems();
});
