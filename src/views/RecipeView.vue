<template>
  <div class="recipe">
    <router-link to="/">&lt; Back</router-link>
    <div class="flex items-center">
      <div>
        <h1>{{ recipe.title }}</h1>
        <p>{{ recipe.description }}</p>
      </div>
      <img :src="recipe.image" class="w-96 rounded-lg" alt="" />
    </div>
    <hr />
    <div class="ingredients">
      <h3>Ingredients</h3>
      <ul>
        <li v-for="(ingredient, i) in recipe.ingredients" :key="i">
          {{ ingredient }}
        </li>
      </ul>
    </div>
    <div class="method">
      <h3>Method</h3>
      <ol>
        <li v-for="(step, i) in recipe.method" :key="i">
          <span v-html="cleanText(step)"></span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    recipe() {
      return this.$store.state.recipes.find(
        (recipe) => recipe.slug === this.$route.params.slug
      );
    },
  },
  methods: {
    cleanText(text) {
      return text.replace(/\n/g, "<br />");
    },
  },
};
</script>

<style></style>
