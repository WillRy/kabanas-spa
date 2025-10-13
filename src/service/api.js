// ...existing code...
class HttpError extends Error {
  constructor({ response, body }) {
    super(`HTTP Error: ${response.status} ${response.statusText}`);
    this.name = "HttpError";
    this.response = response;
    this.body = body;
  }
}

class Http {
  options = {};
  requestInterceptors = [];
  responseInterceptors = [];
  isRefreshing = false;
  failedQueue = [];
  onRefreshToken = null;

  constructor(options = {}) {
    this.options = options;
    this.onRefreshToken = options.onRefreshToken;
    this.requestInterceptors = [];
    this.responseInterceptors = [];
  }

  processQueue(error, token = null) {
    this.failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    this.failedQueue = [];
  }

  addRequestInterceptor(interceptor) {
    this.requestInterceptors.push(interceptor);
  }

  addResponseInterceptor(interceptor) {
    this.responseInterceptors.push(interceptor);
  }

  removeResponseInterceptor(interceptor) {
    this.responseInterceptors = this.responseInterceptors.filter(
      (i) => i !== interceptor
    );
  }

  async applyRequestInterceptors(config) {
    // config: { method, url, headers, body, ...otherOptions }
    let current = { ...config };
    for (const interceptor of this.requestInterceptors) {
      const result = await interceptor(current);
      if (result === undefined) continue;

      // Interceptor should return the modified config
      if (result && typeof result === "object") {
        current = { ...current, ...result };
      }
    }
    return current;
  }

  async applyResponseInterceptors(ctx) {
    // ctx: { response, data, headers }
    let current = { ...ctx };
    for (const interceptor of this.responseInterceptors) {
      const result = await interceptor(current);
      if (result === undefined) continue;

      // If interceptor returned an object with keys, treat as partial/full context update
      if (
        result &&
        typeof result === "object" &&
        ("data" in result || "response" in result || "headers" in result)
      ) {
        current = {
          response: result.response || current.response,
          data: result.data !== undefined ? result.data : current.data,
          headers: result.headers || current.headers,
        };
      } else {
        // Otherwise treat result as new data
        current.data = result;
      }
    }
    return current;
  }

  async extractResponseData(response) {
    const contentType = response.headers.get("content-type") || "";
    let responseData;
    if (contentType.includes("application/json")) {
      responseData = await response.json();
    } else if (contentType.includes("text/")) {
      responseData = await response.text();
    } else {
      // For other types, you might want to handle them or just return the response
      responseData = await response.blob();
    }

    return responseData;
  }

  async _request(method, url, data = null, options = {}) {
    debugger;
    const headers = {
      ...(this.options.headers || {}),
      ...(options.headers || {}),
    }

    const optionsWithoutHeaders = {...this.options, ...options };
    delete optionsWithoutHeaders.headers;

    let requestOptions = {
      ...optionsWithoutHeaders,
      headers: {
        ...headers,
      },
      method,
    };

    if (data) {
      requestOptions.headers["Content-Type"] = headers['Content-Type'] ?? "application/json";

      if( requestOptions.headers['Content-Type'] === 'multipart/form-data') {
        delete requestOptions.headers['Content-Type'];
      }

      requestOptions.body = requestOptions.headers['Content-Type'] === 'application/json' ? JSON.stringify(data) : data;
    }

    // Apply request interceptors
    const interceptedConfig = await this.applyRequestInterceptors({
      method,
      url,
      headers: requestOptions.headers,
      body: requestOptions.body,
      ...requestOptions,
    });

    // Update requestOptions with intercepted values
    requestOptions = {
      ...requestOptions,
      ...interceptedConfig,
      method: interceptedConfig.method || method,
      headers: interceptedConfig.headers || requestOptions.headers,
    };

    if (interceptedConfig.body !== undefined) {
      requestOptions.body = interceptedConfig.body;
    }

    try {
      const fullUrl = this.options.baseURL
        ? this.options.baseURL + (interceptedConfig.url || url)
        : interceptedConfig.url || url;

      const response = await fetch(fullUrl, requestOptions);

      const headers = {};
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });

      const responseData = await this.extractResponseData(response);

      const intercepted = await this.applyResponseInterceptors({
        response,
        data: responseData,
        headers,
      });

      const finalResponse = intercepted.response;
      const finalData = intercepted.data;

      if (!finalResponse.ok) {
        throw new HttpError({
          response: finalResponse,
          body: finalData,
        });
      }

      return finalData;
    } catch (error) {
      console.info("HTTP Request Error:", error);
      throw error;
    }
  }

  async get(url) {
    return this._request("GET", url);
  }

  async post(url, data, options = {}) {
    return this._request("POST", url, data, options);
  }

  async put(url, data) {
    return this._request("PUT", url, data);
  }
}

export const api = new Http({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  credentials: "include",
  headers: {
    Accept: "application/json",
  },
});

function getXSRFToken() {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="));
  if (!match) return "";
  const value = match.split("=")[1] || "";
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

api.addRequestInterceptor(async (config) => {
  if (!getXSRFToken()) {
    await fetch("http://localhost:8000/sanctum/csrf-cookie", {
      credentials: "include",
    });
  }

  config.headers = {
    ...config.headers,
    "X-XSRF-TOKEN": getXSRFToken(),
  };

  return config;
});
