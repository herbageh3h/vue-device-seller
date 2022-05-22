<template>
  <div class="container">
    <div class="pt-5">
      <div class="alert alert-danger" v-if="errorMessage">
        {{ errorMessage }}
      </div>

      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col-6">
              <h3>All Purchased Items</h3>
            </div>
            <div class="col-6 text-end">
              Current role is <strong>{{ currentUser?.role }}</strong>&nbsp;&nbsp;
              <button class="btn btn-primary" @click="changeRole">Change Role</button>
            </div>
          </div>
        </div>
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">Price</th>
                <th scope="col">Color</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in purchaseItemList" :key="idx">
                <th scope="row">{{ idx + 1 }}</th>
                <td>{{ item.name }}</td>
                <td>{{ item.type }}</td>
                <td>{{ `$ ${item.price}` }}</td>
                <td>{{ item.color }}</td>
                <td>{{ new Date(item.purchaseTime).toLocaleDateString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vuex from 'vuex';
import PurchaseService from '../services/purchase.service';
import Roles from '../models/role';
import UserService from '../services/user.service';

export default {
  name: 'profile',
  computed: {
    ...vuex.mapGetters(['currentUser']),
  },
  data() {
    return {
      purchaseItemList: [],
      errorMessage: '',
    };
  },
  mounted() {
    PurchaseService.getAllPurchaseItems()
      .then((response) => {
        this.purchaseItemList = response.data;
      })
      .catch((err) => {
        console.log(err);
        this.errorMessage = 'Unexpected error occurred!';
      });
  },
  methods: {
    ...vuex.mapActions(['clearUser']),
    changeRole() {
      const newRole =
        this.currentUser.role === Roles.ADMIN ? Roles.USER : Roles.ADMIN;

      UserService.changeRole(newRole)
        .then(() => {
          this.clearUser();
          this.$router.push('/login');
        })
        .catch((err) => {
          console.log(err);
          this.errorMessage = 'Unexpected error occurred.';
        });
    },
  },
};
</script>
