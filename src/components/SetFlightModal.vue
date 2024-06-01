<template>
  <q-dialog v-model="dialogRef" :backdrop-filter="'blur(4px) saturate(150%)'">
    <q-card style="max-width: 750px; width: 100%;">
      <q-card-section class="row items-center q-pb-md text-h6 bg-primary text-white">
        Dodavanje leta
      </q-card-section>
      <q-card-section class="q-pa-md scroll" style="max-height: 67vh">
        <q-form class="q-gutter-md q-my-md">
          <label class="q-ml-md text-bold">Broj leta</label>
          <q-input
            class="q-mb-sm"
            outlined
            dense
            clearable
            v-model="formState.flightNumber"
            type="text"
            :rules="[required]"
          />
          <div class="max-width row justify-evenly q-mb-md">
            <div class="col-6">
              <label class="q-ml-md text-bold">Vrijeme polaska</label>
              <div class="q-mb-sm">
                <q-chip color="teal text-white">
                  {{ dateAndTime.dateStart + ' ' + dateAndTime.timeStart }}
                </q-chip>
              </div>
              <q-btn icon="event" round color="primary" class="q-mr-xl">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="dateAndTime.dateStart" mask="DD.MMM.YYYY" color="primary" />
                </q-popup-proxy>
              </q-btn>
              <q-btn icon="access_time" round color="primary">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="dateAndTime.timeStart" mask="HH:mm" color="primary" />
                </q-popup-proxy>
              </q-btn>
            </div>
            <div class="col-6">
              <label class="q-ml-md text-bold">Vrijeme dolaska</label>
              <div class="q-mb-sm">
                <q-chip color="teal text-white">
                  {{ dateAndTime.dateEnd + ' ' + dateAndTime.timeEnd }}
                </q-chip>
              </div>
              <q-btn icon="event" round color="primary" class="q-mr-xl">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="dateAndTime.dateEnd" mask="DD.MMM.YYYY" color="primary" />
                </q-popup-proxy>
              </q-btn>
              <q-btn icon="access_time" round color="primary">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="dateAndTime.timeEnd" mask="HH:mm" color="primary" />
                </q-popup-proxy>
              </q-btn>
            </div>
          </div>
          <label class="q-ml-md text-bold">Aerodrom polaska</label>
          <q-select
            class="q-mb-sm"
            dense
            outlined
            clearable
            v-model="formState.departureAirportId"
            :options="airports?.map((airport) => ({
              label: airport.name,
              value: airport.id,
              city: airport.city,
            }))"
            emit-value
            map-options
            options-dense
            :rules="[required]"
          >
            <template v-slot:append>
              <q-btn
                icon="add"
                unelevated
                color="primary"
                @click="openAddAirportModal"
                class="cursor-pointer"
              />
            </template>
            <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                    <q-item-section>
                        <q-item-label>{{ scope.opt.label}}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                        <q-item-label class="text-caption">{{ scope.opt.city }}</q-item-label>
                    </q-item-section>
                </q-item>
            </template>
          </q-select>
          <label class="q-ml-md text-bold">Aerodrom dolaska</label>
          <q-select
            class="q-mb-sm"
            dense
            outlined
            clearable
            v-model="formState.arrivalAirportId"
            :options="airports?.map((airport) => ({
              label: airport.name,
              value: airport.id,
              city: airport.city,
            }))"
            emit-value
            map-options
            options-dense
            :rules="[required]"
          >
            <template v-slot:append>
              <q-btn
                icon="add"
                unelevated
                color="primary"
                @click="openAddAirportModal"
                class="cursor-pointer"
              />
            </template>
            <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                    <q-item-section>
                        <q-item-label>{{ scope.opt.label}}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                        <q-item-label class="text-caption">{{ scope.opt.city }}</q-item-label>
                    </q-item-section>
                </q-item>
            </template>
          </q-select>
          <label class="q-ml-md text-bold">Zrakoplov</label>
          <q-select
            class="q-mb-sm"
            dense
            outlined
            clearable
            v-model="formState.aircraftId"
            :options="aircrafts?.map((aircraft) => ({
              label: aircraft.model,
              value: aircraft.id,
            }))"
            emit-value
            map-options
            options-dense
            :rules="[required]"
          >
            <template v-slot:append>
              <q-btn
                icon="add"
                unelevated
                color="primary"
                @click="openAddAircraftModal"
                class="cursor-pointer"
              />
            </template>
          </q-select>
          <div class="max-width row justify-between items-start content-start">
            <div class="col-4">
              <label class="q-ml-md text-bold">Terminal</label>
              <q-input
                class="q-mb-sm q-mr-sm"
                dense
                outlined
                clearable
                v-model="formState.terminal"
                type="text"
                :rules="[required]"
              />
            </div>
            <div class="col-4">
              <label class="q-ml-md text-bold">Gate</label>
              <q-input
                class="q-mb-sm q-ml-sm"
                dense
                outlined
                clearable
                v-model="formState.gate"
                type="text"
                :rules="[required]"
              />
            </div>
            <div class="col-4">
              <label class="q-ml-md text-bold">Status</label>
              <q-input
                class="q-mb-sm q-ml-sm"
                dense
                outlined
                clearable
                v-model="formState.status"
                type="text"
                :rules="[required]"
              />

            </div>
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Close" color="secondary" v-close-popup />
        <q-btn
          flat
          label="Dodaj let"
          color="primary"
          type="submit"
          :disable="isSubmitting"
          :loading="isSubmitting"
          @click="addFlight"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref } from 'vue';
import { useValidation } from 'src/composables';
import {
  flightApi, aircraftApi, airportApi, AircraftResponse, AirportResponse,
} from 'src/services/api';
import { Dialog, Notify, date as qDateUtil } from 'quasar';
import CreateAirportModal from './CreateAirportModal.vue';
import CreateAircraftModal from './CreateAircraftModal.vue';

const { required } = useValidation();
const dialogRef = ref(false);
const isSubmitting = ref(false);

const dateAndTime = ref({
  dateStart: new Date().toLocaleDateString('hr-HR', { day: '2-digit', month: 'short', year: 'numeric' }),
  timeStart: new Date().toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit' }),
  dateEnd: new Date().toLocaleDateString('hr-HR', { day: '2-digit', month: 'short', year: 'numeric' }),
  timeEnd: new Date().toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit' }),
});

const formState = ref({
  flightNumber: '',
  departureTime: new Date(),
  arrivalTime: new Date(),
  departureAirportId: 0,
  arrivalAirportId: 0,
  aircraftId: 0,
  terminal: '',
  gate: '',
  status: '',
});

const airports: Ref<AirportResponse[]> = ref([]);
const aircrafts: Ref<AircraftResponse[]> = ref([]);

async function fetchData() {
  try {
    airports.value = await airportApi.getAirports();
    aircrafts.value = await aircraftApi.getAircrafts();
  } catch (error) {
    Notify.create({
      message: 'Greška prilikom učitavanja podataka',
      color: 'negative',
    });
  }
}

async function addFlight() {
  isSubmitting.value = true;

  const formatedStartDate = qDateUtil.formatDate(dateAndTime.value.dateStart, 'YYYY-MM-DD');
  const formatedEndDate = qDateUtil.formatDate(dateAndTime.value.dateEnd, 'YYYY-MM-DD');

  formState.value.departureTime = new Date(qDateUtil.addToDate(formatedStartDate, {
    hours: +(dateAndTime.value.timeStart.split(':')[0]),
    minutes: +(dateAndTime.value.timeStart.split(':')[1]),
  }));
  formState.value.arrivalTime = new Date(qDateUtil.addToDate(formatedEndDate, {
    hours: +(dateAndTime.value.timeEnd.split(':')[0]),
    minutes: +(dateAndTime.value.timeEnd.split(':')[1]),
  }));

  try {
    await flightApi.createFlight(formState.value);
    Notify.create({
      message: 'Let je uspešno dodat',
      color: 'positive',
    });
    dialogRef.value = false;
  } catch (error) {
    Notify.create({
      message: 'Greška prilikom dodavanja leta',
      color: 'negative',
    });
  } finally {
    isSubmitting.value = false;
  }
}

onMounted(fetchData);

function openAddAirportModal() {
  Dialog.create({
    component: CreateAirportModal,
  }).onOk(() => {
    fetchData();
  }).onCancel(() => {
    fetchData();
  });
}

function openAddAircraftModal() {
  Dialog.create({
    component: CreateAircraftModal,
  }).onOk(() => {
    fetchData();
  });
}
</script>
