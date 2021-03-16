<template>
  <div v-if="roomID">
    <v-container fluid fill-height>
      <v-layout>
        <v-flex xs12 sm9>
          <v-card justify="left" height="700px">
            <v-toolbar dark color="primary darken-1">
              <v-toolbar-title>Chat {{ username }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-list class="logs">
                <div v-for="(item, index) in messages" :key="index">
                  <div v-if="item">
                    <div
                      :class="[
                        'd-flex flex-row align-center my-2',
                        item.from == username ? 'justify-end' : null,
                      ]"
                    >
                      <span v-if="item.from == username" class="blue--text mr-3">{{
                        item.text
                      }}</span>
                      <v-avatar :color="item.from == username ? 'indigo' : 'red'" size="36">
                        <!-- <span class="white--text">{{ item.from }}</span> -->
                      </v-avatar>
                      <span v-if="item.from != username" class="blue--text ml-3">{{
                        item.text
                      }}</span>
                    </div>
                  </div>
                </div>
              </v-list>
            </v-card-text>
            <v-spacer></v-spacer>
            <v-card-actions class="card-actions">
              <v-text-field v-model="text" label="Message" single-line></v-text-field>
              <v-btn icon class="ml-4" @click="send"><v-icon>mdi-send</v-icon></v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import firebase from '../plugins/firebase';

export default {
  name: 'Chat',
  components: {},
  props: ['roomID', 'username'],
  data() {
    return {
      // roomID: '',
      name: null,
      showMessage: '',
      messages: null,
      text: null,
    };
  },
  methods: {
    send() {
      if (this.text !== null && this.text !== '') {
        const message = {
          text: this.text,
          from: this.username,
          timestamp: Date.now(),
        };
        firebase
          .database()
          .ref(`messages/chatRooms/${this.roomID}/messages`)
          .push(message);
        this.text = '';
        this.listAllMessages();
      }
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
    async valueExist(path, value) {
      const snapshot = await firebase
        .database()
        .ref(path)
        .once('value');
      const userData = snapshot.val();
      return value === userData;
    },

    updateChild(path, updates) {
      firebase
        .database()
        .ref(path)
        .update(updates);
    },
    async addChatRoom() {
      // REQUIRED ANOTHER USER ID TO CREATE A CHAT ROOM
      // const otherUser = '4XulcO49PARP3PzjhZBkwOeMZYM2';
      const hasChild = await this.childExist(`user/${this.uid}`, 'chatRooms');
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
      firebase
        .database()
        .ref('messages/chatRooms/')
        .child(roomID)
        .child('members')
        .update({ member1: this.username, member2: 'guy3' }); // add members
      firebase
        .database()
        .ref(`messages/chatRooms/${roomID}`)
        .child('messages')
        .child('message')
        .push({
          from: this.username,
          text: 'This text is used to initialized firebase child',
          timestamp: Date.now(),
        }); // add messages
    },
    async listAllMessages() {
      const messages = [];
      const val = await firebase
        .database()
        .ref(`messages/chatRooms/${this.roomID}/messages`)
        .orderByChild('timestamp')
        .once('value')
        .then((snapshot) => snapshot.val());
      Object.keys(val).forEach((key) => {
        messages.push(val[key]);
      });
      this.messages = messages;
    },
  },
  // mounted() {
  async mounted() {
    await this.listAllMessages();
  },
  watch: {
    roomID() {
      this.listAllMessages();
    },
  },
  computed: {
    ...mapState({
      // userRole: (state) => state.auth.userRole,
      // username: (state) => state.auth.username,
      // uid: (state) => state.auth.uid,
    }),
  },
  created() {},
};
</script>

<style scoped>
.card-actions {
  flex: 1;
  position: absolute;
  bottom: 10px;
  width: 100%;
}
.logs {
  height: 500px;
  overflow: auto;
}
</style>
