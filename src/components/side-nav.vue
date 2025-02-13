<template>
  <div class="top-level-menu" v-for="menuItem of menuItems" :key="menuItem.text">
    <div class="test">
      <Button
        class="w-full border-noround top-level-menu-header"
        text
        @click="toggleMenuItems(menuItem)"
      >
        <div class="flex align-items-center gap-3 w-full pl-3 menu-text">
          <i :class="'pi ' + menuItem.icon"></i>
          {{ menuItem.text }}
          <i
            v-if="menuItem.children && menuItem.children.length > 0"
            :class="['pi pi-angle-up', 'menu-toggle-icon', { collapse: !menuItem.expanded }]"
          ></i>
        </div>
      </Button>
    </div>
    <div :class="['sub-menu', { collapse: !menuItem.expanded }]">
      <div class="sub-menu-container">
        <div v-for="child of menuItem.children" :key="child.text">
          <Button class="w-full border-noround sub-menu-item menu-text" text>
            {{ child.text }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const menuItems = ref([
  {
    text: 'U-Analyze Next Gen',
    icon: 'pi-th-large',
    expanded: false
  },
  {
    text: 'Conversation Insights',
    icon: 'pi-wrench',
    expanded: false
  },
  {
    text: 'Scorecard Studio',
    icon: 'pi-th-large',
    expanded: false
  },
  {
    text: 'Reports',
    icon: 'pi-users',
    expanded: false,
    children: [
      {
        text: 'Contact Analysis'
      },
      {
        text: 'Customer Analysis'
      }
    ]
  }
])

function toggleMenuItems(menuItem: any) {
  menuItem.expanded = !menuItem.expanded
}
</script>
<style lang="scss">
@import '../assets/side-nav.scss';
</style>
