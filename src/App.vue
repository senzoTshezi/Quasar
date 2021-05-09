<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('settings', ['getSettings']),
    ...mapActions('auth',['handleAuthStateChange'])
  },
  mounted() {
    if(this.$q.platform.is.electron){
      require('electron').ipcRenderer.on('show-settings',() => {
        this.$router.push('/settings')
        console.log('Not working')
      })
      console.log("Tshezi")
    }else{
      console.log("senzo")
    }
    
    this.getSettings()
    this.handleAuthStateChange()
  }
}
</script>
