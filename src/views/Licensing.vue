<template>
  <v-container fluid class="align-center">
    <h1 class="text-h6 text-sm-h4 mb-6">Congratulations for finding this beat!</h1>
    <small class="green--text custBeat" v-if="selectedBeat">{{ selectedBeat.label }}</small
    ><v-icon color="green">mdi-music</v-icon>
    <v-row class="align-center mt-6">
      <v-col cols="12" sm="5">
        <v-select
          v-model="license"
          :items="licenses"
          flat
          hide-details
          label="Please choose a license"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="4" class="ml-10">
        <v-btn color="success" :disabled="license === ''" class="mt-4" to="/">Continue</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import instrumentals from '../db'
export default {
  name: 'Licensing',
  data() {
    return {
      selectedBeat: null,
      licenses: ['Single Use', 'Non Exclusive License', 'Exclusive License'],
      license: ''
    }
  },
  mounted() {
    const id = this.$route.params.id
    const beat = instrumentals.find(item => item.id === +id)
    this.selectedBeat = beat
  }
}
</script>
