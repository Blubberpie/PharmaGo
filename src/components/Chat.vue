<template>
  <div>
    <v-container fluid fill-height>
      <v-layout>
        <v-flex xs12 sm9>
          <v-card justify="left" height="700px">
            <v-toolbar dark color="primary darken-1">
              <v-toolbar-title>Chat</v-toolbar-title>
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
      username: '',
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
        text: this.showMessage,
        username: this.name,
      };
      firebase
        .database()
        .ref('messages')
        .push(message);
      this.showMessage = '';
    },
  },
  mounted() {
    const viewMessage = this;
    const itemsRef = firebase.database().ref('messages');
    itemsRef.on('value', (snapshot) => {
      const data = snapshot.val();
      const messages = [];
      Object.keys(data).forEach((key) => {
        messages.push({
          id: key,
          username: data[key].username,
          text: data[key].text,
        });
      });
      viewMessage.messages = messages;
    });
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
