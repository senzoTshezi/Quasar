<template>
  <q-layout view="hHh lpR fFf">
    <!-- HEADER  -->
    <q-header elevated>
      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        /> -->

        <q-toolbar-title class="absolute-center"> FORTEM FARM </q-toolbar-title>

        <!-- LOGIN BUTTON  -->
        <q-btn
          v-if="!loggedIn"
          to="/auth"
          flat
          icon-right="account_circle"
          label="Login"
          class="absolute-right"
        />

        <!-- LOGOUT BUTTON  -->
        <q-btn
          @click="logoutUser"
          v-else
          flat
          icon-right="account_circle"
          label="Logout"
          class="absolute-right"
        />

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>
    <!-- END HEADER  -->

    <!-- FOOTER  -->
    <q-footer>
      <q-tabs>
        <q-route-tab
          v-for="nav in navs"
          :key="nav.id"
          :icon="nav.icon"
          :label="nav.label"
          :to="nav.to"
          exact
        />
        <!-- <q-route-tab
          icon="settings"
          label="Settings"
          to="/settings"
          exact
        /> -->
      </q-tabs>
    </q-footer>
    <!--END  FOOTER  -->

    <!-- NAVIGATION BAR  -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-primary"
    >
      <q-list dark>
        <!-- Header  -->
        <q-item-label header class="text-grey-8"> Navigation </q-item-label>

        <!-- Todo Link  exact is for the active page link -->
        <!-- v-for="nav in navs" :key="nav.id" Now we are looping through that diplaying the object of our Navigation bar  -->
        <!-- :breakpoint="767" Once the screen size width is 767 we hide the Main Navigation bar  -->
        <q-item
          v-for="nav in navs"
          :key="nav.id"
          :breakpoint="767"
          :width="250"
          class="text-grey-4"
          clickable
          exact
          :to="nav.to"
        >
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label> {{ nav.label }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item 
        v-if="$q.platform.is.electron"
        @click="quitApp"
        class="text-grey-4 absolute-bottom"
         clickable>
          <q-item-section avatar>
            <q-icon name="power_settings_new" />
          </q-item-section>
          <q-item-section>
            <q-item-label> Quit</q-item-label>
          </q-item-section>
        </q-item>
        <!-- Setting Link exact is for the active page link -->
        <!-- <q-item clickable exact to="/settings" >
            <q-item-section avatar >
              <q-icon name="settings" />
            </q-item-section>

            <q-item-section>
              <q-item-label> Settings</q-item-label>
            </q-item-section>
          </q-item> -->
      </q-list>
    </q-drawer>
    <!--END  NAVIGATION BAR  -->

    <!-- WHOLE PAGE IS HERE  -->
    <q-page-container>
      <router-view />
    </q-page-container>
    <!-- END WHOLE PAGE IS HERE  -->
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "MainLayout",
  data() {
    return {
      leftDrawerOpen: false,
      navs: [
        {
          id: 0,
          label: "Todo", // Label of the navigation
          icon: "list", // Icon class of the navigation
          to: "/", // Path
        },
        {
          id: 1,
          label: "Settings",
          icon: "settings",
          to: "/settings",
        },
      ],
    };
  },
  computed: {
    ...mapState("auth", ["loggedIn"]),
  },
  methods: {
    ...mapActions("auth", ["logoutUser"]),
      quitApp(){
      this.$q.dialog({
        title:"Quit Fortem",
        message:"Quit Fortem Farm App?",
        cancel:true,
        persistent:true
      }).onOk(()=>{
        if(this.$q.platform.is.electron){
          require('electron').ipcRenderer.send('quit-app')
        }
      })
    }
  },
};
</script>

<style lang="scss">
/*  when screen size is 768 hide footer  */
@media screen and (min-width: 767px) {
  .q-footer {
    display: none;
  }
  .q-drawer .q-item.q-router-link--active {
    color: white !important;
  }

  .q-item__label .text-grey-8 .q-item__label--header {
    color: white !important;
  }
}
.platform-ios {
  .q-header{
    padding-top: constant(safe-area-inset-top); // for iOS 11.0
    padding-top: env(safe-area-inset-top); // for iOS 11.2 +
  }
  .q-footer{
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>
