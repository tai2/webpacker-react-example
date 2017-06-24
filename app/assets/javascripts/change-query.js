import queryString from 'query-string';

document.addEventListener('DOMContentLoaded', () => {
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
});
