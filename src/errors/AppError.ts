class AppError extends Error {
  public readonly message: string;

  public readonly statusCode: number;

  private constructor(message: string, statusCode: number) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }

  static badRequest(message: string): AppError {
    return new AppError(message, 400);
  }
}

export { AppError };
