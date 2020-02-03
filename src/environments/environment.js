// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// Add here your keycloak setup infos
const keycloakConfig = {
  url: 'https://vinirmititech.com/auth',
  realm: 'swapasya',
  clientId: 'frontend'
};

export const environment = {
  production: false,
  //BACKEND_URL: 'http://localhost:8088',
  BACKEND_URL: 'https://vinirmititech.com/api',
  keycloak: keycloakConfig,
  KEYCLOAK_CLIENTID: 'frontend',
  KEYCLOAK_REALM: 'swapasya',
  KEYCLOAK_URL: 'https://vinirmititech.com/auth'
};
