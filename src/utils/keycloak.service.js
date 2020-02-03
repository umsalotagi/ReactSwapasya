//import { User } from '../model/user.model';
import { environment } from '../environments/environment';
import Keycloak from 'keycloak-js';

class User {

}

export class KeycloakService {

    static auth = {};
    //static user = {};

    static init() {
        console.log(environment.KEYCLOAK_URL);
        const keycloakAuth = Keycloak({
            url: environment.KEYCLOAK_URL,
            realm: environment.KEYCLOAK_REALM,
            clientId: environment.KEYCLOAK_CLIENTID,
            'ssl-required': 'external',
            'public-client': true
        });
        KeycloakService.auth.loggedIn = false;
        return new Promise((resolve, reject) => {
            keycloakAuth
                .init({ onLoad: 'login-required' })
                .success(() => {

                  KeycloakService.auth.loggedIn = true;
                  KeycloakService.auth.authz = keycloakAuth;
                  KeycloakService.auth.logoutUrl =
                      keycloakAuth.authServerUrl +
                          '/realms/' +
                          environment.KEYCLOAK_REALM +
                          '/protocol/openid-connect/logout?redirect_uri=' +
                          document.baseURI;
                  KeycloakService.auth.authz.loadUserProfile().success(data => {
                      this.user = new User();
                      this.user.username = data.username;
                      this.user.firstName = data.firstName;
                      this.user.lastName = data.lastName;
                      this.user.email = data.email;
                      localStorage.setItem('username', JSON.stringify(this.user.username));
                      resolve();
                  });
                })
                .error((e) => {
                  console.log("error in keycloak login ...");
                  console.log("Error", e.stack);
                  console.log("Error", e.name);
                  console.log("Error", e.message);
                  reject();
                });
        });
    }
    authenticated() {
        return KeycloakService.auth.authz.authenticated;
    }
    login() {
        KeycloakService.auth.authz.login();
    }
    account() {
        KeycloakService.auth.authz.accountManagement();
    }
    hasAnyRole(roles) {
        for (let i = 0; i < roles.length; i++) {
            if (this.hasRole(roles[i])) {
                return true;
            }
        }
        return false;
    }
    hasRole(role) {
        return KeycloakService.auth.authz.hasRealmRole(role);
    }
    hasManageUsersRole() {
        return KeycloakService.auth.authz.hasResourceRole('manage-users', 'realm-management');
    }
    logout() {
        console.log('*** LOGOUT');
        KeycloakService.auth.loggedIn = false;
        KeycloakService.auth.authz = null;
        window.location.href = KeycloakService.auth.logoutUrl;
    }
    getToken() {
        return new Promise((resolve, reject) => {
            if (KeycloakService.auth.authz.token) {
                KeycloakService.auth.authz
                    .updateToken(90) // refresh token if it will expire in 90 seconds or less
                    .success(() => {
                    resolve(KeycloakService.auth.authz.token);
                    localStorage.setItem('token', KeycloakService.auth.authz.token);
                })
                    .error(() => {
                    reject('Failed to refresh token');
                });
            }
            else {
                reject('Not logged in');
            }
        });
    }
    getUser() {
        return KeycloakService.user;
    }
}
// KeycloakService.auth = {};
