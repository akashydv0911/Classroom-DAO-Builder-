import { AppConfig, UserSession, showConnect } from '@stacks/connect';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

export const authenticate = () => {
  showConnect({
    appDetails: {
      name: 'Classroom DAO',
      icon: window.location.origin + '/logo.png', // Optional
    },
    userSession,
    onFinish: () => {
      window.location.reload();
    },
    onCancel: () => {
      console.log('User cancelled sign-in');
    },
  });
};

export const getUserData = () => {
  if (userSession.isUserSignedIn()) {
    return userSession.loadUserData();
  }
  return null;
};

export const disconnect = () => {
  userSession.signUserOut();
  window.location.reload();
};

export const userSessionInstance = userSession;
