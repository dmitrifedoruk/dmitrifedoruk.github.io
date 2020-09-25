//data for Vue
const data = {

    //card particulars
    cards: [
        {
            cardType: "worf",
            cardImage: "worf.png",
            cardName: "Lieutenant Worf",
            cardQuote: "\"Good tea. Nice House.\"",
            cardDescription: "Prune Juice -> Warrior's Drink +1",
        },
        {
            cardType: "drCrusher",
            cardImage: "dr-crusher.png",
            cardName: "Dr. Beverly Crusher",
            cardQuote: "\"Where are the calluses we doctors are supposed to grow over our feelings?\"",
            cardDescription: "Hypospray +9",
        },
        {
            cardType: "laForge",
            cardImage: "laforge2.png",
            cardName: "Lieutenant Geordi La Forge",
            cardQuote: "\"You know, I've always thought technology could solve almost any problem ... But sometimes you just have to turn it all off.\"",
            cardDescription: "Visor +4",
        },
        {
            cardType: "data",
            cardImage: "data_transparent2_color.png",
            cardName: "Data",
            cardQuote: "\"I assure you, commander, the cards have been sufficiently randomized.\"",
            cardDescription: "Android +2",
        },
        {
            cardType: "picard",
            cardImage: "picard3-mod02color.png",
            cardName: "Capt. Jean-Luc Picard",
            cardQuote: "\"Tea. Earl Grey. Hot.\"",
            cardDescription: "Shakespeare +5",
        },
    ],

    //array to hold dealt cards
    commonCards: [],

    //array to hold player's cards
    handCards: [],

};



//displays deck of cards and button for reshuffle
Vue.component('card-deck', {
    data: function () {
        return data;
    },
    template: `<fieldset>
        <legend>Deck</legend>
        <div  id="cardDeck">
        <slot></slot>
        <button type="button" id="shuffle" @click="shuffle">Shuffle</button>
        </div>
        </fieldset>`,
    methods: {
        shuffle: function () {
            this.cards.sort(function () {
                return 0.5 - Math.random()
            });
        },
    }
});


Vue.component('common-area', {
    template: `<fieldset>
        <legend>Common Area</legend>
        <div id="commonArea">
        <slot></slot>
        </div>
        </fieldset>`
});

Vue.component('player-hand', {
    template: `<fieldset>
        <legend>Hand</legend>
        <div id="playerHand">
        <slot></slot>
        </div>
        </fieldset>`
});


//shows cards and adds event listeners
Vue.component('card-display', {
    data: function () {
        return data;
    },
    props: ['card','index'],
    template: `<div class="cardContainer" :class=card.cardType>
                <div class="card appear" :class=card.cardType>
                    <div class="art"><img :src=card.cardImage :class=card.cardType></div>
                    <div class="description"><h4>{{card.cardName}}</h4>
                        <p class="quote">{{card.cardQuote}}</p>
                        <p class="stats">{{card.cardDescription}}</p></div>
                </div>
                <div class="cardOverlay" :id=card.cardType :class=card.cardType @click="cardSelect"></div>
                </div>`,
    methods: {
        cardSelect: function () {
            this.$emit('card-click',  {index:this.index});
        },
    }
});

//covers controls for selecting number of cards and adding to player hand
Vue.component('card-control', {
    data: function () {
        return {
            addCount: 1,
            };
    },
    props: ['card','index'],
    template: `<div class="cardControl">
                <slot></slot>
                <input class="countInput" type="number" min="1" v-model="addCount" />
                    <button class="addButton" @click="addToHand">Add to Hand</button>
                </div>
            `,
        methods: {
            addToHand: function(){
                this.$emit('click', {index:this.index, addCount:this.addCount});
                this.addCount = 1;
            }
        }
    }
);

//initialize variable for key value
let cardKey = 0;

//vue instance
const vm = new Vue({
    el: '.vueWrapper',
    data: data,
    methods: {
        addToPlayerHand: function(event){
                console.log(this.handCards.length,event.addCount)
                for (let i = 0; i < event.addCount; i++) {
                    if (this.handCards.length < 5) {
                        const card = this.commonCards[event.index];
                        cardKey++;
                        this.handCards.push({key: cardKey, card});
                    }
                }

        },
        removeFromPlayerHand: function(event){
            this.handCards.splice(event.index, 1);
        }
    }
});


