<template>
  <q-card elevated class="q-ma-lg q-pa-sm" style="width: 300px;">
    <q-img
      :src="`https://www.airport-data.com/images/aircraft/001/697/0016922${aircraft.id + 1}.jpg`"
      loading="lazy"
      spinner-color="primary"
      fit="cover"
      style="width: 100%; height: 190px; overflow: hidden;">
      <template v-slot:error>
        <div class="absolute-full flex flex-center bg-negative text-white">
          Nije moguće učitati sliku
        </div>
      </template>
    </q-img>

    <q-card-section>
      <div class="text-h6">{{ aircraft.model }}</div>
      <div class="text-subtitle2">{{ new Date(aircraft.yearOfProduction).getFullYear() }}</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <label><strong>Registracijski broj: </strong>  {{ aircraft.registrationNumber }}</label><br>
      <label><strong>Kapacitet: </strong> {{ aircraft.capacity }}</label><br>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import { AircraftResponse } from 'src/services/api';
import { PropType } from 'vue';

defineProps({
  aircraft: {
    type: Object as PropType<AircraftResponse>,
    required: true,
  },
});

</script>
