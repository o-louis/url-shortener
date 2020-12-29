<template>
  <div id="app" class="font-body bg-black w-full h-full">
    <router-view
      @handleSubmit="handleSubmit"
      :isSavedUrl="isSavedUrl"
      :currentUrl="url"
    ></router-view>
  </div>
</template>

<script>
import "@/assets/tailwind.css";
const LIMIT_CHARACTERS = 8;

export default {
  name: "App",
  data() {
    return {
      url: { name: "", id: "" },
      listUrls: [],
      isSavedUrl: false,
    };
  },
  methods: {
    handleSubmit(url, error) {
      this.isSavedUrl = false;
      this.url = { name: "", id: "" };
      if (!error) {
        const url_id = this.generateRandomId(LIMIT_CHARACTERS);
        this.addToList({
          url: url.name,
          url_id,
        });
        this.isSavedUrl = true;
        this.url = {
          name: url,
          id: `${window.location.href}${url_id}`,
        };
      }
    },

    generateRandomId(nbCharacters) {
      const allCapsAlpha = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
      const allLowerAlpha = [..."abcdefghijklmnopqrstuvwxyz"];
      const allNumbers = [..."0123456789"];
      const base = [...allCapsAlpha, ...allNumbers, ...allLowerAlpha];
      return [...Array(nbCharacters)]
        .map(() => base[(Math.random() * base.length) | 0])
        .join("");
    },

    addToList(item) {
      this.listUrls = [...this.listUrls, item];
    },
  },
};
</script>
