<template>
  <div>
    <h1>This is an Chat page</h1>
    <v-container>
      <Chat></Chat>
      <v-navigation-drawer :width="400" absolute permanent right>
        <v-sheet>
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
        </v-sheet>
      </v-navigation-drawer>
    </v-container>
  </div>
</template>

<script>
import Chat from '../components/Chat.vue';

export default {
  name: 'ChatPage',
  components: {
    Chat,
  },
};
</script>

<style></style>
