export class LoginResponse {
  public accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
