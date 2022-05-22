<template>
  <div class="container mt-5">
    <div class="card ms-auto me-auto p-3 shadow-lg custom-card">
      <font-awesome-icon icon="user-circle" class="ms-auto me-auto user-icon" />
      <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>
      <form
        @submit.prevent="handleLogin"
        novalidate
        :class="submitted ? 'was-validated' : ''"
      >
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            class="form-control"
            name="username"
            placeholder="Username"
            required
            v-model="formData.username"
          />
          <div class="invalid-feedback">Username is required.</div>

          <label for="password">Password</label>
          <input
            type="text"
            id="password"
            class="form-control"
            name="password"
            placeholder="Password"
            required
            v-model="formData.password"
          />
          <div class="invalid-feedback">Password is required.</div>

          <button
            class="btn btn-success w-100 mt-3"
            @click="submitted = true"
            :disabled="loading"
          >
            Sign In
          </button>
        </div>
      </form>

      <router-link class="btn btn-link" to="/register" style="color: darkgray">
        Create New Account!
      </router-link>
    </div>
  </div>
</template>

<script>
import User from '../models/user';
// import vuex from 'vuex';
import AuthenticationService from '../services/authentication.service';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'login',
  setup() {
    const formData = ref(new User());
    const loading = ref(false);
    const submitted = ref(false);
    const errorMessage = ref('');

    const store = useStore();
    const { currentUser } = store.getters;

    const router = useRouter();

    onMounted(() => {
      if (currentUser?.username) {
        router.push('/profile');
      }
    });

    function handleLogin() {
      if (!formData.value.username || !formData.value.password) {
        return;
      }

      loading.value = true;
      AuthenticationService.login(formData.value)
        .then((response) => {
          store.dispatch('updateUser', response.data);
          router.push('/profile');
        })
        .catch((err) => {
          console.log(err);
          errorMessage.value = 'Unexpected error occurred.';
        })
        .then(() => (loading.value = false));
    }

    return {
      formData,
      loading,
      submitted,
      errorMessage,
      currentUser,
      handleLogin,
    };
  },
  /*
  data() {
    return {
      formData: new User(),
      loading: false,
      submitted: false,
      errorMessage: '',
    };
  },
  computed: {
    ...vuex.mapGetters(['currentUser']),
  },
  mounted() {
    if (this.currentUser?.username) {
      this.$router.push('/profile');
    }
  },
  methods: {
    ...vuex.mapActions(['updateUser']),
    handleLogin() {
      if (!this.formData.username || !this.formData.password) {
        return;
      }

      this.loading = true;
      AuthenticationService.login(this.formData)
        .then((response) => {
          this.updateUser(response.data);
          this.$router.push('/profile');
        })
        .catch((err) => {
          console.log(err);
          this.errorMessage = 'Unexpected error occurred.';
        })
        .then(() => (this.loading = false));
    },
  },
  */
};
</script>
