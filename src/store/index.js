import { createStore } from "vuex";

export default createStore({
  state: {
    recipes: [
      {
        slug: "katsu-curry",
        title: "Katsu Curry",
        description:
          "A delicious curry made with chicken, potates, and a special sauce",
        ingredients: [
          "1 tablespoon olive oil",
          "1 onion, chopped",
          "2 cloves garlic, chopped",
          "1 tablesppon curry powder",
        ],
        method: ["Do it", "Do that", "And do it", "And do that too"],
        image: require("../assets/images/recipes/recipe1.png"),
      },
      {
        slug: "katsu-curry",
        title: "Katsu Curry",
        description:
          "A delicious curry made with chicken, potates, and a special sauce",
        ingredients: [
          "1 tablespoon olive oil",
          "1 onion, chopped",
          "2 cloves garlic, chopped",
          "1 tablesppon curry powder",
        ],
        method: ["Do it", "Do that", "And do it", "And do that too"],
        image: require("../assets/images/recipes/recipe2.png"),
      },
      {
        slug: "katsu-curry",
        title: "Katsu Curry",
        description:
          "A delicious curry made with chicken, potates, and a special sauce",
        ingredients: [
          "1 tablespoon olive oil",
          "1 onion, chopped",
          "2 cloves garlic, chopped",
          "1 tablesppon curry powder",
        ],
        method: ["Do it", "Do that", "And do it", "And do that too"],
        image: require("../assets/images/recipes/recipe3.png"),
      },
    ],
  },
  mutations: {
    ADD_RECIPE(state, recipe) {
      state.recipes.push(recipe);
      localStorage.setItem("store", JSON.stringify(state));
    },
  },
});
