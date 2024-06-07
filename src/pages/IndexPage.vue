<template>
  <q-page padding>
    <div class="row justify-between items-center q-mb-md">
      <div class="text-h4 q-pl-xl">
        <div class="q-pa-sm bg-white" style="border-radius: 5px;">
          {{ "Red letenja" }}
        </div>
      </div>
      <q-btn
        label="Dodaj let"
        color="secondary"
        class="q-ma-lg shadow-3 white"
        @click="openAddFlightModal()"
      />
    </div>
    <div class="row justify-center">
      <q-table
        :rows="rows"
        :columns="columns"
        :pagination="pagination"
        row-key="id"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              class="column-header"
            >
              <q-icon :name="col.icon" color="secondary" size="xs" class="q-mr-xs" />
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props" :class="{ 'highlighted-row': props.row.id === highlightedRowId }">
            <q-td :props="props" key="id">
              {{ props.row.id }}
            </q-td>
            <q-td :props="props" key="flightNumber">
              {{ props.row.flightNumber }}
            </q-td>
            <q-td :props="props" key="departureTime">
              {{ date.formatDate(props.row.departureTime, 'DD.MMM.YYYY HH:mm') }}
            </q-td>
            <q-td :props="props" key="arrivalTime">
              {{ date.formatDate(props.row.departureTime, 'DD.MMM.YYYY HH:mm') }}
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
              {{ props.row.departureAirport?.city }}
              <q-tooltip
                class="text-body2"
                :offset="[5, 5]"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-card flat class="bg-transparent text-white">
                  <q-card-section>
                    <strong>{{ 'Naziv' }}:</strong>
                    {{ props.row.departureAirport?.name }} <q-space />
                    <strong>{{ 'Grad' }}:</strong>
                    {{ props.row.departureAirport?.city }} <q-space />
                    <strong>{{ 'Drzava' }}:</strong>
                    {{ props.row.departureAirport?.country }} <q-space />
                    <strong>{{ 'Kapacitet' }}:</strong>
                    {{ props.row.departureAirport?.capacity }} <q-space />
                    <strong>{{ 'Broj terminala' }}:</strong>
                    {{ props.row.departureAirport?.terminalCount }} <q-space />
                    <strong>{{ 'Broj pista' }}:</strong>
                    {{ props.row.departureAirport?.runwayCount }} <q-space />
                  </q-card-section>
                </q-card>
              </q-tooltip>
            </q-td>
            <q-td :props="props" key="arrivalAirport">
              {{ props.row.arrivalAirport?.city }}
              <q-tooltip
                class="text-body2"
                :offset="[5, 5]"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-card flat class="bg-transparent text-white">
                  <q-card-section>
                    <strong>{{ 'Naziv' }}:</strong>
                    {{ props.row.departureAirport?.name }} <q-space />
                    <strong>{{ 'Grad' }}:</strong>
                    {{ props.row.departureAirport?.city }} <q-space />
                    <strong>{{ 'Drzava' }}:</strong>
                    {{ props.row.departureAirport?.country }} <q-space />
                    <strong>{{ 'Kapacitet' }}:</strong>
                    {{ props.row.departureAirport?.capacity }} <q-space />
                    <strong>{{ 'Broj terminala' }}:</strong>
                    {{ props.row.departureAirport?.terminalCount }} <q-space />
                    <strong>{{ 'Broj pista' }}:</strong>
                    {{ props.row.departureAirport?.runwayCount }} <q-space />
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
                transition-hide="scale"
              >
                <q-card flat class="bg-transparent text-white">
                  <q-card-section>
                    <strong>{{ 'Model' }}:</strong>
                    {{ props.row.aircraft?.model }} <q-space />
                    <strong>{{ 'Grad' }}:</strong>
                    {{ props.row.aircraft?.registrationNumber }} <q-space />
                    <strong>{{ 'Kapacitet' }}:</strong>
                    {{ props.row.aircraft?.capacity }} <q-space />
                    <strong>{{ 'Godina proizvodnje' }}:</strong>
                    {{ date.formatDate(props.row.aircraft?.yearOfProduction, 'YYYY') }} <q-space />
                  </q-card-section>
                </q-card>
              </q-tooltip>
            </q-td>
            <q-td :props="props" key="aircraftModel">
              {{ props.row.aircraft?.registrationNumber }}
            </q-td>
            <q-td :props="props" key="action">
              <q-btn
                color="primary"
                icon="fa-solid fa-edit"
                unelevated
                dense
                class="q-mr-sm"
                @click="editFlight(props.row)"
              />
              <q-btn
                color="negative"
                icon="fa-solid fa-trash-can"
                unelevated
                dense
                @click="deleteFlight(props.row.id)"
              />
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
import { onMounted, ref, Ref } from 'vue';
import { flightApi, FlightResponse } from 'src/services/api';
import ConfirmationModal from 'src/components/ConfirmationModal.vue';

const columns = ref([
  {
    name: 'id',
    label: 'ID',
    icon: 'fas fa-id-badge',
    align: 'left',
    field: 'id',
    sortable: true,
    required: true,
  },
  {
    name: 'flightNumber',
    label: 'Broj leta',
    icon: 'fas fa-plane',
    align: 'left',
    field: 'flightNumber',
    sortable: true,
    required: true,
  },
  {
    name: 'departureTime',
    label: 'Odlazak',
    icon: 'fas fa-clock',
    align: 'left',
    field: (row) => date.formatDate(row.departureTime, 'DD.MMM.YYYY HH:mm'),
    sortable: true,
    required: true,
  },
  {
    name: 'arrivalTime',
    label: 'Dolazak',
    icon: 'fas fa-clock',
    align: 'left',
    field: (row) => date.formatDate(row.arrivalTime, 'DD.MMM.YYYY HH:mm'),
    sortable: true,
    required: true,
  },
  {
    name: 'status',
    label: 'Status',
    icon: 'fas fa-info-circle',
    align: 'left',
    field: 'status',
    sortable: true,
    required: true,
  },
  {
    name: 'terminal',
    label: 'Terminal',
    icon: 'fas fa-building',
    align: 'left',
    field: 'terminal',
    sortable: true,
    required: true,
  },
  {
    name: 'gate',
    label: 'Gate',
    icon: 'fas fa-door-open',
    align: 'left',
    field: 'gate',
    sortable: true,
    required: true,
  },
  {
    name: 'departureAirport',
    label: 'Leti iz',
    icon: 'fas fa-plane-departure',
    align: 'left',
    field: (row) => row.departureAirport?.city,
    sortable: true,
    required: true,
  },
  {
    name: 'arrivalAirport',
    label: 'Leti do',
    icon: 'fas fa-plane-arrival',
    align: 'left',
    field: (row) => row.arrivalAirport?.city,
    sortable: true,
    required: true,
  },
  {
    name: 'aircraftModel',
    label: 'Model zrakoplova',
    icon: 'fas fa-plane',
    align: 'left',
    field: (row) => row.aircraft?.model,
    sortable: true,
    required: true,
  },
  {
    name: 'aircraftRegistration',
    label: 'Registracija zrakoplova',
    icon: 'fas fa-registered',
    align: 'left',
    field: (row) => row.aircraft?.registrationNumber,
    sortable: true,
    required: true,
  },
  {
    name: 'action',
    label: '',
    align: 'center',
    field: '',
  },
] as QTableProps['columns']);

const rows: Ref<FlightResponse[]> = ref([]);
const highlightedRowId: Ref<number | null> = ref(null);

const pagination = ref({
  page: 1,
  rowsPerPage: 0,
  rowsNumber: rows.value.length,
  sortBy: 'flightNumber',
  descending: true,
});

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

let socket: WebSocket;

async function handleWebSocketMessage(event: MessageEvent) {
  try {
    const data = JSON.parse(event.data);
    const flightId = data.flight_id;
    highlightedRowId.value = flightId;

    setTimeout(() => {
      highlightedRowId.value = null;
    }, 5000);

    fetchFlights();
  } catch (error) {
    //
  }
}

async function connectWebSocket() {
  try {
    socket = new WebSocket('ws://localhost:8000/ws/flights');
    socket.onmessage = handleWebSocketMessage;
    await new Promise((resolve) => {
      socket.onopen = () => {
        resolve(null);
      };
    });
  } catch (error) {
    //
  }
}

async function editFlight(flight: FlightResponse) {
  Dialog.create({
    component: SetFlightModal,
    componentProps: {
      selectedFlight: flight,
    },
  });
}

async function deleteFlight(id: number) {
  Dialog.create({
    component: ConfirmationModal,
    componentProps: {
      message: 'Želite li izbrisati odabrani let?',
    },
  })
    .onOk(async () => {
      try {
        await flightApi.deleteFlight(id);
        fetchFlights();
      } catch (error) {
        //
      }
    });
}

onMounted(() => {
  connectWebSocket();
  fetchFlights();
});
</script>

<style scoped>
.highlighted-row {
  background-color: #de941c !important;
  color: white !important;
  transition: background-color 0.5s ease-in-out;
}
</style>
