<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Praćenje informacija o avionskim letovima
        </q-toolbar-title>
        <q-btn
        v-if="$q.screen.width > 505"
        unelevated
        class="text-right text-body1"
        @click="router.push({ name: 'ProfilePage' })">
                    {{ userStore.currentUser.fullName }}
                    <q-avatar class="q-ml-sm" rounded>
                        <q-img
                            :src="'https://i.pravatar.cc/300?img=' + userStore.currentUser.id"
                            :img-style="{ border: '2px solid #FFF', borderRadius: '50%' }"
                        />
                    </q-avatar>
                    <q-tooltip
                    class="text-body2"
                    :offset="[5, 5]"
                    transition-show="scale"
                    transition-hide="scale">
                        <q-card flat class="bg-transparent text-white">
                            <q-card-section>
                                <q-img
                                    :src="'https://i.pravatar.cc/300?img=' + userStore.currentUser.id"
                                    class="q-mb-md"
                                />
                                <strong>{{ 'id' }}:</strong>
                                {{ userStore.currentUser.id }} <q-space />
                                <strong>{{ 'email'}}:</strong>
                                {{ userStore.currentUser.email }} <q-space />
                                <strong>{{ 'role' }}:</strong>
                                {{ userStore.currentUser.role }}
                            </q-card-section>
                        </q-card>
                    </q-tooltip>
                </q-btn>
        <q-btn
        color="white"
        text-color="black"
        label="LOGOUT"
        icon="logout"
        @click="logout" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Menu
        </q-item-label>
      </q-list>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { authApi } from 'src/services/api';
import { useRouter } from 'vue-router';
import { useUserStore } from 'src/stores/UserStore';

const router = useRouter();
const userStore = useUserStore();

const logout = async () => {
  await authApi.logout();
  userStore.clearCurrentUser();
  router.push({ name: 'LoginPage' });
};

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
