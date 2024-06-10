<template>
  <q-page padding>
    <div class="row justify-between items-center q-mb-md">
      <div class="text-h4 q-pl-xl">
        <div class="q-pa-sm bg-white"
        style="border-radius: 5px; box-shadow: 5px 5px 20px 0px rgba(0,0,0,0.5)">
          {{ "Zračne luke" }}
        </div>
      </div>
    </div>
    <div class="row justify-center">
      <AirportCard v-for="airport in airports" :key="airport.id" :airport="airport" />
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { ref, Ref } from 'vue';
import { airportApi, AirportResponse } from 'src/services/api';
import AirportCard from 'src/components/AirportCard.vue';

const airports: Ref<AirportResponse[] | null> = ref(null);

async function fetchAirports() {
  try {
    const response = await airportApi.getAirports();
    airports.value = response;
  } catch (error) { //
  }
}
fetchAirports();

</script>
