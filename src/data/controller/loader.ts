export const enum Methods {
  GET = 'GET',
  POST = 'POST',
}

export type Endpoint = string | unknown;

export type Callback<T> = (data: T) => void;

class Loader {
  readonly baseLink: string;
  readonly options?: Record<string, unknown>;

  constructor(baseLink: string, options: Record<string, unknown>) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResponce<T>(
    { endpoint: endpoint, options = {} }: { endpoint: Endpoint; options?: Record<string, unknown> },
    callback: Callback<T> = (): void => {
      console.error('No callback for GET response');
    }
  ) {
    this.load(Methods.GET, endpoint, callback, options);
  }

  makeUrl({ options, endpoint }: { options: Record<string, unknown>; endpoint: Endpoint }) {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  errorHandler(result: Response): Response {
    if (!result.ok) {
      if (result.status === 401 || result.status === 404) {
        console.log(`${result.status} ${result.statusText}`);
        throw Error(result.statusText);
      }
    }
    return result;
  }

  load<T>(method: Methods, endpoint: Endpoint, callback: Callback<T>, options: Record<string, unknown>) {
    fetch(this.makeUrl({ options: options, endpoint: endpoint }), { method })
      .then(this.errorHandler)
      .then((res: Response) => res.json())
      .then((data: T): void => callback(data))
      .catch((err: Error): void => console.error(err));
  }
}

export default Loader;
