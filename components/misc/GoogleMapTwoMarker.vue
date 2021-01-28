<template>
  <div style="padding: 20px">
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  name: 'GoogleMapTwoMarker',
  props: {
    pickUpMarker: {
      type: Object,
      default: null
    },
    dropOffMarker: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      service: null,
      message: null,
      bounds: null,
      map: null,
      mapPickMarker: null,
      mapDropMarker: null,
      pickMarker: {
        lat: 24.44,
        lng: 39.62
      },
      dropMarker: {
        lat: 24.44,
        lng: 39.62
      },
      marker: {
        lat: 24.44,
        lng: 39.62
      }
    }
  },
  created() {
    if (this.pickUpMarker) {
      this.pickMarker.lat = Number(this.pickUpMarker.latitude)
      this.pickMarker.lng = Number(this.pickUpMarker.longitude)
    }
    if (this.dropOffMarker) {
      this.dropMarker.lat = Number(this.dropOffMarker.latitude)
      this.dropMarker.lng = Number(this.dropOffMarker.longitude)
    }
  },
  mounted() {
    const script = window.document.createElement('script')
    const saudiBounds = {
      north: 34,
      south: 15,
      west: 33,
      east: 60
    }
    // const city = { lat: 24.44, lng: 39.62 }
    script.onload = () => {
      // eslint-disable-next-line no-undef
      const map = new google.maps.Map(document.getElementById('map'), {
        center: this.pickMarker,
        restriction: {
          latLngBounds: saudiBounds,
          strictBounds: false
        },
        zoom: 9
      })
      this.map = map
      const saudiaCoordinates = [
        { lat: 28.1573, lng: 34.63 },
        { lat: 29.3618, lng: 34.9542 },
        { lat: 29.1889, lng: 36.0691 },
        { lat: 29.5, lng: 36.5044 },
        { lat: 29.8685, lng: 36.7535 },
        { lat: 30.01, lng: 37.4999 },
        { lat: 30.3326, lng: 37.6655 },
        { lat: 30.5007, lng: 37.9969 },
        { lat: 31.50004, lng: 37.0003 },
        { lat: 31.9983, lng: 38.9957 },
        { lat: 32.1563, lng: 39.1976 },
        { lat: 31.9481, lng: 40.4134 },
        { lat: 31.3732, lng: 41.4409 },
        { lat: 31.1117, lng: 42.0856 },
        { lat: 29.1985, lng: 44.7219 },
        { lat: 29.0612, lng: 46.426 },
        { lat: 29.1011, lng: 46.553 },
        { lat: 29.0005, lng: 47.4662 },
        { lat: 28.5612, lng: 47.7513 },
        { lat: 28.5784, lng: 48.5699 },
        { lat: 27.5745, lng: 48.8029 },
        { lat: 27.2332, lng: 49.2313 },
        { lat: 26.8418, lng: 49.81 },
        { lat: 26.44, lng: 50.17 },
        { lat: 25.88, lng: 50.05 },
        { lat: 25.629, lng: 50.1821 },
        { lat: 25.388, lng: 50.463 },
        { lat: 24.7868, lng: 50.718 },
        { lat: 24.447, lng: 51.08 },
        { lat: 24.5, lng: 51.317 },
        { lat: 24.581, lng: 51.399 },
        { lat: 24.3943, lng: 51.279 },
        { lat: 24.2705, lng: 51.266 },
        { lat: 24.312, lng: 51.423 },
        { lat: 24.248, lng: 51.52 },
        { lat: 24.278, lng: 51.74 },
        { lat: 24.2482, lng: 51.5814 },
        { lat: 24.154, lng: 51.586 },
        { lat: 24.106, lng: 51.592 },
        { lat: 22.934, lng: 52.577 },
        { lat: 22.629, lng: 55.131 },
        { lat: 22.7, lng: 55.204 },
        { lat: 22.002, lng: 55.649 },
        { lat: 19.9999, lng: 55 },
        { lat: 19.02, lng: 51.97 },
        { lat: 18.82, lng: 50.77 },
        { lat: 18.66, lng: 49.11 },
        { lat: 18.21, lng: 48.172 },
        { lat: 17.48, lng: 47.56 },
        { lat: 17.14, lng: 47.45 },
        { lat: 16.97, lng: 47.17 },
        { lat: 16.97, lng: 47.008 },
        { lat: 17.31, lng: 46.76 },
        { lat: 17.257, lng: 46.36 },
        { lat: 17.352, lng: 45.409 },
        { lat: 17.457, lng: 45.22 },
        { lat: 17.381, lng: 43.684 },
        { lat: 17.5642, lng: 43.3379 },
        { lat: 15.8648, lng: 43.102 },
        { lat: 21.2466, lng: 38.9883 },
        { lat: 28.1573, lng: 34.63 }
      ]

      // eslint-disable-next-line no-undef
      const saudiaPolygon = new google.maps.Polygon({
        paths: saudiaCoordinates,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.1
      })
      saudiaPolygon.setMap(map)
      // eslint-disable-next-line no-undef
      const pickUpMarker = new google.maps.Marker({
        position: this.pickMarker,
        map,
        title: 'Pick Up Location!'
      })
      pickUpMarker.setIcon(
        'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      )

      // eslint-disable-next-line no-undef
      const dropOffMarker = new google.maps.Marker({
        position: this.dropMarker,
        map,
        title: 'Drop Off Location!'
      })
      dropOffMarker.setIcon(
        'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
      )
      this.mapPickMarker = pickUpMarker
      this.mapDropMarker = dropOffMarker
      // this.$emit('input', this.marker)
    }
    script.async = true
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDSz2Q7d49FVjGoAW2k8eWFXSdQbbipVc8&libraries=places&v=weekly'
    document.head.appendChild(script)
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
