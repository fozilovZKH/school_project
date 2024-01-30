export class SubjectNotFoundException extends Error {
  constructor() {
    super("subject not found");

    this.statusCode = 404;
  }
}

export class SubjectBadRequestException extends Error {
  constructor(message) {
      super(message)
      this.statusCode = 400
  }
}

export class SubjectNotCreatedException extends Error {
  constructor() {
    super("subject not created");

    this.statusCode = 500;
  }
}
