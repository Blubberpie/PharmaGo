<template>
  <div v-if="roomID">
    <v-container fluid fill-height>
      <v-layout>
        <v-flex xs12 sm9>
          <v-card justify="left" height="700px">
            <v-toolbar dark color="primary darken-1">
              <v-toolbar-title>Chat {{ username }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="secondary" @click="createPrescription">Create Prescription Form </v-btn>
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
    async getOthersID() {
      let membersID = {};
      await firebase
        .database()
        .ref(`messages/chatRooms/${this.roomID}/membersID`)
        .once('value')
        .then((snapshot) => {
          const obj = snapshot.val();
          membersID = Object.values(obj);
        });
      const id = membersID.filter((member) => member !== this.uid)[0];
      return id;
    },
    async createPrescription() {
      const otherId = await this.getOthersID();
      console.log(this.uid, otherId);
      // this.$router.push({ name: 'chat', params: { uid } });
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
      uid: (state) => state.auth.uid,
    }),
  },
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
