<template>
  <div></div>
</template>
<script>
export default {
  name: "Redirect",
  props: {
    listUrls: Array,
  },
  created() {
    let listUrls = JSON.parse(localStorage.getItem("list-urls")) || [];
    let requestedUrl = this.$route.params?.url_shortened;
    if (requestedUrl) {
      const url = listUrls.find((item) => item.id === requestedUrl);
      if (url?.name) {
        window.location.href = this.addhttp(url.name);
      } else {
        this.$router.push("/");
      }
    }
  },
  methods: {
    addhttp(url) {
      if (!/^(?:f|ht)tps?:\/\//.test(url)) {
        url = "http://" + url;
      }
      return url;
    },
  },
};
</script>
