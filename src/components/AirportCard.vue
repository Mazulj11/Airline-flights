<template>
  <q-card elevated class="q-ma-lg q-pa-sm" style="width: 300px;">
    <q-img
      :src="imageSrc"
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
      <div class="text-h6">{{ airport.name }}</div>
      <div class="text-subtitle2">{{ airport.city }}</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <label><strong>Država: </strong>  {{ airport.country }}</label><br>
      <label><strong>Kapacitet: </strong> {{ airport.capacity }}</label><br>
      <label><strong>Broj pisti: </strong> {{ airport.runwayCount }}</label><br>
      <label><strong>Broj terminala: </strong> {{ airport.terminalCount }}</label><br>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import { AirportResponse } from 'src/services/api';
import { PropType, computed } from 'vue';

const props = defineProps({
  airport: {
    type: Object as PropType<AirportResponse>,
    required: true,
  },
});

const imageSrc = computed(() => {
  try {
    return new URL(`../assets/airports/airport-image-${props.airport.id}.png`, import.meta.url).href;
  } catch (error) {
    return '';
  }
});

</script>
