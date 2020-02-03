// Add here your keycloak setup infos
const keycloakConfig = {
    url: 'https://vinirmititech.com/auth',
    realm: 'swapasya',
    clientId: 'frontend'
};

export const environment = {
  production: true,
    //BACKEND_URL: 'http://localhost:8088',
    BACKEND_URL: 'https://vinirmititech.com/api',
    keycloak: keycloakConfig,
    KEYCLOAK_CLIENTID: 'frontend',
    KEYCLOAK_REALM: 'swapasya',
    KEYCLOAK_URL: 'https://vinirmititech.com/auth'
};
