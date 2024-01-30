export class BrandNotFoundException extends Error {
  constructor() {
    super("brand not found");

    this.statusCode = 404;
  }
}

export class BrandBadRequestException extends Error {
  constructor(message) {
      super(message)
      this.statusCode = 400
  }
}

export class BrandNameAlreadyExistException extends Error {
  constructor() {
    super("Brand name already exist");

    this.statusCode = 400;
  }
}

export class BrandNotCreatedException extends Error {
  constructor() {
    super("brand not created");

    this.statusCode = 500;
  }
}
