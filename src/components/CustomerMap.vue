<template>
  <div>
    <v-container>
      <GoogleMap :places="pharmacies" @handleMarkerClick="showPharmacyInfo" />
      <v-navigation-drawer v-model="drawer" :width="400" absolute bottom temporary right>
        <v-sheet>
          <h1 align="center" style="margin: 25px">{{ currentPharmacyName }}</h1>
          <p align="center" style="margin: 25px">{{ currentPharmacyDescription }}</p>
          <v-row justify="center">
            <v-btn color="secondary" @click="createChatRoom">
              Chat
            </v-btn>
          </v-row>
        </v-sheet>
      </v-navigation-drawer>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import firebase from 'firebase/app';
import 'firebase/database';
import GoogleMap from './GoogleMap.vue';

const database = firebase.database();

export default {
  name: 'CustomerMap',
  components: {
    GoogleMap,
  },
  data() {
    return {
      pharmacies: {},
      currentPharmacyId: '',
      currentPharmacyName: '',
      currentPharmacyDescription: '',
      drawer: false,
    };
  },
  created() {
    this.setPharmacies();
  },
  methods: {
    setPharmacies() {
      const pharmaciesRef = database.ref('/registered-pharmacies');
      pharmaciesRef.on('value', (pharmaciesSnap) => {
        const pharms = {};
        pharmaciesSnap.forEach((pharmacy) => {
          pharms[pharmacy.key] = pharmacy.val();
        });
        this.pharmacies = pharms;
      });
    },
    async showPharmacyInfo(key, pharmacy) {
      this.currentPharmacyId = key;
      this.currentPharmacyName = pharmacy.name;
      this.currentPharmacyDescription = pharmacy.description;
      this.drawer = true;
    },
    async getPharmacyUserId(key) {
      const id = await database
        .ref(`registered-pharmacies/${key}/owner`)
        .once('value')
        .then((snapshot) => snapshot.val());
      return id;
    },
    async generateChatRoomID() {
      const getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
      const generate = function () {
        const length = 8;
        const timestamp = +new Date();
        const ts = timestamp.toString();
        const parts = ts.split('').reverse();
        let id = '';
        for (let i = 0; i < length; i += 1) {
          const index = getRandomInt(0, parts.length - 1);
          id += parts[index];
        }
        return id;
      };

      const id = generate();
      const hasDup = await this.childExist('messages/chatUID', id);
      if (hasDup) {
        return this.generateChatRoomID();
      }
      return id;
    },
    async childExist(path, child) {
      const snapshot = await firebase
        .database()
        .ref(path)
        .once('value');
      const hasChild = snapshot.hasChild(child);
      return hasChild;
    },
    async createChatRoom() {
      // REQUIRED ANOTHER USER ID TO CREATE A CHAT ROOM pharmacyId
      const pharmacyId = await this.getPharmacyUserId(this.currentPharmacyId);
      let hasChild = await this.childExist(`user/${this.uid}`, 'chatRooms');
      // console.log(hasChild);
      const roomID = await this.generateChatRoomID();
      // this.roomID = roomID;
      if (!hasChild) {
        firebase
          .database()
          .ref(`user/${this.uid}`)
          .child('chatRooms')
          .push(roomID); // add to
      } else {
        firebase
          .database()
          .ref(`user/${this.uid}/chatRooms`)
          .push(roomID);
      }
      hasChild = await this.childExist(`user/${pharmacyId}`, 'chatRooms');
      if (!hasChild) {
        firebase
          .database()
          .ref(`user/${pharmacyId}`)
          .child('chatRooms')
          .push(roomID); // add to
      } else {
        firebase
          .database()
          .ref(`user/${pharmacyId}/chatRooms`)
          .push(roomID);
      }
      firebase
        .database()
        .ref('messages/chatRooms/')
        .child(roomID)
        .child('members')
        .update({ member1: this.username, member2: this.currentPharmacyName });
      firebase
        .database()
        .ref(`messages/chatRooms/${roomID}`)
        .child('membersID')
        .update({ memberId1: this.uid, memberId2: pharmacyId });
      firebase
        .database()
        .ref(`messages/chatRooms/${roomID}`)
        .child('messages')
        .push({
          from: this.username,
          text: 'This message is send by the system. Start your conversation here!',
          timestamp: Date.now(),
        }); // add messages
      this.$router.push({ name: 'chat', params: { roomID } });
    },
  },
  computed: {
    ...mapState({
      uid: (state) => state.auth.uid,
      username: (state) => state.auth.username,
    }),
  },
};
</script>

<style scoped>
.card {
  padding: 10px;
  flex: 1;
  /* border-radius: 20px; */
}
</style>
