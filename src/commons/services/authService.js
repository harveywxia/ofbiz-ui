import { inject } from "aurelia-framework";
import { HttpClient, json } from "aurelia-fetch-client";
import { Store } from "aurelia-store";
import { setJwtToken, setUserLoginId, setPartyId } from "../../store/store";
import { HttpService } from "./httpService";

@inject(HttpClient, Store, HttpService)
export class AuthService {

  baseUrl = 'api/';

  constructor(httpClient, store) {
    this.httpClient = httpClient;
    this.store = store;
    this.store.registerAction('setUserLoginId', setUserLoginId);
    this.store.registerAction('setJwtToken', setJwtToken);
    this.store.registerAction('setPartyId', setPartyId);
  }

  async loginAttempt(username, password) {
    try {
      const response = await this.httpClient.fetch(
          `${this.baseUrl}auth/v1/login`,
          {
            method: 'POST',
            body: json({
                "userLoginId": username,
                "currentPassword": password
              }
            )
          }
        );
      if (response.ok) {
        const responseData = await response.json();
        await this.store.dispatch('setUserLoginId', responseData['userLoginId']);
        await this.store.dispatch('setJwtToken', responseData['token']);
        return true;
      }
    } catch (e) {
      return null
    }
  }

  async signUpRequest(username, password, verifiedPassword) {
    try {
      const response = await this.httpClient
        .fetch(
          `${this.baseUrl}auth/v1/register`,
          {
            method: 'POST',
            body: json({
                "userLoginId": username,
                "currentPassword": password,
                "currentPasswordVerify": verifiedPassword
              }
            )
          }
        );
      if (response.ok) {
        return true;
      }
    } catch (e) {
      return null
    }
  }

}
