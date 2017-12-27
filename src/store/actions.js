import jsonp from '../api/jsonp'

export const search = ({ state, dispatch, commit }, query) => {
  return new Promise(
    (resolve, reject) => {
      const url = 'https://en.wikipedia.org/w/api.php'

      jsonp(url, { params: { action: 'query', list: 'search', format: 'json', srsearch: query }, headers: {} })
        .then(
          response => {
            resolve(response.data.query.search)
          },
          response => {
            reject(response.status)
          }
        )
    }
  )
}
