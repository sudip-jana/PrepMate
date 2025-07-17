
// utils/ApiResponse.js

class ApiResponse {
  constructor(success = true, message = "", data = {}, error = null, statusCode=200) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
    if (error) this.error = error;
  }
}

export default ApiResponse