<template>
  <div class="modal fade" id="deviceModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <form
          @submit.prevent="saveDevice"
          novalidate
          :class="submitted ? 'was-validated' : ''"
        >
          <div class="modal-header">
            <h5 class="modal-title">Device Details</h5>
            <button
              class="btn-close"
              type="button"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="alert alert-danger" v-if="errorMessage">
              <strong>Error!</strong> {{ errorMessage }}
            </div>
            <div class="form-group">
              <label for="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                class="form-control"
                required
                v-model="device.name"
              />
              <div class="invalid-feedback">Device name is required.</div>
            </div>

            <div class="form-group">
              <label for="price">Price</label>
              <input
                type="number"
                min="1"
                step="any"
                id="price"
                name="price"
                class="form-control"
                required
                v-model="device.price"
              />
              <div class="invalid-feedback">
                Price is required and should be greater than 0.
              </div>
            </div>

            <div class="form-group">
              <label for="description">Description</label>
              <textarea
                type="text"
                id="description"
                name="description"
                class="form-control"
                required
                v-model="device.description"
              ></textarea>
              <div class="invalid-feedback">Description is required.</div>
            </div>

            <div class="form-group">
              <label for="type">Type</label>
              <select
                id="type"
                name="type"
                class="form-control"
                required
                v-model="device.deviceType"
              >
                <option value="" selected>Select Device Type</option>
                <option
                  v-for="(type, idx) in deviceTypes"
                  :key="idx"
                  :value="type"
                >
                  {{ type }}
                </option>
              </select>
              <div class="invalid-feedback">Type is required.</div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary"
              type="button"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              class="btn btn-primary"
              type="submit"
              @click="submitted = true"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import DeviceType from '@/models/device-type';
import Device from '@/models/device';
import deviceService from '@/services/device.service';
import $ from 'jquery';

import { ref } from 'vue';

export default {
  name: 'device-modal',
  props: {
    selectedDevice: { type: Object },
  },
  setup(props, context) {
    const device = ref(new Device());
    const errorMessage = ref('');
    const submitted = ref(false);
    const deviceTypes = ref([
      DeviceType.LAPTOP,
      DeviceType.PHONE,
      DeviceType.TABLET,
      DeviceType.DESKTOP,
    ]);

    function saveDevice() {
      if (
        !device.value.name ||
        !device.value.price ||
        !device.value.description ||
        !device.value.deviceType
      ) {
        return;
      }
      deviceService
        .saveDevice(device.value)
        .then((response) => {
          console.log(response.data);
          context.emit('saved', response.data);
          $('#deviceModal').modal('hide');
        })
        .catch((err) => {
          errorMessage.value = 'Unexpected error occurred!';
          console.log(err);
        });
    }

    function showDeviceModal() {
      device.value = Object.assign({}, props.selectedDevice);
      $('#deviceModal').modal('show');
    }

    return {
      device,
      errorMessage,
      submitted,
      deviceTypes,
      saveDevice,
      showDeviceModal,
    };
  },

  /*
  data() {
    return {
      device: new Device(),
      errorMessage: '',
      submitted: false,
      deviceTypes: [
        DeviceType.LAPTOP,
        DeviceType.PHONE,
        DeviceType.TABLET,
        DeviceType.DESKTOP,
      ],
    };
  },
  methods: {
    saveDevice() {
      if (
        !this.device.name ||
        !this.device.price ||
        !this.device.description ||
        !this.device.deviceType
      ) {
        return;
      }
      deviceService
        .saveDevice(this.device)
        .then((response) => {
          console.log(response.data);
          this.$emit('saved', response.data);
          $('#deviceModal').modal('hide');
        })
        .catch((err) => {
          this.errorMessage = 'Unexpected error occurred!';
          console.log(err);
        });
    },
    showDeviceModal() {
      this.device = Object.assign({}, this.selectedDevice);
      $('#deviceModal').modal('show');
    },
  },
  */
};
</script>
