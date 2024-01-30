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

            console.log('User signed up successfully:', response.data);
            return { output: 200, success: true, message: 'User signed up successfully' };
        } catch (error) {
            console.error('User signup error:', error.response ? error.response.data : error.message);
            return { output: 500, success: false, error: 'User signup failed' };
        }
    }
}

export default SignUp;