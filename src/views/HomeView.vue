<template>
  <div>
    <section class="mb-20 mt-40" ref="home" id="home">
      <div
        class="hero flex flex-col lg:flex-row justify-center lg:justify-between gap-20 lg:gap-64 items-center mt-20"
      >
        <div class="description">
          <h1 class="text-6xl mb-9 highlight-red">Simple Recipe</h1>
          <p class="mb-9">
            Here is a place where you can find easy recipes for your everyday
            life. You and other people can post recipes for free with the
            intention of helping anyone who wants a quick recipe with
            ingredients that can be found easily :)
          </p>
          <button @click="toggleModal">Add new recipe</button>
        </div>
        <div class="food">
          <img
            src="../assets/images/noodle.png"
            class="w-44 lg:w-11/12 z-10"
            alt=""
          />
        </div>
      </div>
      <div class="recipe-modal z-20" v-if="modalOpen">
        <div class="modal-content">
          <div class="flex justify-between mb-6 items-center">
            <h2 class="text-lg">New recipe</h2>
            <button type="button" @click="toggleModal">X</button>
          </div>
          <!-- <form @submit.prevent="addNewRecipe"> -->
          <FormKit
            type="form"
            @submit="addNewRecipe"
            :actions="false"
            #default="{ state: { valid } }"
          >
            <FormKit
              type="text"
              name="title"
              id="title"
              label="Title"
              help="Recipe title"
              placeholder="“Fresh Salad”"
              v-model="newRecipe.title"
              validation="required"
              :validation-messages="{
                required: 'This input is required',
              }"
            />
            <FormKit
              type="textarea"
              label="Description"
              rows="10"
              placeholder="“Fresh Salad that's refresh”"
              help="Recipe description"
              v-model="newRecipe.description"
              validation="required"
              :validation-messages="{
                required: 'This input is required',
              }"
            />
            <div class="group">
              <label for="" class="font-bold text-base">Ingredients</label>
              <div
                class="ingredient"
                v-for="i in newRecipe.ingredientRows"
                :key="i"
              >
                <FormKit
                  type="text"
                  help="Recipe ingredient"
                  placeholder="“Salt?”"
                  v-model="newRecipe.ingredients[i - 1]"
                  validation="required"
                  :validation-messages="{
                    required: 'This input is required',
                  }"
                />
              </div>
              <button type="button" @click="addNewIngredient">
                Add ingredient
              </button>
            </div>
            <div class="group">
              <label for="">Method</label>
              <div class="method" v-for="i in newRecipe.methodRows" :key="i">
                <FormKit
                  type="textarea"
                  rows="5"
                  placeholder="“Mix?”"
                  help="Recipe method"
                  v-model="newRecipe.method[i - 1]"
                  validation="required"
                  :validation-messages="{
                    required: 'This input is required',
                  }"
                />
              </div>
              <button type="button" @click="addNewStep">Add step</button>
            </div>
            <div class="group">
              <label for="">Image</label>
              <div class="image">
                <FormKit
                  type="file"
                  label="Documents"
                  accept="image/*"
                  help="Select just one image."
                  multiple="false"
                  @change="uploadImage"
                  validation="required"
                  ref="myImage"
                  :validation-messages="{
                    required: 'This input is required',
                  }"
                />
                <img :src="previewImage" class="w-52" />
              </div>
            </div>
            <FormKit type="submit" :disabled="!valid" />
          </FormKit>
          <!-- <button type="submit">Add Recipe</button> -->
          <!-- </form> -->
        </div>
      </div>
    </section>
    <section
      class="about flex flex-col-reverse lg:flex-row justify-center lg:justify-between gap-20 lg:gap-64 items-center mt-40 mb-40"
      ref="about"
      id="about"
    >
      <div class="food">
        <img
          src="../assets/images/soymilk.png"
          class="w-44 lg:w-11/12"
          alt=""
        />
      </div>
      <div class="description">
        <h1 class="text-5xl mb-9 highlight-red">About</h1>
        <p>
          We are a simple website but with a simple idea too. We are not always
          willing to have a feast, we want to prepare something good but healthy
          and without waste because it is important, right? We know about the
          diversity of foods and how they can make sense together and there is
          nothing better than many people from all over the world to share this.
        </p>
      </div>
    </section>
    <section class="mb-20" ref="recipes" id="recipes">
      <h1 class="text-5xl mb-12 highlight-red">Recipes</h1>
      <div class="recipes">
        <div
          class="card"
          v-for="recipe in $store.state.recipes"
          :key="recipe.slug"
        >
          <h1 class="text-2xl mb-4">{{ recipe.title }}</h1>
          <p>{{ recipe.description }}</p>
          <img :src="recipe.image" alt="" class="rounded-lg max-h-72 m-auto" />
          <router-link :to="`/recipe/${recipe.slug}`" class="underline">
            View recipe
          </router-link>
        </div>
      </div>
    </section>
    <section ref="gallery" id="recipes">
      <h1 class="text-5xl mb-9 highlight-red">Gallery</h1>
      <div class="gallery">
        <div
          class="card"
          v-for="recipe in $store.state.recipes"
          :key="recipe.slug"
        >
          <img :src="recipe.image" alt="" class="rounded-lg" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

// @ is an alias to /src
export default {
  name: "HomeView",
  data() {
    return {
      image: [],
      previewImage: undefined,
      valid: false,
    };
  },
  setup() {
    const newRecipe = ref({
      title: "",
      description: "",
      ingredients: [],
      method: [],
      ingredientRows: 1,
      methodRows: 1,
      image: [],
    });

    const modalOpen = ref(false);

    const store = useStore();

    const toggleModal = () => {
      modalOpen.value = !modalOpen.value;
    };

    const addNewIngredient = () => {
      newRecipe.value.ingredientRows++;
    };

    const addNewStep = () => {
      newRecipe.value.methodRows++;
    };

    const addNewRecipe = () => {
      newRecipe.value.slug = newRecipe.value.title
        .toLowerCase()
        .replace(/\s/g, "-");

      // if (!newRecipe.value.slug) {
      //   alert("Please enter a title");
      //   return;
      // }

      store.commit("ADD_RECIPE", { ...newRecipe.value });

      newRecipe.value = {
        title: "",
        description: "",
        ingredients: [],
        method: [],
        ingredientRows: 1,
        methodRows: 1,
        image: [],
      };

      localStorage.setItem("newRecipe.value", JSON.stringify(newRecipe.value));

      toggleModal();
    };

    return {
      newRecipe,
      toggleModal,
      modalOpen,
      addNewIngredient,
      addNewStep,
      addNewRecipe,
    };
  },
  methods: {
    uploadImage(e) {
      const [image] = e.target.files;
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
        console.log(this.previewImage);
      };
    },
  },
};
</script>

<style scoped>
.highlight-red {
  display: inline-block;
  padding: 0.25em 0;
  border-bottom: 3px solid #ff7184;
}
.hero .food {
  -webkit-filter: drop-shadow(0px 50px 30px #ff5062);
  -moz-filter: drop-shadow(0px 50px 30px #ff5062);
  -ms-filter: drop-shadow(0px 50px 30px #ff5062);
  -o-filter: drop-shadow(0px 50px 30px #ff5062);
  filter: drop-shadow(0px 32px 73px #ff5062);
}

.hero button {
  background-color: rgb(35, 150, 54);
  color: #ffffff;
  padding: 0.5rem 2rem;
  border-radius: 5rem;
}

.hero button:hover {
  background-color: #d9e991;
  color: black;
}

form button {
  background-color: #d995d5;
  color: #000000;
  padding: 0.5rem 1rem;
  border-radius: 5rem;
  font-size: 0.9rem;
}

form button:hover {
  background-color: #ddb9e2;
  color: #000000;
}

.recipe-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.301);
}

.recipe-modal .modal-content {
  background-color: #ecebf7;
  border: 1px solid #000000;
  border-radius: 0.8rem;
  padding: 2rem;
  width: 100%;
  max-width: 768px;
  max-height: 768px;
  overflow: auto;
}

.modal-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.modal-content .group {
  margin-bottom: 1rem;
}

.modal-content .group label {
  display: block;
  margin-bottom: 0.5rem;
}

.modal-content .group input,
.modal-content .group textarea {
  display: block;
  width: 100%;
}

.about .description {
  text-align: right;
}

/* About */

.about .food {
  -webkit-filter: drop-shadow(0px -20px 70px rgb(35, 150, 54));
  -moz-filter: drop-shadow(0px -20px 70px rgb(35, 150, 54));
  -ms-filter: drop-shadow(0px -20px 70px rgb(35, 150, 54));
  -o-filter: drop-shadow(0px -20px 70px rgb(35, 150, 54));
  filter: drop-shadow(0px -20px 70px rgb(35, 150, 54));
}

/* Recipes */

.recipes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.recipes .card {
  padding: 1rem;
  border-radius: 5px;
  margin: 1rem;
  background-color: #f6f5fd;
  border: 1px solid #000000;
  border-radius: 0.8rem;
  padding: 2rem;
}

.recipes .card h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.recipes .card p {
  font-size: 1.125rem;
  line-height: 1.4;
  margin-bottom: 1rem;
}

/* FormKit */

[data-invalid] .formkit-inner {
  border-color: red;
  box-shadow: 0 0 0 1px red;
}

[data-complete] .formkit-inner {
  border-color: red;
  box-shadow: 0 0 0 1px green;
}
[data-complete] .formkit-inner::after {
  content: "✅";
  display: block;
  padding: 0.5em;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  place-items: center;
}

.gallery .card {
  padding: 1rem;
  border-radius: 5px;
  margin: 1rem;
  background-color: #f6f5fd;
  border: 1px solid #000000;
  border-radius: 0.8rem;
  padding: 2rem;
  width: 300px;
  height: 300px;
  position: relative;
}

.gallery .card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
}
</style>
