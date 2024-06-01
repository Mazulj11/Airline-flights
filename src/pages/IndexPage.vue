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
          <q-table
            :rows="rows"
            :columns="columns"
            row-key="id"
          >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td :props="props" key="flightNumber">
                {{ props.row.flight_number }}
              </q-td>
              <q-td :props="props" key="departureTime">
                {{ date.formatDate(props.row.departure_time, 'DD.MMM.YYYY') }}
              </q-td>
              <q-td :props="props" key="arrivalTime">
                {{ date.formatDate(props.row.departure_time, 'DD.MMM.YYYY') }}
              </q-td>
              <q-td :props="props" key="status">
                {{ props.row.status }}
              </q-td>
              <q-td :props="props" key="terminal">
                {{ props.row.terminal }}
              </q-td>
              <q-td :props="props" key="gate">
                {{ props.row.gate }}
              </q-td>
              <q-td :props="props" key="departureAirport">
                {{ props.row.departure_airport?.city }}
                <q-tooltip
                    class="text-body2"
                    :offset="[5, 5]"
                    transition-show="scale"
                    transition-hide="scale">
                        <q-card flat class="bg-transparent text-white">
                            <q-card-section>
                                <strong>{{ 'Naziv' }}:</strong>
                                {{ props.row.departure_airport?.name }} <q-space />
                                <strong>{{ 'Grad'}}:</strong>
                                {{ props.row.departure_airport?.city }} <q-space />
                                <strong>{{ 'Drzava' }}:</strong>
                                {{ props.row.departure_airport?.country }} <q-space />
                                <strong>{{ 'Kapacitet'}}:</strong>
                                {{ props.row.departure_airport?.capacity }} <q-space />
                                <strong>{{ 'Broj terminala' }}:</strong>
                                {{ props.row.departure_airport?.terminal_count }} <q-space />
                                <strong>{{ 'Broj pista' }}:</strong>
                                {{ props.row.departure_airport?.runway_count }} <q-space />
                            </q-card-section>
                        </q-card>
                    </q-tooltip>
              </q-td>
              <q-td :props="props" key="arrivalAirport">
                {{ props.row.arrival_airport?.city }}
                <q-tooltip
                    class="text-body2"
                    :offset="[5, 5]"
                    transition-show="scale"
                    transition-hide="scale">
                        <q-card flat class="bg-transparent text-white">
                            <q-card-section>
                                <strong>{{ 'Naziv' }}:</strong>
                                {{ props.row.departure_airport?.name }} <q-space />
                                <strong>{{ 'Grad'}}:</strong>
                                {{ props.row.departure_airport?.city }} <q-space />
                                <strong>{{ 'Drzava' }}:</strong>
                                {{ props.row.departure_airport?.country }} <q-space />
                                <strong>{{ 'Kapacitet'}}:</strong>
                                {{ props.row.departure_airport?.capacity }} <q-space />
                                <strong>{{ 'Broj terminala' }}:</strong>
                                {{ props.row.departure_airport?.terminal_count }} <q-space />
                                <strong>{{ 'Broj pista' }}:</strong>
                                {{ props.row.departure_airport?.runway_count }} <q-space />
                            </q-card-section>
                        </q-card>
                    </q-tooltip>
              </q-td>
              <q-td :props="props" key="aircraftModel">
                {{ props.row.aircraft?.model }}
                <q-tooltip
                    class="text-body2"
                    :offset="[5, 5]"
                    transition-show="scale"
                    transition-hide="scale">
                        <q-card flat class="bg-transparent text-white">
                            <q-card-section>
                                <strong>{{ 'Model' }}:</strong>
                                {{ props.row.aircraft?.model }} <q-space />
                                <strong>{{ 'Grad'}}:</strong>
                                {{ props.row.aircraft?.registration_number }} <q-space />
                                <strong>{{ 'Kapacitet'}}:</strong>
                                {{ props.row.aircraft?.capacity }} <q-space />
                                <strong>{{ 'Godina proizvodnje' }}:</strong>
                                {{ props.row.aircraft?.year_of_production.slice(0,4) }} <q-space />
                            </q-card-section>
                        </q-card>
                    </q-tooltip>
              </q-td>
              <q-td :props="props" key="aircraftModel">
                {{ props.row.aircraft?.registration_number }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
        </div>

    </q-page>
</template>

<script setup lang="ts">
import { Dialog, QTableProps, date } from 'quasar';
import SetFlightModal from 'src/components/SetFlightModal.vue';
import { ref, Ref } from 'vue';
import { flightApi, FlightResponse } from 'src/services/api';

const columns = ref([
  {
    name: 'flightNumber', label: 'Broj leta', align: 'left', field: 'flight_number', sortable: true, required: true,
  },
  {
    name: 'departureTime', label: 'Odlazak', align: 'left', field: (row) => date.formatDate(row.departure_time, 'DD.MMM.YYYY'), sortable: true, required: true,
  },
  {
    name: 'arrivalTime', label: 'Dolazak', align: 'left', field: (row) => date.formatDate(row.arrival_time, 'DD.MMM.YYYY'), sortable: true, required: true,
  },
  {
    name: 'status', label: 'Status', align: 'left', field: 'status', sortable: true, required: true,
  },
  {
    name: 'terminal', label: 'Terminal', align: 'left', field: 'terminal', sortable: true, required: true,
  },
  {
    name: 'gate', label: 'Gate', align: 'left', field: 'gate', sortable: true, required: true,
  },
  {
    name: 'departureAirport', label: 'Leti iz', align: 'left', field: (row) => row.departure_airport?.city, sortable: true, required: true,
  },
  {
    name: 'arrivalAirport', label: 'Leti do', align: 'left', field: (row) => row.arrival_airport?.city, sortable: true, required: true,
  },
  {
    name: 'aircraftModel', label: 'Model zrakoplova', align: 'left', field: (row) => row.aircraft?.model, sortable: true, required: true,
  },
  {
    name: 'aircraftModel', label: 'Registracija zrakoplova', align: 'left', field: (row) => row.aircraft?.registration_number, sortable: true, required: true,
  },
] as QTableProps['columns']);

const rows: Ref<FlightResponse[]> = ref([]);

async function fetchFlights() {
  try {
    rows.value = await flightApi.getFlights();
  } catch (error) {
    //
  }
}
fetchFlights();

function openAddFlightModal() {
  Dialog.create({
    component: SetFlightModal,
  });
}

</script>
