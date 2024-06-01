<template>
  <q-page padding>
        <div class="row justify-between items-center q-mb-md">
            <div class="text-h4 q-pl-xl">{{ "Red letenja" }}</div>
            <q-btn
            label="Dodaj let"
            color="primary"
            class="q-ma-lg"
            @click="openAddFlightModal()" />
        </div>
        <div class="row justify-center">

        </div>

    </q-page>
</template>

<script setup lang="ts">
import { Dialog } from 'quasar';
import SetFlightModal from 'src/components/SetFlightModal.vue';

function openAddFlightModal() {
  Dialog.create({
    component: SetFlightModal,
  });
}

</script>
