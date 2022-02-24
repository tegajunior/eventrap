<template>
  <v-container fluid class="mt-5">
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="genreSelected"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar class="green lighten-4 mb-9 pt-4" prominent dense>
          <v-row dense class="align-center py-2">
            <v-col cols="5" lg="3" md="3" class="mr-6 cusCol">
              <v-select
                v-model="genreSelected"
                :items="genres"
                flat
                hide-details
                label="Filter by Genre"
                prepend-inner-icon="mdi-filter"
              >
              </v-select>
              <v-btn
                icon
                color="red"
                v-if="genreSelected !== ''"
                class="cusBtn"
                @click="genreSelected = ''"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
            <v-col col="5" lg="3" md="3" class="cusCol">
              <v-select
                v-model="moodSelected"
                :items="moods"
                flat
                hide-details
                label="Filter by Mood"
                prepend-inner-icon="mdi-filter"
              >
              </v-select>
              <v-btn
                icon
                color="red"
                class="cusBtn"
                @click="moodSelected = ''"
                v-if="moodSelected !== ''"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select v-model="sortBy" flat hide-details :items="keys" label="Sort by" class="mt-1"></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="sortDesc" mandatory>
              <v-btn depressed color="green lighten-2" :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn depressed color="green lighten-2" :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row dense class="green lighten-2">
          <v-col v-for="item in props.items" :key="item.id" cols="12" dark>
            <v-card>
              <v-card-title class="subheading font-weight-bold green lighten-2 white--text">
                {{ item.label }}
              </v-card-title>

              <v-divider></v-divider>
              <v-row class="align-center justify-space-between p-5 mb-5">
                <v-col cols="12" lg="4" md="4">
                  <v-list dense>
                    <v-list-item v-for="(key, index) in filteredKeys" :key="index">
                      <v-list-item-content :class="{ 'green--text lighten-2': sortBy === key }">
                        {{ key }}:
                      </v-list-item-content>
                      <v-list-item-content
                        class="align-end"
                        :class="{ 'green--text lighten-2': sortBy === key }"
                      >
                        {{ item[key.toLowerCase()] }}
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>
                <v-col cols="12" lg="5" md="5" class="pt-6">
                  <av-waveform
                    audio-class="cusAudio"
                    :audio-src="item.url"
                    :canv-width="$vuetify.breakpoint.mobile ? 270 : 500"
                  ></av-waveform>
                  <v-btn class="ma-2" outlined color="green lighten-2" :to="`licensing/${item.id}`">
                    License</v-btn
                  >
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark text color="primary" class="ml-2" v-bind="attrs" v-on="on">
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span class="mr-4 grey--text"> Page {{ page }} of {{ numberOfPages }} </span>
          <v-btn fab dark color="green lighten-2" class="mr-1" @click="formerPage" x-small>
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab dark color="green lighten-2" class="ml-1" @click="nextPage" x-small>
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import instrumentals from '../db'
export default {
  name: 'Home',
  data() {
    return {
      itemsPerPageArray: [5, 10],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 10,
      sortBy: 'label',
      keys: ['Producer', 'Genre', 'BTM', 'Mood'],
      items: instrumentals,
      genreSelected: '',
      genres: ['hip hop', 'jazz', 'blues'],
      moodSelected: '',
      moods: ['party', 'happy', 'sad']
    }
  },

  computed: {
    // const testUrl = 'https://res.cloudinary.com/chidieberewaaw/video/upload/v1645537759/file_example_MP3_1MG_mpdxhp.mp3'
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    filteredKeys() {
      return this.keys.filter(key => key !== 'Name')
    }
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number
    }
  },
  watch: {
    moodSelected(val) {
      if (val !== '') {
        this.items = this.items.filter(item => item.mood === val)
      } else {
        this.items = instrumentals
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.w-50 {
  width: 50%;
  margin: 50px auto;
}
.cusCol {
  position: relative;
}
.cusBtn {
  position: absolute;
  top: -5px;
  right: -35px;
}
.cusAudio {
  background-color: red;
}
</style>
