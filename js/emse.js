// /var/www/html/sites/emse/js/emse.js

//const heroku_url_api = "https://thawing-journey-78988.herokuapp.com/api/rooms";
const spring_url_api = "http://faircorp-application.cleverapps.io/api";
//const proxyurl = "https://cors-anywhere.herokuapp.com/";
//const spring_url_api = "http://localhost:8080/api";

/*var vm_buildings = new Vue({
  el:  "#appBuildings",
  data: {
    buildings: []
  },
  mounted() {
      let get_url = spring_url_api + "/buildings"
      axios.get(get_url)
           .then(response => {this.buildings = response.data});
  }
})

var vm_rooms = new Vue({
  el:  "#appRooms",
  data: {
    rooms: []
  },
  mounted() {
      let get_url = spring_url_api + "/rooms"
      axios.get(get_url)
           .then(response => {this.rooms = response.data});
  }
})

var vm_lights = new Vue({
  el:  "#appLights",
  data: {
    lights: [],
    selectedLight: 0
  },
  mounted() {
      let get_url = spring_url_api + "/lights"
      axios.get(get_url)
           .then(response => {this.lights = response.data});
  },
  methods: {
          // /api/lights/{light_id}/switch switch the light
          switchLight(light) {
              let put_url = spring_url_api + "/lights/" + light.id + "/switch"
              // use axios to put and have the feedback
              axios.put(put_url)
                   .then(response => {this.lights = response.data});



              },

  }
})

*/
//appel fetch
var vm_buildings = new Vue({
    el:  "#appBuildings",
    data: {
      buildings: []
    },
    created() {
      let get_url = spring_url_api + "/buildings"
      fetch(get_url)
      .then(response => response.json())
      .then(json => {
        this.buildings = json
      })
    }
})

var vm_rooms = new Vue({
    el:  "#appRooms",
    data: {
      rooms: [],
      selectedRoomName: '',
      selectedRoomFloor: '',
      selectedBuilding: '',
      buildings: []
    },
    created() {
      let get_url = spring_url_api + "/rooms"
      fetch(get_url)
      .then(response => response.json())
      .then(json => {
        this.rooms = json
      })
      let get_url_building = spring_url_api + "/buildings"
      fetch(get_url_building)
      .then(response => response.json())
      .then(json => {
        this.buildings = json
      })
    },
    methods: {
          // /api/lights/{light_id}/switch switch the light
            switchRoom: function (room) {

              console.log('Going to switch room !')
              let put_url = spring_url_api + "/rooms/" + room.id + "/switchLight"
              fetch(put_url, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
              //mode: "cors", // no-cors, cors, *same-origin
                headers: {
                  'Content-Type': 'application/json',
                  // "Content-Type": "application/x-www-form-urlencoded",
                },
              }).then(response => response.json());
            },

            addRoom: function () {
              let post_url = spring_url_api + "/rooms";
              let data = {
                "name": this.selectedRoomName,
                "floor": this.selectedRoomFloor,
                "buildingId": this.selectedBuilding
              };

              fetch(post_url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                    // "Content-Type": "application/x-www-form-urlencoded",
                  },
                body: JSON.stringify(data)
                }).then(response => response.json())
                  .then(json => {this.rooms.push(json)});
            },
            deleteRoom: function (room) {
              let delete_url = spring_url_api + "/rooms/" + room.id;
              fetch(delete_url, {
                method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                  }
                }).then(this.rooms.splice(this.rooms.indexOf(room), 1));
            },
          },
})

var vm_lights = new Vue({
    el:  "#appLights",
    data: {
      lights: [],
      selectedRoom:'',
      selectedLightLevel:'',
      selectedLightStatus:'',
      rooms: []
    },
    created() {
      let get_url = spring_url_api + "/lights"
      fetch(get_url)
      .then(response => response.json())
      .then(json => {
        this.lights = json
      })
      let get_url_room = spring_url_api + "/rooms"
      fetch(get_url_room)
      .then(response => response.json())
      .then(json => {
        this.rooms = json
      })
    },
    methods: {
          // /api/lights/{light_id}/switch switch the light
            switchLight: function (light) {

              console.log('Hello' + light.status)
              let put_url = spring_url_api + "/lights/" + light.id + "/switch"
              //let put_url = spring_url_api + "/lights"
              // use fetch to put and have the feedback
              fetch(put_url, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
              //mode: "cors", // no-cors, cors, *same-origin
                headers: {
                  'Content-Type': 'application/json',
                  // "Content-Type": "application/x-www-form-urlencoded",
                },
              }).then(response => response.json())
                .then(json => {light.status = json.status});
            },

            addLight: function () {
              let post_url = spring_url_api + "/lights";
              let data = {
              	"level": this.selectedLightLevel,
              	"status": this.selectedLightStatus,
              	"roomId": this.selectedRoom
              };

              fetch(post_url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                    // "Content-Type": "application/x-www-form-urlencoded",
                  },
                body: JSON.stringify(data)
                }).then(response => response.json())
                  .then(json => {this.lights.push(json)});
            },
            deleteLight: function (light) {
              let delete_url = spring_url_api + "/lights/" + light.id;
              fetch(delete_url, {
                method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                  }
                }).then(this.lights.splice(this.lights.indexOf(light), 1));
            },
          },
})


// /api/lights (GET) send light list
// /api/lights (POST) add a light
// /api/lights/{light_id} (GET) read a light
// /api/lights/{light_id} (DELETE) delete a light
// /api/lights/{light_id}/switch switch the light
//
// /api/rooms (GET) send room list
// /api/rooms (POST) add a room
// /api/rooms/{room_id} (GET) read a room
// /api/rooms/{room_id} (DELETE) delete a room and all its lights
// /api/rooms/{room_id}/switchLight switch the room lights
//
// /api/buildings (GET) send buildings list
// /api/buildings (POST) add a building
// /api/buildings/{building_id} (GET) read a building
// /api/buildings/{building_id} (DELETE) delete a building and all its rooms and all its lights
