<template>
  <q-layout view="hHh lpR fFf">

    <!-- HEADER  -->
    <q-header elevated >
      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        /> -->

        <q-toolbar-title class="absolute-center">
          Awesome Todo
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>
    <!-- END HEADER  -->



    <!-- FOOTER  -->
    <q-footer >
      <q-tabs>
        <q-route-tab
        v-for="nav in navs" :key="nav.id"
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
          v-for="nav in navs" :key="nav.id"
          :breakpoint="767"
          :width="250"
          class="text-grey-4"
          clickable exact :to="nav.to" >
            <q-item-section avatar >
              <q-icon :name="nav.icon" />
            </q-item-section>

            <q-item-section>
              <q-item-label> {{nav.label}}</q-item-label>

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
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      navs: [
        { 
          id: 0,
          label : 'Todo', // Label of the navigation
          icon : 'list', // Icon class of the navigation
          to : '/'// Path 
        },
        {
          id: 1,
          label : 'Settings',
          icon : 'settings', 
          to : '/settings'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
/*  when screen size is 768 hide footer  */
@media screen and (min-width:767px) {
  .q-footer{
    display: none;
  }
  .q-drawer .q-item.q-router-link--active{
    color: white  !important;
  }

  .q-item__label .text-grey-8 .q-item__label--header {
    color: white !important; 
  }
}
</style>
