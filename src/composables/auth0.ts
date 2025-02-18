// mouse.js
import { computed } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

export function useAuth0Data() {
  const { user } = useAuth0()
  // const { user, isAuthenticated, logout } = useAuth0();//loginWithRedirect
  const userEmail = computed(() => user.value?.email)
  const userName = computed(() => user.value?.name)

  return { userEmail, userName }
}
