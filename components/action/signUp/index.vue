<script>
  import ImageUploader from 'vue-image-upload-resize'
  import UserService from '../../../assets/http/user.service';
  import Swal from 'sweetalert2'

  export default {
    name: 'SingUp',
    components: {
      Swal,
      ImageUploader,
    },
    data() {
      return {
        params: {
          email: '',
          username: '',
          password: '',
          confirm_password: '',
          profile_image: null,
        },
        img: null,
        service: new UserService(),
        hasImage: false,
        show: {
          password: false,
          confirm_password: false,
        }
      }
    },
    methods: {
      validate() {
        const is_email_valid = /^[\w]+@[\w]+[.][\w]{2,3}$/.test(this.params.email);
        if (!is_email_valid) return false;

        const is_password_valid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.params.password);
        if (!is_password_valid) return false;
        
        if (this.params.password !== this.params.confirm_password) return false;
        if (!this.params.username) return false;

        return true;
      },
      async create() {
        const is_valid = this.validate();

        if (!is_valid) return;
        const body = { ...this.params };
        delete body.confirm_password;

        this.service.create(body)
          .then(() => {
            this.$bvModal.hide('singUp')
            Swal.fire({
              title: 'Success!',
              text: 'User created',
              icon: 'success',
            })
          })
          .catch(({ response: { data: { message } } }) => {
            Swal.fire({
              title: 'Error!',
              text: message,
              icon: 'error',
            })
          })
      },
      closeModal() {
        this.$bvModal.hide('singUp')
      },
      setImage(value) {
        this.hasImage = true;
        this.params.profile_image = value;
        this.img = value;
      },
      formatText(str) {
        str = str.split('_').join(' ');
        str = str[0].toUpperCase() + str.slice(1, str.length);

        return str;
      }
    }
  }
</script>

<template>
  <b-form>
    <b-form-group class="d-flex justify-content-center">
      <client-only>
        <image-uploader
          id="uploader"
          :debug="1"
          :maxWidth="128"
          :maxHeight="128"
          :quality="0.7"
          :autoRotate=true
          outputFormat="verbose"
          class="d-none"
          accept="image/*"
          @change="setImage"
        >
        </image-uploader>
        <label for="uploader" class="avatar big-avatar">
          <img v-if="hasImage" :src="img.dataUrl" />
          <div v-else class="add-avatar">
            <b-icon class="img-icon" icon="card-image"></b-icon>
          </div>
          <b-icon variant="success" class="add-icon" icon="plus-circle-fill"></b-icon>
        </label>
      </client-only>
    </b-form-group>
    <b-container>
      <b-row>
        <b-col cols="12">
          <b-form-group>
            <label class="w-100" for="username-sing-up">
              Username:
              <b-form-input 
                id="username-sing-up"
                v-model="params.username"
              />
            </label>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-form-group>
            <label class="w-100" for="email-sing-up">
              Email:
              <b-form-input
                id="email-sing-up"
                v-model="params.email"
              />
            </label>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col
          :key="key+'-sing-up'"
          v-for="key in ['password', 'confirm_password']"
        >
          <b-form-group>
            <label :for="key+'-sing-up'">
              {{ `${formatText(key)}:` }}
              <b-input-group>
                <b-form-input
                  :id="key+'-sing-up'"
                  :type="show[key] ? 'text' : 'password'"
                  v-model="params[key]"
                />
                <b-icon 
                  class="show-pass"
                  @click="show[key] = !show[key]" 
                  :icon="show[key] ? 'eye' : 'eye-slash'" 
                />
              </b-input-group>
            </label>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <hr>
          <div class="d-flex justify-content-end">
            <b-button @click="create" class="mx-2" variant="primary">
              Save
            </b-button>
            <b-button @click="closeModal">
              Cancel
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </b-form>
</template>

<style scoped>
  button {
    color: white !important;
  }
</style>
