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
              <v-list ref="chat" class="logs">
                <div
                  v-for="(item, index) in chat"
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
export default {
  name: 'Chat',
  components: {},
  data() {
    return {
      chat: [],
      msg: null,
    };
  },
  methods: {
    send() {
      if (this.msg !== null && this.msg !== '') {
        this.chat.push({
          from: 'user',
          msg: this.msg,
        });
        this.msg = null;
        this.addReply();
      }
    },
    addReply() {
      this.chat.push({
        from: "user's name gpoes here",
        msg: 'some respond text',
      });
    },
  },
  watch: {
    logs() {
      setTimeout(() => {
        this.$refs.chat.$el.scrollTop = this.$refs.chat.$el.scrollHeight;
      }, 0);
    },
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
