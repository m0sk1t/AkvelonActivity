import axios from 'axios';

function fetchRequest(url, callback) {
  axios.get(url)
    .then(function (response) {
      if (response.status === 200) {
        return response.data;
      }
      throw new TypeError('Oops, something went wrong!');
    })
    .then(callback)
    .catch(function (error) { console.log(error); });
}

class ActivityAPI {
  static getActivity() {
    return new Promise(resolve => {
      const activity = {
        teamsByName: {
          'Reddit': {
            id: 1,
            name: 'Reddit',
            totalSteps: 33000,
            color: '#ff5722',
            iconSrc: 'https://www.freeiconspng.com/uploads/reddit-icon-10.png',
            memberIds: [1, 2, 3],
          },
          'Guns N\' Roses': {
            id: 2,
            name: 'Guns N\' Roses',
            totalSteps: 15000,
            color: '#36a2eb',
            iconSrc: 'https://pbs.twimg.com/profile_images/885491686327169024/ufh03Wmg_400x400.jpg',
            memberIds: [4, 5, 6],
          },
          'App Center': {
            id: 3,
            name: 'App Center',
            totalSteps: 24000,
            color: '#ffce56',
            iconSrc: 'https://ph-files.imgix.net/46065c9d-03f9-4c5d-b2c9-81c5f9ae312b?auto=format&auto=compress&codec=mozjpeg&cs=strip',
            memberIds: [7, 8],
          },
          'HR': {
            id: 4,
            name: 'HR',
            totalSteps: 5500,
            color: '#c2185b',
            iconSrc: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/9954f144674049.581a2aaa47c73.png',
            memberIds: [9, 10, 11],
          },
        },
        employeesById: {
          1: {
            name: 'Vlarimir Kotikov',
            totalSteps: 11000,
            teamId: 1,
            color: '#03a9f4',
          },
          2: {
            name: 'Konstantin Bogdanov',
            totalSteps: 11000,
            teamId: 1,
            color: '#795548',
          },
          3: {
            name: 'Artem Komarov',
            totalSteps: 11000,
            teamId: 1,
            color: '#4caf50',
          },
          4: {
            name: 'Ivan Volkov',
            totalSteps: 5000,
            teamId: 2,
            color: '#607d8b',
          },
          5: {
            name: 'Kirill Nesterovich',
            totalSteps: 5000,
            teamId: 2,
            color: '#00bcd4',
          },
          6: {
            name: 'Maxim Mironov',
            totalSteps: 5000,
            teamId: 2,
            color: '#2196f3',
          },
          7: {
            name: 'Andrey Kovanov',
            totalSteps: 12500,
            teamId: 1,
            color: '#ff9800',
          },
          8: {
            name: 'Sergey Akhalkov',
            totalSteps: 12500,
            teamId: 1,
            color: '#ffeb3b',
          },
          9: {
            name: 'Darya Terekhno',
            totalSteps: 2500,
            teamId: 1,
            color: '#e91e63',
          },
          10: {
            name: 'Svetlana Sokolova',
            totalSteps: 1250,
            teamId: 1,
            color: '#673ab7',
          },
          11: {
            name: 'Albina Panova',
            totalSteps: 1250,
            teamId: 1,
            color: '#9c27b0',
          },
        },
      }
      resolve(activity);
    });
  }
}

export default ActivityAPI;
