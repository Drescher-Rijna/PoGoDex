<template>
  <div class="kanto">
    <input v-model="searchTerm" class="searchfield" type="text" placeholder="Search for a Pokemon" />
    <div  class="pokemon-list">
      <div v-for="pokeman in filteredPokemon" :key="pokeman.id">
        <PokeCard :img="pokeman.image" :title="pokeman.name" :number="pokeman.id" :types="pokeman.types" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { getHoennPokemon} from '../services/pokemonDb'
  import PokeCard from '../components/PokeCard.vue'
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'

  export default {
    name: 'HoennPokemon',
    components: { PokeCard },   

    setup() {
      const { pokemon, error, load } = getHoennPokemon()
      const searchTerm = ref("");
      const filteredPokemon = computed(() => {
        return pokemon.value.filter((pokeman:any) => {
          return pokeman.name.includes(searchTerm.value)
        })
      })

      load()

      return { error, filteredPokemon, searchTerm }
    }

    
  }
</script>

<style scoped>
form input[type="text"] {
    text-transform: lowercase;
}
  .pokemon-list {
    display: grid;
    grid-template-columns: 0fr;
    place-items: center;
    place-content: center;
    column-gap: 40px;
    row-gap: 40px;
    margin: 40px auto;
  }

   @media screen and (min-width: 630px) {
    .pokemon-list {
      grid-template-columns: 0fr 0fr;
    }
  }

  @media screen and (min-width: 900px) {
    .pokemon-list {
      grid-template-columns: 0fr 0fr 0fr;
    }
  }
  .searchfield {
    outline: none;
    box-sizing: border-box;
    border: none;
    padding: 15px 10px;
    width: 400px;
    border: 2px solid #eee;
    border-radius: 5px;
    max-width: 95%;
    margin-bottom: 15px;
  }

  .searchfield:focus {
    border-color: #3d3d3d;
  }
</style>