  import useToken from '../stores/useToken';
  import useUser from '../stores/useUser';
  import LoginService from '../assets/http/login.service';

  const checkToken = async () => {
    console.log('AQUIII', localStorage.getItem("Token"))
    if (window.location.href === 'http://localhost:3000/') return;

    const token = useToken().getToken;
    const localStorageToken = localStorage.getItem("Token");

    if (!token && !localStorageToken) {
      window.location.replace("http://localhost:3000")
    }

    useToken().setToken(localStorageToken);
    if (!useUser().getUser || !useUser().getUser.user) {
      await new LoginService().loginWithToken(useToken().getToken)
        .then(({data: {user}}) => {
          useUser().setUser(user);          
        })
        .catch(() => {
          // window.location.replace("http://localhost:3000")
        });
    }
  }

  export default checkToken;
  