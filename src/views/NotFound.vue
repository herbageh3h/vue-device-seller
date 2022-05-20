<template>
  <div class="container">
    <div class="col-md-12 text-center">
      <span class="display-1">
        404
      </span>
      <div class="mb-4 lead">
        Oops, we can't seem to find the page you are looking for.
      </div>
      <router-link to="/home" class="btn btn-link">
        Back to Home
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'not-found',
};
</script>
