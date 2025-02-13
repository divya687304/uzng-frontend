<template>
  <Toolbar class="toolbar">
    <template #start>
      <Button
        plain
        text
        :class="'logo-container mr-3' + (props.sidebarVisible ? ' active' : '')"
        @click="sidebarVisibleToggle()"
      >
        <i class="pi pi-qrcode"></i>
      </Button>
      <img src="/images/uniphore-new-logo.svg" />
    </template>
    <template #end>
      <div class="flex gap-2 px-2 mr-2">
        <Button v-tooltip.bottom="t('LaunchDarkly Enabled')" icon="pi pi-flag-fill" rounded text>
        </Button>
      </div>
      <div class="flex gap-2 px-2 mr-2">
        <Button icon="pi pi-megaphone" rounded text> </Button>
      </div>
      <div class="flex gap-2 px-2 mr-2">
        <Button icon="pi pi-bell" rounded text> </Button>
      </div>
      <div class="flex gap-2 px-2 mr-2">
        <Button icon="pi pi-cog" rounded text> </Button>
      </div>

      <Button
        class="cursor-pointer menu-trigger"
        shape="circle"
        :label="userName"
        aria-controls="profile_menu"
        aria-haspopup="true"
        icon="pi pi-caret-down"
        icon-pos="right"
        @click="toggleProfileMenu"
      />
      <Menu
        id="profile_menu"
        ref="profileMenu"
        append-to=".toolbar"
        :model="profileMenuItems"
        :popup="true"
      >
        <template #start>
          <button
            class="w-full p-link flex flex-column align-items-center p-2 pl-3 text-color hover:surface-200 border-noround"
          >
            <Avatar :image="''" shape="circle" size="large" />
            <div class="flex flex-column align-items-center mt-2">
              <span class="font-bold capitalize mb-1">{{ userName }}</span>
              <span class="text-sm">{{ userEmail }}</span>
              <span class="text-sm">
                <b>{{ tenantAndRoleString }}</b>
              </span>
            </div>
          </button>
        </template>
        <template #item="menuItem">
          <button 
            class="w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround"
            @click="profileMenuClicked(menuItem)"
          >
            <i :class="menuItem.item.icon" />
            <span class="ml-2" :key="menuItem.item.id">{{ (menuItem.item.label) }}</span>
          </button>
        </template>
      </Menu>
      <Toast />
    </template>
  </Toolbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PrimeIcons } from 'primevue/api'
import { useAuth0Data } from '../../composables/auth0'
import { useAuth0 } from '@auth0/auth0-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { logout } = useAuth0()
const emit = defineEmits(['sidebarToggle', 'preferredLocalClicked'])
const props = defineProps(['sidebarVisible'])

const userEmail = useAuth0Data().userEmail
const userName = useAuth0Data().userName

const tenantAndRoleString = 'Uniphore (superadmin, admin)'
const profileMenu = ref()

const toggleProfileMenu = (event: any) => {
  profileMenu?.value.toggle(event)
}
const profileMenuItems = ref([
  { separator: true },
  {
    id: 'preferredLocal',
    label: 'Set Preferred Locale',
    icon: PrimeIcons.GLOBE
  },
  { id: 'resetPassword', label: 'Reset Password', icon: PrimeIcons.LOCK },
  { separator: true },
  {
    id: 'logout',
    label: 'Logout',
    icon: PrimeIcons.SIGN_OUT
  }
])

function sidebarVisibleToggle() {
  emit('sidebarToggle')
}

function profileMenuClicked({ item }: any) {
  switch (item.id) {
    case 'preferredLocal': {
      emit('preferredLocalClicked')
      break
    }
    case 'logout': {
      logout({
        logoutParams: {
          returnTo: "window.location.origin"
        }
      })
      break
      // useAuth0Data().auth0Logout();
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/top-bar.scss';
</style>
