// src/lib/wallet.js
import {
  AppConfig,
  UserSession,
  showConnect,
} from '@stacks/connect';

const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });

export function authenticate() {
  showConnect({
    userSession,
    appDetails: {
      name: 'Classroom DAO Builder',
      icon: window.location.origin + '/favicon.ico',
    },
    onFinish: () => {
      window.location.reload();
    },
  });
}

export function getUserData() {
  if (userSession.isUserSignedIn()) {
    return userSession.loadUserData();
  }
  return null;
}

export function disconnect() {
  userSession.signUserOut();
  window.location.reload();
}
