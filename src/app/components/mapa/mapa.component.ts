import { Component, Input, OnInit, ViewChild } from '@angular/core';

declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  @Input() coords: string;
  @ViewChild('mapa', {static: true}) mapa;

  constructor() { }

  ngOnInit() {
    console.log(this.coords);

    const coordenadas = this.coords.split(',');
    const latitud = Number(coordenadas[0]);
    const longitud = Number(coordenadas[1]);


    mapboxgl.accessToken = 'pk.eyJ1IjoiY2FydXNvbXVudGVyZWFsIiwiYSI6ImNrbWF3YWlsbDF0OG8ydG9jcXFicGhucHAifQ.p4LjtwElP5scKGJH5torRw';
    const map = new mapboxgl.Map({
    container: this.mapa.nativeElement,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [ longitud, latitud],
    zoom: 15
    });

    const marca = new mapboxgl.Marker().setLngLat([ longitud, latitud]).addTo(map);
  }

}
