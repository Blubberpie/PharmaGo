<template>
  <div>
    <v-container>
      <Chat v-if="currentRoomID" :roomID="currentRoomID" :username="username" ref="chat" />
    </v-container>
    <v-container>
      <v-navigation-drawer :width="400" absolute permanent right>
        <div v-if="uid">
          <v-card class="text-center" tile>
            <v-list dense>
              <v-card-title>Customers</v-card-title>
              <v-list-item-group color="primary">
                <v-list-item v-for="(room, i) in rooms" :key="i">
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="room.member"
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
  // props: {
  //   roomID: {
  //     type: String,
  //     default: '',
  //   },
  // },
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
    };
  },
  methods: {
    setCurrentRoomID(id) {
      this.currentRoomID = id;
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
          Object.keys(val).forEach((key) => {
            rooms.push(val[key]);
          });
        });
      this.roomIDs = rooms;
      return rooms;
    },
    async getOtherRoomMember(id) {
      let members = {};
      await firebase
        .database()
        .ref(`messages/chatRooms/${id}/members`)
        .once('value')
        .then((snapshot) => {
          const obj = snapshot.val();
          members = Object.values(obj);
        });
      const otherMember = members.filter((member) => member !== this.username)[0];
      this.otherMember = otherMember;
      return otherMember;
    },
    async setAllRooms() {
      this.roomIDs = await this.getAllUsersChatRooms();
      const newID = this.$route.params.roomID;
      if (newID) {
        console.log('has params', newID);
        this.setCurrentRoomID(newID);
      } else {
        console.log('no params');
        this.setCurrentRoomID(this.roomIDs[0]);
      }
      this.roomIDs.forEach(async (roomID) => {
        const member = await this.getOtherRoomMember(roomID);
        this.rooms.push({
          member,
          id: roomID,
        });
      });
    },
    async setUsername() {
      const username = await firebase
        .database()
        .ref(`user/${this.uid}/credentials/username`)
        .once('value')
        .then((snapshot) => snapshot.val());
      this.username = username;
    },
  },
  async mounted() {
    this.uid = firebase.auth().currentUser.uid;
    await this.setUsername();
    await this.setAllRooms();
    this.roomIDs.forEach((roomID) => {
      firebase
        .database()
        .ref(`messages/chatRooms/${roomID}/messages`)
        .on('value', () => {
          // console.log(`theres an update in room: ${roomID}`, dataSnapshot.val());
          this.$refs.chat.listAllMessages();
        });
    });
  },
  computed: {
    ...mapState({
      // uid: (state) => state.auth.uid,
    }),
  },
  watch: {},
  updated() {},
};
</script>

<style>
.card {
  justify-content: center;
}
</style>
