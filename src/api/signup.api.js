import axios from 'axios';

class SignUp {
    static async signup(email, password) {
        try {
            const response = await axios.post('https://dev-kwqlzbkwaupuhibz.us.auth0.com/dbconnections/signup', {
                client_id: 'Wxm1OWz8Mrhu4gOSNvSyWhgoOR0Pa8DZ',
                email,
                password,
                connection: 'Username-Password-Authentication',
            });
            console.log('11111111111111111111111', response);
            console.log('User signed up successfully:', response.data);
            return { output: 200, success: true, message: 'User signed up successfully' };
        } catch (error) {
            if (error?.response?.data?.code === 'invalid_signup') {
                return { output: 202, success: false, error: '*User already exist' };
            } if (error?.response?.data?.code === 'invalid_password') {
                return { output: 400, success: false, error: '*Password is too Weak' };
            }
            return { output: 500, success: false, error: 'User signup failed' };
        }
    }
}

export default SignUp;