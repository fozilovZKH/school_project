export class RoomNotFoundException extends Error {
  constructor() {
    super("room not found");

    this.statusCode = 404;
  }
}

export class RoomBadRequestException extends Error {
  constructor(message) {
      super(message)
      this.statusCode = 400
  }
}

export class RoomNotCreatedException extends Error {
  constructor() {
    super("room not created");

    this.statusCode = 500;
  }
}
