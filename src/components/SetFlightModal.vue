<template>
  <q-dialog v-model="dialogRef" :backdrop-filter="'blur(4px) saturate(150%)'">
      <q-card>
        <q-card-section class="row items-center q-pb-none text-h6">
          Dialog
        </q-card-section>

        <q-card-section>
          This dialog has a backdrop filter of {{ 'blur(4px) saturate(150%)' }}.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="Secondary" v-close-popup />
          <q-btn flat label="Let" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const dialogRef = ref(false);
</script>
