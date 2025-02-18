import { useAuth0 } from '@auth0/auth0-vue';
import dayjs from 'dayjs';
import { defineStore } from 'pinia';
import { computed, ref, type Ref } from 'vue';
import { jwtDecode } from 'jwt-decode';

export const useGlobalTokenStore = defineStore('globalTokenStore', () => {
  const { getAccessTokenSilently } = useAuth0();

  const clusterKey = 'https://api.uniphore.com/cluster';

  const token: Ref<string | null> = ref(null);
  const tokenExpiryBufferSec = ref(5);

  const tokenExpireTime = computed(() => {
    if (!token.value) {
      return null;
    }

    const expiry = jwtDecode(token.value).exp;
    return expiry;
  });

  function getToken() {
    return new Promise<string | null>((resolve, reject) => {
      if (token.value && tokenExpireTime.value) {
        const currentUnixTimeStamp = dayjs().unix();
        const tokenExpiryIn = tokenExpireTime.value - tokenExpiryBufferSec.value;
        if (tokenExpiryIn > currentUnixTimeStamp) {
          resolve(token.value);
        } else {
          getFreshToken(resolve, reject);
        }
      } else {
        getFreshToken(resolve, reject);
      }
    });
  }

  async function getFreshToken(resolve: any, reject: any) {
    try {
      const newToken = await getAccessTokenSilently();
      token.value = newToken;
      resolve(newToken);
    } catch (err) {
      reject(err);
    }
  }

  return { getToken };
});