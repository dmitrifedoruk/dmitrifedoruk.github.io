//data for Vue
const data = {

    //card particulars
    tasks: [
/*        {
            content: "Chenin blanc boasts a bouquet of fresh pears, saffron, jasmine, ginger, and quince. Yeast is necessary for the fermentation of grape juice into wine. Ideal for sipping, Gewerztraminer is one of the sweeter whites. Intense hatred of wine is called oenophobia. Tomato and cherry flavors nestle comfortably together with notes of leather and clay in Sangiovese. The first stage of wine tasting is looking over the appearance of the wine. A popular but unconfirmed theory claims that Malbec is named after a Hungarian peasant who first spread the grape variety throughout France",
        },
        {
            content: "Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.",
        },*/
    ],


};


Vue.component('task-display', {
    props: ['task','index'],
    template: `<div class="taskDisplay"><p>{{task.content}}</p>
                <button class="deleteTask" @click.prevent="removeTask">Remove</button></div>`,
    methods: {
        removeTask: function () {
            this.$emit('click',  {index:this.index});
        },
    }
});

Vue.component('task-creator', {
    data: function () {
        return {
            taskContent: '',
        };
    },
    props: [],
    template: `
                <div id="taskCreator">
              <textarea id="textfield" v-model="taskContent"></textarea>
              <button id="submitTask" @click.prevent="addTask">Add</button>
              <button id="clear" @click.prevent="clearTask">Clear</button>
              </div>
    `,
    methods: {
        addTask: function () {
            if(this.taskContent != '') {
                this.$emit('click', {taskContent: this.taskContent});
            }
        },
        clearTask: function () {
            this.taskContent = '';
        }
    }
});



//work on mobile layout : done
//add clear button to textfield


//initialize variable for key value
let cardKey = 0;

//vue instance
const vm = new Vue({
    el: '#app',
    data: data,
    methods: {
        addToTasks: function (event) {
            this.tasks.push({content:event.taskContent,index:this.tasks.length})
        },
        removeFromTasks: function (event) {
            this.tasks.splice(event.index, 1);
        }
    }
});


