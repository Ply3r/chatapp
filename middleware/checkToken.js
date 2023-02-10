  import useToken from '../stores/useToken';
  import useUser from '../stores/useUser';
  import UserService from '../assets/http/user.service';

  const checkToken = async () => {
    if (window.location.href === 'http://localhost:3000/') return;

    const token = useToken().getToken;
    const localStorageToken = localStorage.getItem("Token");

    if (!token && !localStorageToken) {
      window.location.replace("http://localhost:3000")
    }

    useToken().setToken(localStorageToken);
    if (!useUser().getUser || !useUser().getUser.user) {
      await new UserService().getUser(useToken().getToken)
        .then(({data}) => {
          useUser().setUser(data.user);          
        })
        .catch(() => {
          window.location.replace("http://localhost:3000")
        });
    }
  }

  export default checkToken;
  