import axios from 'axios';

class Login {
  static async checkUser(email, password) {
    try {
        const response = await axios.post('https://dev-kwqlzbkwaupuhibz.us.auth0.com/oauth/token', {
            grant_type: 'password',
            username: email,
            password,
            client_id: 'Wxm1OWz8Mrhu4gOSNvSyWhgoOR0Pa8DZ',
            client_secret: 'c243Fb5uTy_L6n3iTy6C85OBhm10nGSnuuluDnfL566xDJ_ay459kTZtNUDRz4N3',
            audience: 'https://dev-kwqlzbkwaupuhibz.us.auth0.com/api/v2/', 
          });
      const output = response?.status;
      return { output };
    } catch (error) {
      const output = 400;
      return { output };
    }
  }
}

export default Login;