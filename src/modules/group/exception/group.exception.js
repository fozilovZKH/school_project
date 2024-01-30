export class GroupNotFoundException extends Error {
  constructor() {
    super("Group not found");

    this.statusCode = 404;
  }
}

export class GroupBadRequestException extends Error {
  constructor(message) {
      super(message)
      this.statusCode = 400
  }
}

export class GroupNotCreatedException extends Error {
  constructor() {
    super("Group not created");

    this.statusCode = 500;
  }
}
