<template>
  <div>
    <v-container fluid fill-height>
      <v-layout>
        <v-flex xs12 sm9>
          <v-card justify="left" height="700px">
            <v-toolbar dark color="primary darken-1">
              <v-toolbar-title>Chat {{ this.uid }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-list ref="messages" class="logs">
                <div
                  v-for="(item, index) in messages"
                  :key="index"
                  :class="[
                    'd-flex flex-row align-center my-2',
                    item.from == 'user' ? 'justify-end' : null,
                  ]"
                >
                  <span v-if="item.from == 'user'" class="blue--text mr-3">{{ item.msg }}</span>
                  <v-avatar :color="item.from == 'user' ? 'indigo' : 'red'" size="36">
                    <span class="white--text">{{ item.from[0] }}</span>
                  </v-avatar>
                  <span v-if="item.from != 'user'" class="blue--text ml-3">{{ item.msg }}</span>
                </div>
              </v-list>
            </v-card-text>
            <v-spacer></v-spacer>
            <v-card-actions class="card-actions">
              <v-text-field v-model="msg" label="Message" single-line></v-text-field>
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
  data() {
    return {
      // username: '',
      name: null,
      showMessage: '',
      messages: [],
      msg: null,
    };
  },
  methods: {
    send() {
      if (this.msg !== null && this.msg !== '') {
        this.messages.push({
          from: 'user',
          msg: this.msg,
        });
        this.msg = null;
        this.addReply();
      }
    },
    addReply() {
      this.messages.push({
        from: "user's name gpoes here",
        msg: 'some respond text',
      });
    },
    sendMessage() {
      const message = {
        message: this.showMessage,
        sendBy: this.name,
        time: Date.now(),
      };
      firebase
        .database()
        .ref('messages/chatMessage')
        .push(message);
      this.showMessage = '';
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
        // console.log('chatUID already exists', id);
        return this.generateChatRoomID();
      }
      // console.log("chatUID doesn't exists", id);
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
      // async addChatRoom(id, path) {
      const hasChild = await this.childExist(`user/${this.uid}`, 'chatRooms');
      console.log(hasChild);
      if (!hasChild) {
        firebase
          .database()
          .ref(`user/${this.uid}`)
          .child('chatRooms')
          .push(await this.generateChatRoomID());
      } else {
        firebase
          .database()
          .ref(`user/${this.uid}/chatRooms`)
          .push(await this.generateChatRoomID());
      }
    },
  },
  // mounted() {
  async mounted() {
    await this.addChatRoom();
    // console.log('ads');
    //
    // const viewMessage = this;
    // const itemsRef = firebase.database().ref('messages');
    // itemsRef.on('value', (snapshot) => {
    //   const data = snapshot.val();
    //   const messages = [];
    //   Object.keys(data).forEach((key) => {
    //     messages.push({
    //       id: key,
    //       username: data[key].username,
    //       text: data[key].text,
    //     });
    //   });
    //   viewMessage.messages = messages;
    // });
  },
  watch: {
    logs() {
      setTimeout(() => {
        this.$refs.messages.$el.scrollTop = this.$refs.messages.$el.scrollHeight;
      }, 0);
    },
  },
  computed: {
    ...mapState({
      userRole: (state) => state.auth.userRole,
      username: (state) => state.auth.username,
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
