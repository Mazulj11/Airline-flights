<template>
  <q-dialog v-model="dialogRef" :backdrop-filter="'blur(4px) saturate(150%)'">
      <q-card style="max-width: 500px; width: 100%; ">
        <q-card-section class="row items-center q-pb-md text-h6 bg-primary text-white">
          Dodavaje aerodroma
        </q-card-section>

        <q-card-section class="q-pa-md scroll" style="max-height: 67vh">
          <q-form class="q-gutter-md q-pa-sm q-my-sm">
            <label class="q-ml-md text-bold">Naziv</label>
            <q-input
              class="q-mb-sm"
              standout
              dense
              clearable
              v-model="formState.name"
              type="text"
              :rules="[required]" />
            <label class="q-ml-md text-bold">Grad</label>
            <q-input
              class="q-mb-sm"
              dense
              standout
              clearable
              v-model="formState.city"
              type="text"
              :rules="[required]" />
            <label class="q-ml-md text-bold">Država</label>
            <q-input
              class="q-mb-sm"
              dense
              standout
              clearable
              v-model="formState.country"
              type="text"
              :rules="[required]" />
            <label class="q-ml-md text-bold">Broj terminala</label>
            <q-input
              class="q-mb-sm"
              dense
              standout
              clearable
              v-model="formState.terminalCount"
              type="number"
              :rules="[required]" />
            <label class="q-ml-md text-bold">Broj pista</label>
            <q-input
              class="q-mb-sm"
              dense
              standout
              clearable
              v-model="formState.runwayCount"
              type="number"
              :rules="[required]" />
            <label class="q-ml-md text-bold">Kapacitet</label>
            <q-input
              class="q-mb-sm"
              dense
              standout
              clearable
              v-model="formState.capacity"
              type="number"
              :rules="[required]" />
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="Secondary" v-close-popup />
          <q-btn
          flat
          label="Dodaj let"
          color="primary"
          :disable="isSubmitting
          || formState.name === ''
          || formState.city === ''
          || formState.country === ''"
          :loading="isSubmitting"
          @click="createAirport" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useValidation } from 'src/composables';
import { airportApi } from 'src/services/api';
import { Notify } from 'quasar';

const isSubmitting = ref(false);
const dialogRef = ref(false);
const { required } = useValidation();

const formState = ref({
  name: '',
  city: '',
  country: '',
  terminalCount: 0,
  runwayCount: 0,
  capacity: 0,
});

async function createAirport() {
  isSubmitting.value = true;
  try {
    await airportApi.createAirport(formState.value);
    Notify.create({
      message: 'Aerodrom je uspješno dodan',
      color: 'positive',
    });
    dialogRef.value = false;
  } catch (error) {
    Notify.create({
      message: 'Došlo je do greške prilikom dodavanja aerodroma',
      color: 'negative',
    });
  } finally {
    isSubmitting.value = false;
  }
}

</script>
