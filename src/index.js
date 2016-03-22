const HOST = 'api.etherscan.io';

const options = {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
};

const call = function(module, action, _params) {
  let params = '';

  if (_params) {
    Object.keys(_params).map((param) => {
      const value = _params[param];

      params = `${params}&${param}=${value}`;
    });
  }

  return fetch(`http://${HOST}/api?module=${module}&action=${action}${params}`, options)
    .then((response) => {
      if (response.status !== 200) {
        throw { code: response.status, message: response.statusText }; // eslint-disable-line
      }

      return response.json();
    })
    .then((result) => {
      if (result.message === 'NOTOK') {
        throw { code: -1, message: result.result }; // eslint-disable-line
      }

      return result.result;
    });
};

module.exports = {
  account: require('./lib/account')(call),
  stats: require('./lib/stats')(call)
};
