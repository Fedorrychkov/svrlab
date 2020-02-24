<script>
export default {
  middleware: ['auth'],
  asyncData (routes) {
    routes.redirect('/')
  }
}
</script>
