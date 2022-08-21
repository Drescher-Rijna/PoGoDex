<template>
    <div id="wrap">
        <div class="sprites">
            <table class="anatomy">
                <tr>
                    <td>Height: {{pokemon.height/10}}m</td>
                </tr>
                <tr>
                    <td>Weight: {{pokemon.weight/10}}kg</td>
                </tr>
            </table>
            <!-- Normal -->
            <div class="sprites_img">
                <img v-if="!normalShown && pokemon.sprites.front_shiny" v-bind:src="pokemon.sprites.front_shiny" alt="" />
                <img v-if="normalShown && pokemon.sprites.front_default" v-bind:src="pokemon.sprites.front_default" alt="">
            </div>
            
            <div class="buttons_sprites">
                <button class="sprite_change" @click="() => {normalShown = true}">Normal</button>
                <button v-if="pokemon.sprites.front_shiny" class="sprite_change" @click="() => {normalShown = false}">Shiny</button>
            </div>
        </div>

        <h1>{{pokemon.name.toUpperCase()}}</h1>
        <div class="typings">
            <div v-for="types in pokemon.types" :key="types.slot">
                <div class="type">
                    <img :src="'/' + types.type.name  + '.svg'"/>
                </div>
            </div>
        </div>

        <div class="stats">
            <div v-for="stats in pokemon.stats" :key="stats.stat.name">
                <div class="stat">
                    <p class="statname">{{stats.stat.name.toUpperCase()}}</p>
                    <p class="statnumber">{{stats.base_stat}}</p>
                </div>
            </div>
        </div>

        <div class="resistance">
            <div class="resistances">
                 <h3>Strong against</h3>
                <div class="types_resistance">
                    <div  v-for="strengths in strengthsFiltered" :key="strengths">
                        <img v-bind:src="'/' + strengths  + '.svg'"/>
                    </div>
                </div>
            </div>
            

            <div class="resistances">
                <h3>Weak against</h3>
                <div class="types_resistance">
                    <div v-for="weakness in weaknessesFiltered" :key="weakness">
                        <img v-bind:src="'/' + weakness  + '.svg'"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="pokemon_moves">
            <div>
                <h3>Fast moves</h3>
                <div class="moves">
                    <div v-for="fastMove in moveset.fastMoves" :key="fastMove">
                        <img class="type_img" :src="'/' + fastMove.type.names.English.toLowerCase()  + '.svg'"/>
                        <span class="attack_name">{{fastMove.id.replace(/_FAST/g, '').replace(/_/g, '_')}}</span>
                        <span class="power">{{fastMove.power}}</span>
                    </div>
                    <div v-for="fastMove in moveset.eliteFastMoves" :key="fastMove">
                        <img class="type_img" :src="'/' + fastMove.type.names.English.toLowerCase()  + '.svg'"/>
                        <span class="attack_name">{{fastMove.id.replace(/_FAST/g, '').replace(/_/g, '_')}}*</span>
                        <span class="power">{{fastMove.power}}</span>
                    </div>
                </div>
            </div>

            <div>
                <h3>Charge moves</h3>
                <div class="moves">
                    <div v-for="chargeMove in moveset.chargeMoves" :key="chargeMove">
                        <img class="type_img" :src="'/' + chargeMove.type.names.English.toLowerCase()  + '.svg'"/>
                        <span class="attack_name">{{chargeMove.id.replace(/_/g, '_')}}</span>
                        <MoveChargeBar :energy="chargeMove.energy" :type="chargeMove.type.names.English.toLowerCase()" />
                        <span class="power">{{chargeMove.power}}</span>
                    </div>
                    <div v-for="chargeMove in moveset.eliteChargeMoves" :key="chargeMove">
                        <img class="type_img" :src="'/' + chargeMove.type.names.English.toLowerCase()  + '.svg'"/>
                        <span class="attack_name">{{chargeMove.id.replace(/_/g, '_')}}*</span>
                        <MoveChargeBar :energy="chargeMove.energy" :type="chargeMove.type.names.English.toLowerCase()" />
                        <span class="power">{{chargeMove.power}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getPokemon } from '@/services/pokemonDb'
import { useRoute } from 'vue-router'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import MoveChargeBar from '../components/ChargeBar.vue'


export default {
    name: 'pokemonDetail',
    components: { MoveChargeBar }, 

    setup() {
        const route = useRoute()
        const id = route.params.id;
        const moveset = ref([])

        const { pokemon, error, load, typeMatchups, weaknessesFiltered, strengthsFiltered } = getPokemon(id, null);
        
        const normalShown = ref(true);

        load()

        onMounted(async () => {
            console.log('dd')
            const data = await fetch(`https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex/id/${id}.json`)

            let finalData = null

            if(!data.ok) {
                throw Error('no data available')
            }

            finalData = await data.json()
          
            moveset.value = ({
                fastMoves: finalData.quickMoves,
                chargeMoves: finalData.cinematicMoves,
                eliteFastMoves: finalData.eliteQuickMoves,
                eliteChargeMoves: finalData.eliteCinematicMoves,
            })
            console.log(moveset)
        })

        return { pokemon, error, normalShown, typeMatchups, weaknessesFiltered, strengthsFiltered, moveset }
    }
}
</script>

<style scoped>
    #wrap {
        margin: 0 20px;
        padding-bottom: 50px;
    }

    .typings {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: 15px;
    }
    
    .type {
        margin: 0 10px;
        padding: 5px 25px;
        min-width: 50px;
        border-radius: 25px;
        color: white;
    }

    .type_img {
        width: 50px;
    }

    img {
        width: 100%;
        max-width: 200px;
    }

    .stats {
        margin: auto;
        margin-top: 30px;
        max-width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        row-gap: 20px;
        column-gap: 20px;
    }

    .anatomy {
        grid-area: anatomy;
    }

    .sprites_img {
        grid-area: spriteimg;
    }

    .buttons_sprites {
        grid-area: buttons;
    }

    .sprites {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-areas: "spriteimg"
                             "anatomy"
                            "buttons";
    }

    .anatomy {
        color: #333;
        max-width: fit-content;
        max-height: fit-content;
        margin: auto;
        margin-top: 20px;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    
    }

    .anatomy tr {
        margin: 0 5px;
    }

    @media only screen and (min-width: 769px) {
        .stats {
            max-width: 700px;
            grid-template-columns: 1fr 1fr 1fr;
        }

        .sprites {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-areas: ". spriteimg anatomy"
                                ". buttons .";
        }

        .anatomy {
            background: #eee;
            padding: 0;
            color: black;
            max-width: max-content;
            max-height: fit-content;
            border-radius: 5px;
            margin: auto 0;
            flex-direction: column;
            align-items: flex-start;
            
        }
        

        .anatomy tr {
            border-bottom: 1px white solid;
            width: 100%;
            padding: 5px 15px 5px 5px;
        }

    }
    

    .stat {
        background: #eee;
        padding: 10px 15px;
    }

    .stat p {
        margin: 0;
    }
    
    .statname {
        font-weight: 700;
        font-size: 0.7rem;
    }

    .statnumber {
        font-size: 1rem;
    }

    @media only screen and (min-width: 769px) {
        .statname {
            font-weight: 700;
            font-size: 1rem;
        }

        .statnumber {
            font-size: 1.25rem;
        }
    }

    .sprite_change {
        outline: none;
        border: none;
        border-radius: 25px;
        padding: 7px 12px;
        margin: 0 5px;
        cursor: pointer;
    }

    .sprite_change:hover {
        background: rgb(158, 155, 155);
    }

    .sprite_change:focus {
        background: rgb(158, 155, 155);
    }

    .sprites {
        margin-bottom: 15px;
        position: relative;

    }

    .resistance {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        margin-top: 30px;
        gap: 20px;
    }

    .resistance h3 {
        margin-bottom: 10px;
    }

    .types_resistance {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
    }

    .types_resistance img {
        max-width: 50px;
    }

    .pokemon_moves {
        display: flex;
        justify-content: space-between;
        margin-top: 50px;
        flex-direction: column;
    }

    .moves * {
        text-align: left;
    }

    .moves div {
        display: grid;
        grid-template-columns: 50px 0fr 1fr 0fr;
        column-gap: 10px;
        place-items: left;
        align-items: center;
        margin: 25px 0;
    }

    .moves div:first-child {
        margin-top: 10px;
    }

    .power {
        margin-left: auto;
        font-weight: 700;
        font-size: 0.9rem;
    }

    .attack_name {
        font-size: 0.9rem;
    }

    @media only screen and (min-width: 768px) {
        .resistance {
            display: flex;
            justify-content: space-evenly;
            margin: 0 30px;
            margin-top: 50px;
            gap: 50px;
            flex-direction: row;
        }

        .resistance .resistances {
            flex-basis: 50%;
        }

        .types_resistance {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            max-width: 300px;
        }

        .types_resistance img {
            max-width: 50px;
        }

        .pokemon_moves {
            flex-direction: row;
            margin: 0 30px;
            gap: 50px;
            margin-top: 50px;
        }

        .pokemon_moves div {
            flex-basis: 50%;
        }

        #wrap {
            max-width: 768px;
            margin: auto;
        }
    }

    h3 {
        margin: 0;
    }
</style>