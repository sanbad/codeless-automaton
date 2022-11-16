import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default () => {
    localStorage.removeItem('loggedInUserDetails');
    window.location = "/";
    cookies.remove('loggedInUserEmail');
    cookies.remove('loggedInAccessToken');
}