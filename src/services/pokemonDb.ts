// Source ALL: https://pokeapi.co/api/v2/pokemon?limit=386&offset=0
// Source Kanto: https://pokeapi.co/api/v2/pokemon?limit=151&offset=0
// Source Johto: https://pokeapi.co/api/v2/pokemon?limit=100&offset=151
// Source Hoenn: https://pokeapi.co/api/v2/pokemon?limit=135&offset=251

// OBJECT
// name: data.name,
// id: index + 1,
// image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
//     index + 1
// }.png`

import { computed, ref } from "vue"

// Source ALL: https://pokeapi.co/api/v2/pokemon?limit=386&offset=0
const getAllPokemon = () => {
    const pokemon:any= ref([])
    const error:any = ref(null)

    const load = async () => {
        try {
            const data = await fetch('/pokemon.json')
            let finalData = null
            if(!data.ok) {
                throw Error('no data available')
            }
            finalData = await data.json()
            pokemon.value = finalData.map((data:any, index:any) => ({
                name: data.pokemon_name.toLowerCase().toLowerCase(),
                types: data.type,
                id: data.pokemon_id,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    data.pokemon_id
                }.png`
            }));
        } catch (err:any) {
            error.value = err.message
            console.log(error.value)
        }
    }

    return { pokemon, error, load }
}

// Source Kanto: https://pokeapi.co/api/v2/pokemon?limit=151&offset=0
const getKantoPokemon = () => {
    const pokemon = ref()
    const error:any = ref(null)

    const load = async () => {
        try {
            const data = await fetch('/pokemon.json')
            let finalData = null
            if(!data.ok) {
                throw Error('no data available')
            }
            finalData = await data.json()
            pokemon.value = finalData.slice(0, 153).map((data:any, index:any) => ({
                name: data.pokemon_name.toLowerCase().toLowerCase(),
                types: data.type,
                id: data.pokemon_id,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    data.pokemon_id
                }.png`
            }));
        } catch (err:any) {
            error.value = err.message
        }
    }

    return { pokemon, error, load }
}

// Source Johto: https://pokeapi.co/api/v2/pokemon?limit=100&offset=151
const getJohtoPokemon = () => {
    const pokemon:any= ref([])
    const error:any = ref(null)

    const load = async () => {
        try {
            const data = await fetch('/pokemon.json')
            let finalData = null
            if(!data.ok) {
                throw Error('no data available')
            }
            finalData = await data.json()
            pokemon.value = finalData.slice(153, 255).map((data:any, index:any) => ({
                name: data.pokemon_name.toLowerCase().toLowerCase(),
                types: data.type,
                id: data.pokemon_id,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    data.pokemon_id
                }.png`
            }));
        } catch (err:any) {
            error.value = err.message
            console.log(error.value)
        }
    }

    return { pokemon, error, load }
}

// Source Hoenn: https://pokeapi.co/api/v2/pokemon?limit=135&offset=251
const getHoennPokemon = () => {
    const pokemon = ref([])
    const error:any = ref(null)

    const load = async () => {
        try {
            const data = await fetch('/pokemon.json')
            let finalData = null
            if(!data.ok) {
                throw Error('no data available')
            }
            finalData = await data.json()
            pokemon.value = finalData.slice(255, 393).map((data:any, index:any) => ({
                name: data.pokemon_name.toLowerCase(),
                types: data.type,
                id: data.pokemon_id,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    data.pokemon_id
                }.png`
            }));
            
        } catch (err:any) {
            error.value = err.message
            console.log(error.value)
        }
    }

    return { pokemon, error, load }
}

// Source Hoenn: https://pokeapi.co/api/v2/pokemon?limit=135&offset=251
const getPokemon = (id:string, name:string ) => {
    const pokemon:any = ref([])
    const types = ref([])
    const typeMatchups:any = ref([])
    const weaknessesFiltered:any = ref([])
    const strengthsFiltered:any = ref([])
    const error:any = ref(null)

    const load = async () => {
        try {
            const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id ? id : name}`)
            let finalData = null
            if(!data.ok) {
                throw Error('no data available')
            }
            finalData = await data.json()
            pokemon.value = finalData
            types.value = pokemon.value.types[0].type.name
        } catch (err:any) {
            error.value = err.message
            console.log(error.value)
        }

        pokemon.value.types.map(async (type:any) => {
            const data = await fetch("https://po-go-dex.vercel.app/types.json")
            let finalData = null
    
            if(!data.ok) {
                throw Error('no data available')
            }
    
            finalData = await data.json()
    
            finalData.filter((typing:any) => {
                if(typing.name === type.type.name && !typeMatchups.value.includes(typing.name)){
                    return typeMatchups.value = [...typeMatchups.value, typing]
                }
            })

            
            if (typeMatchups.value[1]) {
                const weaknesses = typeMatchups.value[0].weaknesses.concat(typeMatchups.value[1].weaknesses)
                const strengths = typeMatchups.value[0].strengths.concat(typeMatchups.value[1].strengths)

                weaknessesFiltered.value = [...new Set(weaknesses)]
                strengthsFiltered.value = [...new Set(strengths)]
            } else {
                const weaknesses = typeMatchups.value[0].weaknesses
                const strengths = typeMatchups.value[0].strengths

                weaknessesFiltered.value = weaknesses
                strengthsFiltered.value = strengths
            }
            
        })  

    }

    return { pokemon, types, error, load, typeMatchups, strengthsFiltered, weaknessesFiltered}
}

const getPokemonMoveset = async (id:string) => {
    //https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex/id/
    const moveset:any = ref([])


        try {
            const data = await fetch(`https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex/id/${id}.json`)
            let finalData = null
            if(!data.ok) {
                throw Error('no data available')
            }
            finalData = await data.json()
            console.log(finalData)
            moveset.value = finalData
        } catch (err:any) {
            moveset.value = err.message
        }

    

    return {moveset}

}

export { getAllPokemon, getKantoPokemon, getJohtoPokemon, getHoennPokemon, getPokemon, getPokemonMoveset }