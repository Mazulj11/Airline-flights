<template>
  <q-page padding>
    <div class="row justify-between items-center q-mb-md">
      <div class="text-h4 q-pl-xl">
        <div class="q-pa-sm bg-white"
        style="border-radius: 5px; box-shadow: 5px 5px 20px 0px rgba(0,0,0,0.5)">
          {{ "Zrakoplovi" }}
        </div>
      </div>
    </div>
    <div class="row justify-center">
      <AircraftCard v-for="aircraft in aircrafts" :key="aircraft.id" :aircraft="aircraft" />
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { ref, Ref } from 'vue';
import { aircraftApi, AircraftResponse } from 'src/services/api';
import AircraftCard from 'src/components/AircraftCard.vue';

const aircrafts: Ref<AircraftResponse[] | null> = ref(null);

async function fetchAircrafts() {
  try {
    const response = await aircraftApi.getAircrafts();
    aircrafts.value = response;
  } catch (error) { //
  }
}
fetchAircrafts();

</script>
