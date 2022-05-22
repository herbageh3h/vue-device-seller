<template>
  <div class="container">
    <div class="pt-5">
      <div class="alert alert-danger" v-if="errorMessage">
        {{ errorMessage }}
      </div>
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col-6">
              <h3>All Devices</h3>
            </div>
            <div class="col-6 text-end">
              <button class="btn btn-primary" @click="createDeviceRequest()">
                Create Device
              </button>
            </div>
          </div>
        </div>
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Type</th>
                <th scope="col">Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(device, idx) in deviceList" :key="idx">
                <th scope="row">{{ idx + 1 }}</th>
                <td>{{ device.name }}</td>
                <td>{{ `$ ${device.price}` }}</td>
                <td>{{ device.deviceType }}</td>
                <td>{{ new Date(device.createTime).toLocaleDateString() }}</td>
                <td>
                  <button
                    class="btn btn-primary me-1"
                    @click="editDeviceRequest(device)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-danger"
                    @click="deleteDeviceRequest(device, idx)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <device-modal
      ref="deviceModal"
      @saved="deviceSaved"
      :selected-device="selectedDevice"
    />

    <device-delete-confirm ref="deviceDeleteModal" @confirmed="deleteDevice" />
  </div>
</template>

<script>
import DeviceService from '../services/device.service';
import DeviceModal from '../components/Device';
import Device from '../models/device';
import DeviceDeleteConfirm from '../components/DeviceDeleteConfirm.vue';

import { nextTick } from '@vue/runtime-core';

export default {
  name: 'admin',
  components: { DeviceModal, DeviceDeleteConfirm },
  data() {
    return {
      deviceList: [],
      selectedDevice: new Device(),
      selectedIdx: undefined,
      errorMessage: '',
    };
  },
  mounted() {
    DeviceService.getAllDevices().then((response) => {
      this.deviceList = response.data;
    });
  },
  methods: {
    createDeviceRequest() {
      this.selectedDevice = new Device();
      this.$refs['deviceModal'].showDeviceModal();
    },
    editDeviceRequest(device) {
      this.selectedDevice = Object.assign({}, device);

      nextTick(() => {
        this.$refs['deviceModal'].showDeviceModal();
      });
    },
    deleteDeviceRequest(device, idx) {
      this.selectedDevice = device;
      this.selectedIdx = idx;

      nextTick(() => {
        this.$refs['deviceDeleteModal'].showDeleteModal();
      })
    },
    deleteDevice() {
      DeviceService.deleteDevice(this.selectedDevice)
        .then(() => {
          this.deviceList.splice(this.selectedIdx, 1);
        })
        .catch((err) => {
          console.log(err);
          this.errorMessage = 'Unexpected error occurred.';
        });
    },
    deviceSaved(device) {
      const itemIdx = this.deviceList.findIndex(
        (item) => item.id === device.id
      );

      if (itemIdx !== -1) {
        this.deviceList[itemIdx] = device;
      } else {
        this.deviceList.push(device);
      }
    },
  },
};
</script>
