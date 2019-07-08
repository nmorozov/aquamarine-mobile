export const METHOD_GET = 'GET';
export const METHOD_POST = 'POST';
export const METHOD_PUT = 'PUT';
export const METHOD_DELETE = 'DELETE';

const REQUEST_TIMEOUT = 60000;

/**
 * Basic networking function
 */
class Network {
  constructor() {
    this.response = {
      code: '',
      error: '',
      data: '',
    };
  }

  get(url, data, headers) {
    return this.doRequest(url, METHOD_GET, data, headers);
  }

  post(url, data, headers) {
    return this.doRequest(url, METHOD_POST, data, headers);
  }

  put(url, data, headers) {
    return this.doRequest(url, METHOD_PUT, data, headers);
  }

  delete(url, data, headers) {
    return this.doRequest(url, METHOD_DELETE, data, headers);
  }

  doRequest(url, method, data, headers) {
    const pattern = /\?/g;
    let params = {
      timeout: REQUEST_TIMEOUT,
    };
    let newUrl = url;

    if (method === METHOD_GET) {
      if (pattern.test(url)) {
        newUrl += `&${this.formapRequestBody(data)}`;
      } else {
        newUrl += `?${this.formapRequestBody(data)}`;
      }

      params = {
        ...params,
        method,
        headers,
      };
    } else {
      params = {
        ...params,
        method,
        headers,
        body: this.formapRequestBody(data),
      };
    }

    return new Promise((resolve, reject) => {
      fetch(newUrl, params).then(resolve, reject);
    });
  }

  formapRequestBody(data) {
    let query = '';
    const body = this.formatRequestAsUrl(data);

    for (let i = 0; i < body.length; i++) {
      if (i > 0) {
        query += '&';
      }

      query += body[i];
    }

    return query;
  }

  formatRequestAsUrl(data, wrap = false) {
    const body = [];

    if (typeof data !== 'undefined') {
      Object.keys(data).forEach((key) => {
        if (typeof data[key] === 'object') {
          const tmp = this.formatRequestAsUrl(data[key], true);

          if (wrap) {
            for (let j = 0; j < tmp.length; j += 1) {
              body.push(`[${key}]${tmp[j]}`);
            }
          } else {
            for (let j = 0; j < tmp.length; j += 1) {
              body.push(`${key}${tmp[j]}`);
            }
          }
        } else if (wrap) {
          body.push(`[${key}]=${data[key]}`);
        } else {
          body.push(`${key}=${data[key]}`);
        }
      });
    }

    return body;
  }

  static get METHOD_GET() {
    return METHOD_GET;
  }

  static get METHOD_POST() {
    return METHOD_POST;
  }

  static get METHOD_PUT() {
    return METHOD_PUT;
  }

  static get METHOD_DELETE() {
    return METHOD_DELETE;
  }
}

export default Network;
