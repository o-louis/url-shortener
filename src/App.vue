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
  mounted() {
    this.listUrls = JSON.parse(localStorage.getItem("list-urls")) || [];
  },
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
          name: url,
          id: url_id,
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
      localStorage.setItem("list-urls", JSON.stringify(this.listUrls));
    },
  },
};
</script>
