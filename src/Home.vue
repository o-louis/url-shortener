<template>
  <div class="m-auto w-10/12 sm:w-8/12 pt-20">
    <h1 class="text-white text-7xl uppercase text-green-200 font-bold">
      URL Shortener
    </h1>
    <form @submit.prevent="sendUrl" class="mt-32 text-white flex flex-col">
      <label for="url">Enter or paste your URL here</label>
      <div class="flex mt-3 mb-1">
        <input
          type="text"
          name="url"
          id="url"
          placeholder="Twitter.com..."
          class="w-72 p-3 rounded-l-sm text-black"
          v-model="url"
        />
        <button type="submit" class="bg-green-300 px-4 py-2 rounded-r-sm">
          Get a link
        </button>
      </div>
    </form>
    <p v-if="error" class="text-red-400">Please enter a valid URL.</p>
    <p v-if="isSavedUrl" class="text-green-400">
      Succeed !<br />Your shortened url is
      <span class="font-bold">{{ currentUrl.id }}</span>
    </p>
    <p v-if="isSavedUrl" class="text-sm text-green-200 italic">
      Long URL: {{ currentUrl.name }}
    </p>
    <p v-else-if="findUrlName" class="text-red-400">
      This URL has already been shortened<br />
      <span class="font-bold">{{ urlShortened("id") }}</span>
      <br />
      <span class="italic text-sm">Long URL: {{ urlShortened("name") }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "Home",
  props: {
    isSavedUrl: Boolean,
    currentUrl: Object,
    findUrl: Function,
  },
  data() {
    return {
      url: "",
      error: false,
      findUrlName: null,
    };
  },
  methods: {
    sendUrl() {
      this.error = false;
      if (!this.isUrlValid()) this.error = true;
      this.$emit("handleSubmit", this.url, this.error);
      this.findUrlName = this.findUrl(this.url) || null;
      this.url = "";
    },

    isUrlValid() {
      const expression = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
      const regex = new RegExp(expression);
      return this.url.match(regex) ? true : false;
    },

    urlShortened(key) {
      key =
        key == "id"
          ? `${window.location.href}${this.findUrlName[key]}`
          : this.findUrlName[key];
      return key;
    },
  },
};
</script>
