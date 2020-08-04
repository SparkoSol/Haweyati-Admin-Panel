<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  name: 'GoogleMap',
  props: {
    oldMarker: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      map: null,
      mapMarker: null,
      marker: {
        lat: 0,
        lng: 0
      },
      myCoordinates: {
        lat: 0,
        lng: 0
      }
    }
  },
  created() {
    if (this.oldMarker) {
      this.$getLocation({})
        .then((coordinates) => {
          this.myCoordinates = coordinates
        })
        .catch((error) => alert(error))
      this.marker = this.oldMarker
    } else {
      this.$getLocation({})
        .then((coordinates) => {
          this.myCoordinates = coordinates
          this.marker = coordinates
        })
        .catch((error) => alert(error))
    }
  },
  mounted() {
    const script = window.document.createElement('script')
    script.onload = () => {
      // eslint-disable-next-line no-undef
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: this.oldMarker ? this.marker : this.myCoordinates
      })
      this.map = map
      // eslint-disable-next-line no-undef,no-unused-vars
      const marker = new google.maps.Marker({ position: this.marker, map })
      this.mapMarker = marker
      map.addListener('click', (event) => {
        this.updateMarker(event.latLng.lat(), event.latLng.lng())
      })
      this.$emit('input', this.marker)
    }
    script.async = true
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDSz2Q7d49FVjGoAW2k8eWFXSdQbbipVc8'
    document.head.appendChild(script)
  },
  methods: {
    updateMarker(lat, lng) {
      this.mapMarker.setMap(null)
      const position = {
        lat,
        lng
      }
      this.marker = position
      window.console.log(this.marker)
      // eslint-disable-next-line no-undef
      this.mapMarker = new google.maps.Marker({
        position,
        map: this.map
      })
      this.$emit('input', this.marker)
    }
  }
}
</script>
<style>
/* Set the size of the div element that contains the map */
#map {
  height: 250px; /* The height is 400 pixels */
  width: 100%; /* The width is the width of the web page */
}
</style>
