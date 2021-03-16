<template>
  <div>
    <v-container>
      <Chat v-if="currentRoomID" :roomID="currentRoomID" :username="username" ref="chat" />
    </v-container>
    <v-container>
      <v-navigation-drawer :width="400" absolute permanent right>
        <!-- <v-sheet>
          <h1 align="center" style="margin: 25px">Pharmacy name</h1>
          <p align="center" style="margin: 25px">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum
          </p>
          <v-row justify="center">
            <v-btn color="secondary">
              Chat
            </v-btn>
            <v-btn color="primary">
              Info
            </v-btn>
          </v-row>
        </v-sheet> -->
        <div v-if="uid">
          <v-card class="text-center" tile>
            <v-list dense>
              <v-card-title>Customers</v-card-title>
              <v-list-item-group color="primary">
                <v-list-item v-for="(room, i) in rooms" :key="i">
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="room.member + ': ' + room.id"
                      @click="setCurrentRoomID(room.id)"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </div>
      </v-navigation-drawer>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Chat from '../components/Chat.vue';
import firebase from '../plugins/firebase';

export default {
  name: 'ChatPage',
  components: {
    Chat,
  },
  data() {
    return {
      rooms: [],
      otherMember: '',
      roomIDs: [],
      uid: '',
      currentRoomID: '',
      username: '',
      // obj: {}
    };
  },
  methods: {
    setCurrentRoomID(id) {
      this.currentRoomID = id;
      console.log(id);
    },
    async getAllUsersChatRooms() {
      const rooms = [];
      let val = {};
      await firebase
        .database()
        .ref(`user/${this.uid}/chatRooms`)
        .once('value')
        .then((snapshot) => {
          val = snapshot.val();
          // console.log(this.uid, val, snapshot);
          Object.keys(val).forEach((key) => {
            rooms.push(val[key]);
          });
        });
      // console.log(rooms);
      this.roomIDs = rooms;
      return rooms;
    },
    async getOtherRoomMember(id) {
      let members = {};
      await firebase
        .database()
        .ref(`messages/chatRooms/${id}/members`)
        // .limitToLast(2)
        .once('value')
        .then((snapshot) => {
          const obj = snapshot.val();
          // console.log(obj);
          members = Object.values(obj);
        });
      const otherMember = members.filter((member) => member !== id)[0];
      // console.log(otherMember);
      this.otherMember = otherMember;
      return otherMember;
    },
    async setAllRooms() {
      this.roomIDs = await this.getAllUsersChatRooms();
      this.setCurrentRoomID(this.roomIDs[0]);
      this.roomIDs.forEach(async (roomID) => {
        // console.log(roomID);
        this.member = await this.getOtherRoomMember(roomID);
        this.rooms.push({
          member: this.member,
          id: roomID,
        });
      });
    },
    async setUsername() {
      const username = await firebase
        .database()
        .ref(`user/${this.uid}/credentials/username`)
        // .limitToLast(2)
        .once('value')
        .then((snapshot) => snapshot.val());
      // const messages = ref.orderke
      // const messages = snapshot.val();
      // messages.forEach((key) => console.log(key));
      this.username = username;
      // console.log(username);
    },
  },
  async mounted() {
    this.uid = firebase.auth().currentUser.uid;
    await this.setAllRooms();
    await this.setUsername();
    console.log(this.username);
    this.roomIDs.forEach((roomID) => {
      console.log(`For: ${roomID}`);
      // console.log
      firebase
        .database()
        .ref(`messages/chatRooms/${roomID}/messages`)
        .on('value', (dataSnapshot) => {
          console.log(`theres an update in room: ${roomID}`, dataSnapshot.val());
          this.$refs.chat.listAllMessages();
        });
    });
    // console.log(this.rooms[0]);
  },
  computed: {
    ...mapState({
      // uid: (state) => state.auth.uid,
    }),
  },
  watch: {},
  updated() {
    // this.setAllRooms();
  },
};
</script>

<style>
.card {
  justify-content: center;
}
</style>
