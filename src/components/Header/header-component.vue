<template>
  <header class="fixed w-screen top-0">
    <nav
      class="container px-6 py-6 mx-auto md:flex md:justify-between md:items-center text-lg"
    >
      <div class="flex items-center justify-between">
        <router-link
          to="/"
          class="text-xl font-bold text-gray-800 md:text-2xl hover:text-blue-400 flex items-center gap-2"
        >
          <img src="../../assets/images/chef.png" class="w-11" alt="" />
          <span class="text-base uppercase">Simple Recipe</span>
        </router-link>
        <!-- Mobile menu button -->
        <div @click="showMenu = !showMenu" class="flex md:hidden">
          <button
            type="button"
            class="text-gray-800 hover:text-gray-400 focus:outline-none focus:text-gray-400"
          >
            <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
              <path
                fill-rule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
      <ul
        :class="showMenu ? 'flex' : 'hidden'"
        class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0"
      >
        <li class="font-bold text-gray-800 hover:text-blue-400">
          <router-link :to="{ path: '/', hash: '#home' }">Home</router-link>
        </li>
        <li class="font-bold text-gray-800 hover:text-blue-400">
          <router-link :to="{ path: '/', hash: '#about' }">About</router-link>
        </li>
        <li class="font-bold text-gray-800 hover:text-blue-400">
          <router-link :to="{ path: '/', hash: '#recipes' }"
            >Recipes</router-link
          >
        </li>
        <li class="font-bold text-gray-800 hover:text-blue-400">
          <router-link :to="{ path: '/', hash: '#gallery' }">
            Gallery
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    scrollTo() {
      // Obtenha a referência ao elemento que você deseja rolar até ele
      const home = this.$refs.home;
      const about = this.$refs.about;
      const recipes = this.$refs.recipes;
      const gallery = this.$refs.gallery;

      // Verifique se o elemento foi encontrado
      if (home) {
        // Rola até o elemento
        home.scrollIntoView({ behavior: "smooth" });
      }
      if (about) {
        // Rola até o elemento
        about.scrollIntoView({ behavior: "smooth" });
      }
      if (recipes) {
        // Rola até o elemento
        recipes.scrollIntoView({ behavior: "smooth" });
      }
      if (gallery) {
        // Rola até o elemento
        gallery.scrollIntoView({ behavior: "smooth" });
      }
    },
  },
};
</script>

<style scoped>
span {
  font-weight: 600;
}
header {
  background-color: #ecebf7;
  z-index: 100;
}
</style>
