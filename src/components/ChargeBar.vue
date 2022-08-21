<template>
    <div class="moveBar" v-if="energy <= -51">
        <div class="bar-full" v-bind:style="'background:' + typeColor(type) + ';'"></div>
    </div>

    <div class="moveBar" v-if="energy >= -50 && energy < -35">
        <div class="bar-half" v-bind:style="'background:' + typeColor(type) + ';'"></div>
        <div class="bar-half" v-bind:style="'background:' + typeColor(type) + ';'"></div>
    </div>

    <div class="moveBar" v-if="energy >= -35">
        <div class="bar-third" v-bind:style="'background:' + typeColor(type) + ';'"></div>
        <div class="bar-third" v-bind:style="'background:' + typeColor(type) + ';'"></div>
        <div class="bar-third" v-bind:style="'background:' + typeColor(type) + ';'"></div>
    </div>
</template>

<script>
export default {
    props: ['type', 'energy'],

    setup(props) {
        console.log(props.energy)
        const typeColor = (type) => {
            console.log(type)
            if (type === "bug") {
                return "#A6B91A"
            }

            if (type === "dark") {
                return "#705746"
            }

            if (type === "dragon") {
                return "#6F35FC"
            }

            if (type === "electric") {
                return "#F7D02C"
            }

            if (type === "fairy") {
                return "#D685AD"
            }

            if (type === "fighting") {
                return "#C22E28"
            }

            if (type === "fire") {
                return "#EE8130"
            }

            if (type === "flying") {
                return "#A98FF3"
            }

            if (type === "ghost") {
                return "#735797"
            }

            if (type === "grass") {
                console.log(props.title)
                return "#7AC74C"
            }

            if (type === "ground") {
                return "#E2BF65"
            }

            if (type === "ice") {
                return "#96D9D6"
            }

            if (type === "normal") {
                return "#A8A77A"
            }

            if (type === "poison") {
                return "#A33EA1"
            }

            if (type === "psychic") {
                return "#F95587"
            }

            if (type === "rock") {
                return "#B6A136"
            }

            if (type === "steel") {
                return "#B7B7CE"
            }

            if (type === "water") {
                return "#6390F0"
            }
        }

        return {typeColor}
    }
}
</script>

<style scoped>
    .moveBar {
        display: flex;
        gap: 7px;
        width: 100%;
        max-width: 100px;
    }

    .bar-full {
        height: 15px;
        width: 100%;
        transform: skew(-20deg);
    }

    .bar-half {
        height: 15px;
        width: 50%;
        transform: skew(-20deg);
    }

    .bar-third {
        height: 15px;
        width: 33%;
        transform: skew(-20deg);
    }
</style>