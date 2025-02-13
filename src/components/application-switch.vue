<template>
  <div class="menu-items" v-for="group of APPLICATIONS_LIST" :key="group.groupTitle">
    <div class="group">
      <div class="body-medium-strong mb-2">{{ group.groupTitle }}</div>
      <div v-for="app of group.groupItems" :key="app.id">
        <Button
          text
          class="header flex flex-row justify-content-start w-full gap-3"
          @click="app.action"
        >
          <div class="prefix-icon">
            <img :src="`/images/${app.logo}`" />
          </div>
          <div class="body-medium-copy">{{ app.title }}</div>
        </Button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const APPLICATIONS_LIST = [
  {
    groupTitle: 'Apps',
    groupItems: [
      {
        id: 'uassist-incall',
        title: 'U-Assist InCall',
        subtitle: 'InCall',
        logo: 'u-apps-logo.svg',
        children: [],
        roles: ['admin'],
        action: function () {
          alert('U-Assist Incall')
        }
      },
      {
        id: 'uassist',
        title: 'U-Assist',
        subtitle: 'Assist',
        logo: 'u-apps-logo.svg',
        children: [],
        roles: ['admin'],
        action: function () {
          alert('U-Assist')
        }
      },
      {
        id: 'uanalyze',
        title: 'U-Analyze',
        subtitle: 'Analyze',
        logo: 'u-apps-logo.svg',
        children: [],
        roles: ['admin'],
        action: function () {
          alert('U-Analyze Next Gen')
        }
      },
      {
        id: 'uselfserve',
        title: 'U-SelfServe',
        subtitle: 'SelfServe',
        logo: 'u-apps-logo.svg',
        children: [],
        roles: ['admin'],
        action: function () {
          alert('U-SelfServe')
        }
      },
      {
        id: 'colabo',
        title: 'Collabo',
        subtitle: 'Collabo',
        logo: 'u-apps-logo.svg',
        children: [],
        roles: ['admin'],
        action: function () {
          alert('Collabo')
        }
      }
    ]
  },
  {
    groupTitle: 'Platform Tools',
    groupItems: [
      {
        id: 'uSuite',
        title: 'Uniphore Suite',
        subtitle: 'Administration',
        logo: 'x-platform-logo.svg',
        roles: ['superadmin', 'partner', 'admin'],
        action: function () {
          alert('Uniphore Suite')
        }
      }
    ]
  }
]
</script>
<style lang="scss">
.sidebar-dropdown {
  background: #333333 !important;
  min-width: 14.25rem;
  top: 5rem !important;
  left: 19rem !important;
  &::after,
  &::before {
    content: none;
  }
  .group:not(:last-child) {
    margin-bottom: 0.5rem;
  }
  * {
    color: white;
  }
}
.p-overlaypanel {
  margin-top: 0 !important;
}
.p-overlaypanel:after,
.p-overlaypanel:before {
  border: 0;
}
</style>
