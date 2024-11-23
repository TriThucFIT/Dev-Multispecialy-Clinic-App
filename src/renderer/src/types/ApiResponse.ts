export class ApiResponseDto<T> {
  statusCode: number
  message: string
  data: T

  constructor(statusCode: number, message: string, data: T) {
    this.statusCode = statusCode
    this.message = message
    this.data = data
  }
}

export class ErrorDto {
  errorCode?: number | string
  errorMessage: string = ''

  constructor(message: string, code?: number | string) {
    this.errorMessage = message
    this.errorCode = code
  }
}
