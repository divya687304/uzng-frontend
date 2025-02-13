<template>
  <div class="container">
    <TopBar
      :sidebar-visible="sidebarVisible"
      @sidebar-toggle="sidebarVisible = !sidebarVisible"
      @preferred-local-clicked="showLocaleDialog = true"
      v-if="isAuthenticated && !isLoading"
    ></TopBar>
    <div class="card flex justify-content-center">
      <Sidebar
        :block-scroll="true"
        v-model:visible="sidebarVisible"
        :showCloseIcon="false"
        :modal="true"
        class="custom-sidebar bg-gray-900"
      >
        <template #header>
          <Button
            text
            class="header flex flex-row justify-content-between w-full pl-5"
            @click="toggleDropdown"
          >
            <div class="flex flex-row justify-content-start gap-3">
              <div class="prefix-icon">
                <img :src="currentApplication?.logo" alt="" srcset="" />
              </div>
              <div class="heading flex flex-column align-items-start justify-content-center">
                <div class="body-big-copy">{{ currentApplication?.title }}</div>
                <div class="body-big-strong">{{ currentApplication?.subtitle }}</div>
              </div>
            </div>

            <div class="suffix-icon"><i class="pi pi-list"></i></div>
          </Button>

          <OverlayPanel ref="menu" :dismissable="false" class="sidebar-dropdown">
            <ApplicationSwitch></ApplicationSwitch>
          </OverlayPanel>
        </template>
        <SideNav></SideNav>
        <!-- <AdminSidenav :menu-items="navItems"></AdminSidenav> -->
      </Sidebar>
      <div class="content">
        <Button v-if="!isAuthenticated && !isLoading" @click="login">Log in</Button>
        <!-- <Button v-if="isAuthenticated && !isLoading" @click="logOut"> {{ t("Logout") }}</Button> -->
        <div v-if="isAuthenticated && !isLoading">
          <!-- <HelloWorld :msg="'Jupiter'"></HelloWorld> -->
           <Services/>
        </div>

        <slot />
      </div>
    </div>
    <PreferredLocal
      :show-dialog="showLocaleDialog"
      :locales="languageOptions"
      @close-dialog="closeLocalDialog"
      @preferred-locale-changed="(local: any) => preferredLocaleChanged(local)"
    ></PreferredLocal>
  </div>
</template>
<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'

// import { useI18n } from 'vue-i18n'
import { ref, onMounted } from 'vue'
import PreferredLocal from '../src/components/Header/preferred-local.vue'
import HelloWorld from './components/hello-world.vue';
import Services from "./views/services.vue"

const currentApplication = {
  logo: '/assets/x-platform-logo.svg',
  title: 'Uniphore Suite',
  subtitle: 'Administration'
}

// const { t } = useI18n()

const menu = ref()
const auth0 = useAuth0()
const sidebarVisible = ref(false)
let showLocaleDialog = ref(false)
const isLoading = ref(auth0.isLoading)
const { loginWithRedirect } = useAuth0()
const isAuthenticated = ref(auth0.isAuthenticated)

const languageOptions = ref([
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'Japanese', value: 'ja' }
])

const login = () => {
  loginWithRedirect()
}

onMounted(() => {})

const toggleDropdown = (event: any) => {
  menu.value.toggle(event)
}

function closeLocalDialog() {
  showLocaleDialog.value = false
}

function preferredLocaleChanged(local: any) {
  console.log(local)
}
</script>

<style lang="scss">
.custom-sidebar {
  //height: calc(100vh - 64px);
  top: 64px;
  color: white;
  max-width: 18rem;
  .p-sidebar-header {
    padding: 0px;
    .p-sidebar-header-content {
      width: 100%;
    }

    .header {
      padding: 1rem;
      color: white !important;

      &:hover,
      &.active {
        background-color: #424242;
      }
    }
  }
  .p-sidebar-content {
    padding: 0px;
  }
}
</style>