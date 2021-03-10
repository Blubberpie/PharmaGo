<template>
    <v-app class=''>
        <v-container class=''>
            <v-layout row align-center justify-center class='mt-8'>
                <v-flex class='' height=''>
                    <v-card rippled class='flexcard white mx-auto' elevation="3"
           rounded="lg">
                    <v-card flat style="overflow:hidden;" class='teal lighten-5' rounded="lg">
                        <v-row class='mx-0 my-0'
                        justify="center" align="center" style="overflow:hidden;">
                        <v-col cols='3'>
                            <v-img class='ml-5'
                            max-height="150"
                            max-width="150"
                            src="https://i.pinimg.com/originals/8b/94/0c/8b940c908705e3fb2644ffc12418eefb.png"
                            ></v-img>
                        </v-col>
                                 <!-- <v-flex class='ma-10 red'> -->
                                     <v-col class=' mb-5' align-self="center">
                                     <v-card class='' flat rounded="lg" max-width="600"
                                     max-height="80"
                                     >
                                        <v-flex class='ma-10'  justify-center>
                                 <v-row >
                                     <v-col cols='8' class=''>
                                 <v-text-field flat solo prepend-inner-icon="mdi-account-search"
                                 label="Job title" class='mx-auto mt-1'
                                  ></v-text-field></v-col>
                                  <v-divider  class="mb-6"
  vertical
></v-divider>
                                <v-col cols='3' class=' mb-6'>
                                      <!-- <v-card-actions> -->
                                  <v-btn x-large depressed class='white--text ml-8
                                   teal lighten-2'>search</v-btn>
                                      <!-- </v-card-actions> -->
                                  </v-col>
                                 </v-row>
                                        </v-flex>
                                     </v-card>
                                 <!-- </v-flex> -->
                            <!-- <h2 class='text-center'>hi</h2>
                            <p>hi</p>
                            <p>hi</p> -->
                             </v-col>
                        </v-row>
                    </v-card>
                        <v-row class='mx-0 my-0' style="overflow:hidden;">
                            <v-col cols='3'>
                            <h3 class='grey--text text--darken-2'>Preference</h3>
                            </v-col>
                            <v-col cols='9'>
                              <p  class='grey--text text--darken-2'>Sort by </p>
                              <v-card flat v-for="(task) in tasks" :key="task.description"
                               class='mt-3'>
                                <!-- <v-divider ></v-divider> -->
                                <v-row align="center" justify="center">
                                  <v-col cols='3' class='' align-self="">
                                    <v-layout align-center justify-center>
                                    <v-img class=''
                            max-height="50"
                            max-width="50"
                            :src="task.logo"
                            ></v-img>
                                    </v-layout>
                                  </v-col>
                                  <v-col cols='5' class=''>
                                    <h3 class='grey--text text--darken-2'>{{task.pharmacy}}</h3>
                                    <p class='grey--text text--darken-2'>{{task.description}}</p>
                                  </v-col>
                                  <v-col cols='2'>
                                    <h4 class='grey--text text--darken-2'>Estimated time
                                    </h4>
                                    <p class='grey--text text--darken-2'>{{task.time}}</p>
                                  </v-col>
                                  <v-col cols='2'>
                                    <div id="chips-container">
                                    <v-chip :class="task.status" class="
                                     white--text caption my-2`">{{task.status}}</v-chip>
                                    </div>
                                    <!-- <h4 class='grey--text text--darken-2'>Status</h4> -->
                                    <!-- <p class='grey--text text--darken-2'>
                                      {{task.status}}</p> -->
                                  </v-col>
                                  <!-- <v-divider></v-divider> -->
                                </v-row>
                                <v-divider></v-divider>
                              </v-card>
                              <!-- <v-divider></v-divider> -->
                            <!-- <p>hi</p>
                            <p>hi</p> -->
                            </v-col>
                        </v-row>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>
<script>
// import { defineComponent } from '@vue/composition-api'

export default {
  data() {
    return {
      tasks: [
        {
          logo: 'https://i.pinimg.com/originals/8b/94/0c/8b940c908705e3fb2644ffc12418eefb.png',
          pharmacy: 'A Pharmacy',
          description: 'description : ...',
          time: '30 mins',
          status: 'available',
        },
        {
          logo: 'https://i.pinimg.com/originals/8b/94/0c/8b940c908705e3fb2644ffc12418eefb.png',
          pharmacy: 'B Pharmacy',
          description: 'description : ...',
          time: '15 mins',
          status: 'taken',
        },
        {
          logo: 'https://i.pinimg.com/originals/8b/94/0c/8b940c908705e3fb2644ffc12418eefb.png',
          pharmacy: 'C Pharmacy',
          description: 'description : ...',
          time: '45 mins',
          status: 'taken',
        },
      ],
    };
  },
};
</script>

<style>
.task.available {
  border-left: 4px solid rgb(24, 214, 24);
}
.task.taken {
  border-left: 4px solid red;
}
#chips-container .v-chip.available {
  background: rgb(108, 219, 108);
}
#chips-container .v-chip.taken {
  background: rgba(192, 12, 12, 0.753);
}
</style>
