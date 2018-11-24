import delay from './delay';

const usersByLogin = {
  'artem.komarov': {
    id: 3,
    name: 'Artem Komarov',
    registered: true,
    totalSteps: 11000,
    teamName: "Reddit",
    color: "#4caf50",
    achievements: [
      {
        name: 'Runner',
        iconSrc: 'https://static.thenounproject.com/png/168818-200.png',
      },
      {
        name: 'Swimmer',
        iconSrc: 'https://png.icons8.com/ios-glyphs/1600/marathon-swimming.png',
      },
      {
        name: 'Сyclist',
        iconSrc: 'https://static.thenounproject.com/png/574749-200.png',
      },
    ],
  },
  'alexey.semenov': {
    id: 12,
    name: 'Alexey Semenov',
    registered: false,
  },
}

class LoginApi {
  static login(username, password, rememberMe) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (rememberMe) {
          localStorage.setItem('username', username );
        }
        resolve({
          loggedIn: true,
          currentUser: usersByLogin[username],
        });
      }, delay);
    });
  }

  static checkLoginStatus() {
    const username = localStorage.getItem('username');
    return { loggedIn: !!username, currentUser: usersByLogin[username] };
  }

  static logout() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        localStorage.removeItem('username');
        resolve({ loggedIn: false, username: '' });
      }, delay);
    });
  }
}

export default LoginApi;
