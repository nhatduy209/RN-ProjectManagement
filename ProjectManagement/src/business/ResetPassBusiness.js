import axios from 'axios';
export default class ResetPass {
  resetPass = async data => {
    const {username} = data;
    console.log(username);
    return new Promise((result, reject) => {
      axios
        .post('https://uat.xboss.com/web/reset_password_mobile', {
          params: {login: username},
        })
        .then(function (res) {
          result(res);
        })
        .catch(function (err) {
          alert(err);
        });
    });
  };
}
