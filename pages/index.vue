<script>
import singUp from '~/components/action/signUp';
import backgroundImage from '../assets/imgs/login-background.png';
import LoginService from '~/assets/http/login.service';
import useUser from '../stores/useUser';
import useToken from '../stores/useToken';
import Swal from 'sweetalert2'


export default {
  components: {
    Swal,
    singUp 
  },
  head: {
    title: 'Login',
  },
  name: 'Login',
  data() {
    return {
      params: {
        email: '',
        password: '',
      },
      service: new LoginService(),
      backgroundImage
    }
  },
  computed: {
    disableLogin() {
      const is_email_valid = /^[\w]+@[\w]+[.][\w]{2,3}$/.test(this.params.email);
      if (!is_email_valid) return true;

      const is_password_valid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.params.password);
      if (!is_password_valid) return true;

      return false;
    },
  },
  methods: {
    async login() {
      this.service.login(this.params)
        .then(({ data: { user, token } }) => {
          useUser().setUser(user);
          useToken().setToken(token);
          
          localStorage.setItem("Token", token);
          this.$router.push('/chat');
        })
        .catch(({ response: { data: { message } }}) => {
          Swal.fire({
            title: 'Error!',
            text: message,
            icon: 'error',
          })
        })
    },
  }
}
</script>

<template>
  <div class="page-container">
    <div class="banner">
      <img :src="backgroundImage" alt="background">
    </div>
    <div class="login-container">
      <h1 class="text-center">ChatApp</h1>
      <div class="form-container">
        <b-form>
          <b-form-group>
            <label for="email">Email: </label>
            <b-form-input 
              id="email"
              class="mb-3"
              placeholder="Email"
              v-model="params.email"
            />
          </b-form-group>
          <b-form-group>
            <label for="password">Password: </label>
            <b-form-input 
              id="password"
              class="mb-3"
              type="password"
              placeholder="password"
              v-model="params.password"
            />
          </b-form-group>
          <b-button
            class="btn w-100"
            variant="success"
            @click="login"
            :disabled="disableLogin"
          >
            Login
          </b-button>
        </b-form>
        <div class="mt-3 text-center">
          <span>Don't have an account?</span>
          <p 
            class="link"
            v-b-modal.singUp
          >
            Click here to create
          </p>
        </div>
      </div>
    </div>
    <b-modal id="singUp" hide-footer title="Criar Conta">
      <sing-up />
    </b-modal>
  </div>
</template>

<style scoped>
.link {
  user-select: none;
  cursor: pointer;
  text-decoration: underline;
}

.page-container {
  width: 100vw;
  height: 100vh;
  display: flex;
}

.banner {
  width: 70%;
  height: 100%;
}

.banner > img {
  height: 100%;
  width: 100%;
  background-size: cover;
}

.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  background-color: #0471A6;
  color: white;
}

.form-container {
  width: 80%;
}
</style>
