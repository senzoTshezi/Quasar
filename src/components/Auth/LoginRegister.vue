<template>
  <form @submit.prevent="submitForm">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        Please {{tab | titleCase}} on our app
      </q-banner>
    </div>

    <!-- EMAIL TETBOX -->
    <div class="row q-mb-md">
      <q-input
      type="email"
        :rules="[
          (val) =>
            isValidEmailAddress(val) || 'Please enter a valid email address.',
        ]"
        lazy-rules
        ref="email"
        v-model="formData.email"
        outlined
        class="col"
        label="Email"
        stack-label
      />
    </div>

    <!-- PASSWORD TETBOX -->
    <div class="row q-mb-md">
      <q-input
        :rules="[
          (val) => val.length >= 6 || 'Please enter at least 6 characters.',
        ]"
        lazy-rules
        ref="password"
        type="password"
        v-model="formData.password"
        outlined
        class="col"
        label="Password"
        stack-label
      />
    </div>

    <!-- REGISTER BUTTON -->
    <div class="row">
      <q-space />
      <q-btn color="primary" :label="tab" type="submit" />
    </div>
  </form>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  props:['tab'],
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions('auth', ['registerUser','loginUser']),
    isValidEmailAddress(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    submitForm() {
        this.$refs.email.validate()
        this.$refs.password.validate()

        if(!this.$refs.email.hasError && !this.$refs.password.hasError){
            if(this.tab == 'login'){
              this.loginUser(this.formData)
            }else{
              this.registerUser(this.formData)
            }
        }
      
    }
  },
  filters: {
    titleCase(value){
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>