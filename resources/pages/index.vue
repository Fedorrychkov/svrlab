<template>
  <section class="homepage">s</section>
</template>
<script>
import gql from 'graphql-tag'

export default {
  data() {
    return {
    }
  },
  components: {

  },
  created() {
    // this.$apollo.getClient();
    this.$apollo.query({ query: gql`{posts {title, author}}`})
      .then(({ data }) => {
        console.log(data);
        // do what you want with data
    })
  }
}
</script>
