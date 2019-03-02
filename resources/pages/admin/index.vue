<template>
  <div>
  </div>
</template>
<script>
export default {
  layout: 'admin',
  asyncData({redirect}) {
    redirect('/admin/dashboard');
  }
}
</script>
