export class NotFoundException extends Error {
  constructor() {
    super("user-parent not found");

    this.statusCode = 404;
  }
}

export class BadRequestException extends Error {
  constructor(message) {
      super(message)
      this.statusCode = 400
  }
}

export class NotCreatedException extends Error {
  constructor() {
    super("user-parent not created");

    this.statusCode = 500;
  }
}
