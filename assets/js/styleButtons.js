// Optional config for enable devtools
Vue.config.devtools = true;

Vue.component('character', {
  /* props: {
    person: {
      type: Object,
      required: true
    }
  }, */
  props: ['person'],
  template: `<div class="card">
    <div class="card-body">
        <h5 class="card-title">{{person.name}}</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <button class="btn btn-primary" @click="pressButton(person.name)">Press me!</button>
    </div>
  </div>`,
  methods: {
    pressButton: function (name) {
      //console.log(name);
      this.$emit('myname', name);
    }
  }
});

// Vue instance
var app = new Vue({
  el: '#app',
  data: {
    numberCharacters: 0,
    characters: [],
    show: true,
    name: '',
    newName: ''
  },
  created: function () {
    axios.get('https://swapi.co/api/people').then(function (response) {
      app.numberCharacters = response.data.count;
      app.characters = response.data.results;
    }).catch(function (err) {
      console.error(err);
    });
  },
  methods: {
    showMyName: function (name) {
      console.log(name);
      //app.name = name;
    },
    addCharacter: function () {
      var newName = app.newName;
      app.characters.push({
        name: newName
      });
      app.newName = '';
    }
  }
});
