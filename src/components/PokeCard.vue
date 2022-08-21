<template >
  <router-link v-bind:to="'/pokemon/' + title + '/' + number">
    <div class="card" :style="'background-color:' + typeColor(types[0].toLowerCase()) + ';'">
        <div class="card-title">
            <p>#{{ number }}</p>
            <h3>{{ title.toUpperCase() }}</h3>  

            <div class="typings">
                <div class="type" v-for="type in types" :key="type">
                    <img :src="'/' + type.toLowerCase()  + '.svg'"/>
                </div>
            </div>  
        </div>

        <div class="card-img">
            <img :src="img" alt="" />
        </div>
    </div>
  </router-link>
</template>

<script>
export default {
    props: ['img', 'title', 'number', 'types'],

    setup(props) {
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
* {
    margin: 0;
}
    .card {
        padding: 10px 0px 0px 10px;
        display: flex;
        height: 110px;
        max-height: 110px;
        min-width: 80vw;
        width: inherit;
        border-radius: 6px;
        box-shadow: 1px 3px 12px 0 rgba(0, 0, 0, 0.3);
        transition: all ease 0.5s;
        position: relative;
        justify-content: space-between;
    }

    .card:hover {
        transform: scale(1.05);
        border: none;
        border-radius: 7px;
        box-shadow: 2px 2px 5px rgb(111, 111, 111);
    }

    .card:hover img {
        filter: grayscale(0%);
        top: -40px;
    }

    .card {
        background-image: url('../../public/pokeballt.svg');
        background-repeat: no-repeat;
        background-position: 55vw 0px;
        background-size: 50%;
    }

     @media screen and (min-width: 630px) {
        .card {
            min-width: 250px;
            background-image: url('../../public/pokeballt.svg');
            background-repeat: no-repeat;
            background-position: 150px -10px;
            background-size: 70%;
        }
    }

    .card-img img {
        filter: grayscale(100%);
        position: absolute;
        right: -20px;
        top: -50px;
        z-index: 10;
        height: 180px;
        width: 180px;
        transition: all ease 0.4s;
    }

    h3 {
        font-weight: 400;
        text-align: left;
    }

    p {
        text-align: left;
        font-weight: 700;
        font-size: 12px;
    }

    a {
        text-decoration: none;
        color: black;
        width: 100%;
    }

    .typings {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        flex-direction: row;
        margin-top: 10px;
        gap: 10px;
    }

    .type img {
        max-width: 50px;
        display: flex;
        margin-right: auto;
    }
</style>