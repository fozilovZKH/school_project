export class SchoolBadRequestException extends Error {
  constructor(message) {
      super(message)
      this.statusCode = 400
  }
}


export class SchoolNotFoundByIdException extends Error {
  constructor() {
      super("School Not Found")
      this.statusCode = 404
  }
}

export class SchoolNotCreatedException extends Error {
  constructor() {
    super("school not created");

    this.statusCode = 500;
  }
}
