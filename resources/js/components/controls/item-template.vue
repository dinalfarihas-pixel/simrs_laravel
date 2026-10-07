<template>
    <div>
      <b>#{{ item.NAMA }}</b>
      <span>{{ item.NAMA }}</span>
    </div>
  </template>
  
  <script>
    export default {
      props: {
        item: { required: true },
      },
    };
  </script>