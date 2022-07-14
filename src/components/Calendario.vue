<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn color="primary" dark class="mr-4" @click="dialog = true">
            Agregar
          </v-btn> 
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Hoy
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-btn color="#1976D2" outlined dark class="ml-4 mouse-none" elevation="2"> JO </v-btn>
          <v-btn color="#009688" outlined dark class="ml-4 mouse-none" elevation="2"> Audiencia </v-btn>
          <v-btn color="#FF9800" outlined dark class="ml-4 mouse-none" elevation="2"> Control </v-btn>
          <v-btn color="deep-purple" outlined dark class="ml-4 mouse-none" elevation="2"> Permiso </v-btn>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Día</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Semana</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Mes</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :event-more="false"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
          :weekdays="weekdays"
          locale="es"
          :short-weekdays="false"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <!--
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              -->
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip bottom :color="selectedEvent.color">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon @click="deleteEvent(selectedEvent)" v-bind="attrs" v-on="on">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span>Eliminar Registro</span>
              </v-tooltip>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <v-card-subtitle v-html="selectedEvent.sala"></v-card-subtitle>
              <v-spacer></v-spacer>
              <span v-html="selectedEvent.detail"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn
                block
                color="blue-grey lighten-4"
                @click="selectedOpen = false"
              >
                Cerrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>

      <!-- Modal nuevo evento -->

      <v-dialog v-model="dialog" width="50%">
        <v-card>
          <v-container>
            <h1>Agregar Evento</h1>
            <v-form @submit.prevent="addEvent(event)">
              <v-text-field 
                type="date" label="Seleccione Fecha del registro" v-model="event.start"  v-on:change="selectDate">
              </v-text-field>
              <v-select
                ref="Sala"
                label="Seleccione la Sala"
                :items="tipo_salas"
                v-model="event.sala"
                item-value="id"
                outlined
                item-text="nombre"
                :rules="[v => !!v || 'Item requerido']">
              </v-select>
              <v-select
                ref="Fiscal"
                label="Seleccione el Fiscal"
                :items="fiscales"
                v-model="event.fiscal"
                item-value="id"
                outlined
                item-text="nombre"
                :rules="[v => !!v || 'Item requerido']">
              </v-select>
              <v-text-field 
                type="text" label="Agregue un Detalle" v-model="event.detail">
              </v-text-field>
              <v-checkbox
                v-model="event.email"
                label="¿Desea enviar correo?"
              ></v-checkbox>
              <v-btn 
                type="submit" color="primary" class="mr-4" block
                @click.stop="dialog = false"> Agregar
              </v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>
<style scoped=""> 
  .mouse-none {
    pointer-events: none;
  }
  .v-calendar-weekly {
    display: table;
    table-layout: fixed;
  }
  .v-calendar-weekly__week {
    height: auto;
    display: table-row;
  }
  .v-calendar-weekly__day {
    display: table-cell;
    width: calc(100% / 7)
  }
</style>
<script>
  import { registrosService } from '@/services/Registros/registro.service'
  import { fiscalesByDateService } from '@/services/Fiscal/fiscalesByDate.service'
  import { tipoSalaService } from '@/services/TipoSala/tipoSala.service'
  import { permisoFisaclesAgenda } from '@/services/Permiso/permisoFisaclesAgenda.service'
  export default {
    data: () => ({
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Mes',
        week: 'Semana',
        day: 'Día'
      },
      weekdays: [1, 2, 3, 4, 5, 6, 0],
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      fiscales: [],
      tipo_salas: [],
      registro: {},
      event: {},
      dialog: false,
      name: null,
      start: null,
      end: null,
      detail: null,
      color: '',
      permisos: []
    }),
    mounted () {
      this.$refs.calendar.checkChange()
    },
    methods: {
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
        console.log('$vuetify.calendar.moreEvents')
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      async addEvent (event) {
        try {
          if(event.fiscal && event.start && event.sala) {
            let vm = this
            registrosService.save(event).then(success => {
              vm.registro = success.body.registro
              this.event = {}
              this.updateRange ()
            }, err => {
              if (err.status) {
                console.log(err)
              }
            })
          }
        } catch (error) {
          console.log(error)
        }
      },
      async deleteEvent(event) {
        try {
          let vm = this
          registrosService.destroy(event.id).then(reg => {
            vm.delete = reg.body
            this.selectedOpen = false
            this.updateRange()
          })
        } catch (error) {
          console.log(error)
        }
      },
      selectDate(ev) {
        let vm = this
        tipoSalaService.query(ev).then(salas => {
          vm.tipo_salas = salas.body
        })
        fiscalesByDateService.query(ev).then(fiscalesResp => {
          vm.fiscales = fiscalesResp.body
        })
      },
      updateRange () {
        // Obtenemos los eventos de la api
        let vm = this
        registrosService.query().then(registros => {
          vm.registro = registros.body
          permisoFisaclesAgenda.query().then(perm => {
            vm.permisos = perm.body

            let  arr= vm.registro.concat(vm.permisos)
            this.events = arr
          })
        })
      }
    }
  }
</script>
