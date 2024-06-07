<template>
  <q-dialog v-model="dialogRef" :backdrop-filter="'blur(4px) saturate(150%)'">
      <q-card style="max-width: 500px; width: 100%; ">
        <q-card-section class="row items-center q-pb-md text-h6 bg-primary text-white">
          Dodavanje zrakoplova
        </q-card-section>

        <q-card-section class="q-pa-md scroll" style="max-height: 67vh">
          <q-form class="q-gutter-md q-pa-sm q-my-sm">
            <label class="q-ml-md text-bold">Model</label>
            <q-input
              class="q-mb-sm"
              standout
              dense
              clearable
              v-model="formState.model"
              type="text"
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
            <label class="q-ml-md text-bold">Registracijski broj</label>
            <q-input
              class="q-mb-sm"
              dense
              standout
              clearable
              v-model="formState.registrationNumber"
              type="text"
              :rules="[required]" />
            <label class="q-ml-md text-bold">Godina proizvodnje</label>
            <q-select
              class="q-mb-sm"
              dense
              standout
              clearable
              v-model="formState.yearOfProduction"
              :options="Array.from({ length: 75 }, (_, i) => new Date().getFullYear() - i)"
              options-dense
              :rules="[required]"
            />
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Zatvori" color="Secondary" v-close-popup />
          <q-btn
          flat
          label="Dodaj zrakoplov"
          color="primary"
          :disable="isSubmitting
          || formState.model === ''
          || formState.capacity === 0
          || formState.registrationNumber === ''
          || formState.yearOfProduction === ''"
          :loading="isSubmitting"
          @click="createAircraft" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useValidation } from 'src/composables';
import { aircraftApi } from 'src/services/api';
import { Notify } from 'quasar';

const isSubmitting = ref(false);
const dialogRef = ref(false);
const { required } = useValidation();

const formState = ref({
  model: '',
  capacity: 0,
  registrationNumber: '',
  yearOfProduction: '',
});

async function createAircraft() {
  isSubmitting.value = true;
  try {
    await aircraftApi.createAircraft({
      ...formState.value,
      yearOfProduction: new Date(`01.01.${formState.value.yearOfProduction}`),
    });
    Notify.create({
      message: 'Zrakoplov je uspješno dodan',
      color: 'positive',
    });
    dialogRef.value = false;
  } catch (error) {
    Notify.create({
      message: 'Došlo je do greške prilikom dodavanja zrakoplova',
      color: 'negative',
    });
  } finally {
    isSubmitting.value = false;
  }
}

</script>
