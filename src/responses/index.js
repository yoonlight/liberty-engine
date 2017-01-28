'use strict';

class Response {
  constructor() {
    this.code = 200;
  }
  send(res) {
    res.status(this.code).json(this);
  }
}

class Success extends Response {
  constructor(data) {
    super();
    this.status = 'success';
    this.code = 200;
    this.data = data;
  }
}

class Created extends Response {
  constructor(data) {
    super();
    this.status = 'success';
    this.code = 201;
    this.data = data;
  }
}

class Failure extends Response {
  constructor(message) {
    super();
    this.status = 'failure';
    this.code = 400;
    this.message = message;
  }
}

class BadRequest extends Response {
  constructor({ name, message } = {}) {
    super();
    this.status = 'failure';
    this.code = 400;
    this.name = name || 'BadRequestError';
    this.message = message || 'bad request.';
  }
}

class ResourceNotFound extends Response {
  constructor() {
    super();
    this.status = 'failure';
    this.code = 404;
    this.name = 'ResourceNotFoundError';
    this.message = 'Cannot find the resource.';
  }
}

class Unauthorized extends Response {
  constructor(message) {
    super();
    this.status = 'failure';
    this.code = 401;
    this.message = message || 'you don\'t have permission to access it.';
  }
}

class ApiNotFound extends Response {
  constructor() {
    super();
    this.status = 'failure';
    this.code = 404;
    this.message = 'Cannot find the API endpoint.';
  }
}


class ServerError extends Response {
  constructor(message) {
    super();
    this.status = 'failure';
    this.code = 500;
    this.message = message || 'Internal Server Error';
  }
}

module.exports = Response;
module.exports.Success = Success;
module.exports.Created = Created;
module.exports.Failure = Failure;
module.exports.BadRequest = BadRequest;
module.exports.Unauthorized = Unauthorized;
module.exports.ResourceNotFound = ResourceNotFound;
module.exports.ApiNotFound = ApiNotFound;
module.exports.ServerError = ServerError;
