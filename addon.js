const { addonBuilder, getRouter } = require('stremio-addon-sdk');
const express = require('express');
const fetch = require('node-fetch');

// ========== DATOS ==========
const CHANNELS = [
  {
    "name": "13 C",
    "url": "http://190.108.83.69:8000/play/a02o/index.m3u8",
    "id": "tvlatam:13-c",
    "genre": "otros"
  },
  {
    "name": "A G WEST",
    "url": "http://190.108.83.69:8000/play/a0c9/index.m3u8",
    "id": "tvlatam:a-g-west",
    "genre": "otros"
  },
  {
    "name": "A H L1MAX",
    "url": "http://190.108.83.69:8000/play/a0bl/index.m3u8",
    "id": "tvlatam:a-h-l1max",
    "genre": "otros"
  },
  {
    "name": "A&E HD",
    "url": "http://190.108.83.69:8000/play/a02y/index.m3u8",
    "id": "tvlatam:a-e-hd",
    "genre": "otros"
  },
  {
    "name": "AMC HD",
    "url": "http://190.108.83.69:8000/play/a033/index.m3u8",
    "id": "tvlatam:amc-hd",
    "genre": "cine"
  },
  {
    "name": "AMC SERIES",
    "url": "http://190.108.83.69:8000/play/a00p/index.m3u8",
    "id": "tvlatam:amc-series",
    "genre": "cine"
  },
  {
    "name": "ATV",
    "url": "http://190.108.83.69:8000/play/a019/index.m3u8",
    "id": "tvlatam:atv",
    "genre": "otros"
  },
  {
    "name": "AXN HD",
    "url": "http://190.108.83.69:8000/play/a04c/index.m3u8",
    "id": "tvlatam:axn-hd",
    "genre": "cine"
  },
  {
    "name": "Adult Swim",
    "url": "http://190.108.83.69:8000/play/a02k/index.m3u8",
    "id": "tvlatam:adult-swim",
    "genre": "otros"
  },
  {
    "name": "America TV HD",
    "url": "http://190.108.83.69:8000/play/a00f/index.m3u8",
    "id": "tvlatam:america-tv-hd",
    "genre": "abiertos"
  },
  {
    "name": "Animal Planet HD",
    "url": "http://190.108.83.69:8000/play/a043/index.m3u8",
    "id": "tvlatam:animal-planet-hd",
    "genre": "documentales"
  },
  {
    "name": "Antena 3",
    "url": "http://190.108.83.69:8000/play/a01e/index.m3u8",
    "id": "tvlatam:antena-3",
    "genre": "abiertos"
  },
  {
    "name": "Atres Series HD",
    "url": "http://190.108.83.69:8000/play/a0al/index.m3u8",
    "id": "tvlatam:atres-series-hd",
    "genre": "otros"
  },
  {
    "name": "BBC World",
    "url": "http://190.108.83.69:8000/play/a01c/index.m3u8",
    "id": "tvlatam:bbc-world",
    "genre": "noticias"
  },
  {
    "name": "BETHEL TV",
    "url": "http://190.108.83.69:8000/play/a040/index.m3u8",
    "id": "tvlatam:bethel-tv",
    "genre": "religiosos"
  },
  {
    "name": "Baby TV",
    "url": "http://190.108.83.69:8000/play/a022/index.m3u8",
    "id": "tvlatam:baby-tv",
    "genre": "infantil"
  },
  {
    "name": "CCTV-CGTN",
    "url": "http://190.108.83.69:8000/play/a07h/index.m3u8",
    "id": "tvlatam:cctv-cgtn",
    "genre": "noticias"
  },
  {
    "name": "CHV HD",
    "url": "http://190.108.83.69:8000/play/a03g/index.m3u8",
    "id": "tvlatam:chv-hd",
    "genre": "otros"
  },
  {
    "name": "CNN Chile",
    "url": "http://190.108.83.69:8000/play/a0cs/index.m3u8",
    "id": "tvlatam:cnn-chile",
    "genre": "noticias"
  },
  {
    "name": "CNN Espanol",
    "url": "http://190.108.83.69:8000/play/a023/index.m3u8",
    "id": "tvlatam:cnn-espanol",
    "genre": "noticias"
  },
  {
    "name": "Canal 13 HD",
    "url": "http://190.108.83.69:8000/play/a02v/index.m3u8",
    "id": "tvlatam:canal-13-hd",
    "genre": "abiertos"
  },
  {
    "name": "Canal N",
    "url": "http://190.108.83.69:8000/play/a07r/index.m3u8",
    "id": "tvlatam:canal-n",
    "genre": "noticias"
  },
  {
    "name": "Cartoon Network HD",
    "url": "http://190.108.83.69:8000/play/a08g/index.m3u8",
    "id": "tvlatam:cartoon-network-hd",
    "genre": "infantil"
  },
  {
    "name": "Cartoonito",
    "url": "http://190.108.83.69:8000/play/a0aa/index.m3u8",
    "id": "tvlatam:cartoonito",
    "genre": "infantil"
  },
  {
    "name": "Cinecanal HD",
    "url": "http://190.108.83.69:8000/play/a048/index.m3u8",
    "id": "tvlatam:cinecanal-hd",
    "genre": "cine"
  },
  {
    "name": "Cinemax",
    "url": "http://190.108.83.69:8000/play/a06s/index.m3u8",
    "id": "tvlatam:cinemax",
    "genre": "cine"
  },
  {
    "name": "Comedy Central HD",
    "url": "http://190.108.83.69:8000/play/a02z/index.m3u8",
    "id": "tvlatam:comedy-central-hd",
    "genre": "cine"
  },
  {
    "name": "DHE HD",
    "url": "http://190.108.83.69:8000/play/a03v/index.m3u8",
    "id": "tvlatam:dhe-hd",
    "genre": "otros"
  },
  {
    "name": "DW Espanol",
    "url": "http://190.108.83.69:8000/play/a01l/index.m3u8",
    "id": "tvlatam:dw-espanol",
    "genre": "noticias"
  },
  {
    "name": "De Pelicula",
    "url": "http://190.108.83.69:8000/play/a06o/index.m3u8",
    "id": "tvlatam:de-pelicula",
    "genre": "cine"
  },
  {
    "name": "Discovery Channel  HD",
    "url": "http://190.108.83.69:8000/play/a044/index.m3u8",
    "id": "tvlatam:discovery-channel-hd",
    "genre": "documentales"
  },
  {
    "name": "Discovery Kids HD",
    "url": "http://190.108.83.69:8000/play/a0bn/index.m3u8",
    "id": "tvlatam:discovery-kids-hd",
    "genre": "infantil"
  },
  {
    "name": "Discovery Science",
    "url": "http://190.108.83.69:8000/play/a02b/index.m3u8",
    "id": "tvlatam:discovery-science",
    "genre": "documentales"
  },
  {
    "name": "Discovery Theater HD",
    "url": "http://190.108.83.69:8000/play/a03e/index.m3u8",
    "id": "tvlatam:discovery-theater-hd",
    "genre": "documentales"
  },
  {
    "name": "Discovery Turbo",
    "url": "http://190.108.83.69:8000/play/a026/index.m3u8",
    "id": "tvlatam:discovery-turbo",
    "genre": "documentales"
  },
  {
    "name": "Discovery World HD",
    "url": "http://190.108.83.69:8000/play/a036/index.m3u8",
    "id": "tvlatam:discovery-world-hd",
    "genre": "documentales"
  },
  {
    "name": "Disney HD",
    "url": "http://190.108.83.69:8000/play/a04f/index.m3u8",
    "id": "tvlatam:disney-hd",
    "genre": "infantil"
  },
  {
    "name": "Disney Junior",
    "url": "http://190.108.83.69:8000/play/a025/index.m3u8",
    "id": "tvlatam:disney-junior",
    "genre": "infantil"
  },
  {
    "name": "E! Entertainment TV",
    "url": "http://190.108.83.69:8000/play/a02c/index.m3u8",
    "id": "tvlatam:e-entertainment-tv",
    "genre": "otros"
  },
  {
    "name": "ESPN 2 HD",
    "url": "http://190.108.83.69:8000/play/a0an/index.m3u8",
    "id": "tvlatam:espn-2-hd",
    "genre": "deportes"
  },
  {
    "name": "ESPN 3 HD",
    "url": "http://190.108.83.69:8000/play/a039/index.m3u8",
    "id": "tvlatam:espn-3-hd",
    "genre": "deportes"
  },
  {
    "name": "ESPN 4HD",
    "url": "http://190.108.83.69:8000/play/a04h/index.m3u8",
    "id": "tvlatam:espn-4hd",
    "genre": "deportes"
  },
  {
    "name": "ESPN 5HD",
    "url": "http://190.108.83.69:8000/play/a032/index.m3u8",
    "id": "tvlatam:espn-5hd",
    "genre": "deportes"
  },
  {
    "name": "ESPN 6HD",
    "url": "http://190.108.83.69:8000/play/a02w/index.m3u8",
    "id": "tvlatam:espn-6hd",
    "genre": "deportes"
  },
  {
    "name": "ESPN 7HD",
    "url": "http://190.108.83.69:8000/play/a049/index.m3u8",
    "id": "tvlatam:espn-7hd",
    "genre": "deportes"
  },
  {
    "name": "ESPN HD",
    "url": "http://190.108.83.69:8000/play/a03s/index.m3u8",
    "id": "tvlatam:espn-hd",
    "genre": "deportes"
  },
  {
    "name": "ESPN Premium HD",
    "url": "http://190.108.83.69:8000/play/a03w/index.m3u8",
    "id": "tvlatam:espn-premium-hd",
    "genre": "deportes"
  },
  {
    "name": "ETC",
    "url": "http://190.108.83.69:8000/play/a08c/index.m3u8",
    "id": "tvlatam:etc",
    "genre": "otros"
  },
  {
    "name": "EWTN",
    "url": "http://190.108.83.69:8000/play/a02h/index.m3u8",
    "id": "tvlatam:ewtn",
    "genre": "noticias"
  },
  {
    "name": "El Gourmet HD",
    "url": "http://190.108.83.69:8000/play/a030/index.m3u8",
    "id": "tvlatam:el-gourmet-hd",
    "genre": "otros"
  },
  {
    "name": "El Trece",
    "url": "http://190.108.83.69:8000/play/a01d/index.m3u8",
    "id": "tvlatam:el-trece",
    "genre": "abiertos"
  },
  {
    "name": "Enlace",
    "url": "http://190.108.83.69:8000/play/a02j/index.m3u8",
    "id": "tvlatam:enlace",
    "genre": "otros"
  },
  {
    "name": "Europa Europa",
    "url": "http://190.108.83.69:8000/play/a00z/index.m3u8",
    "id": "tvlatam:europa-europa",
    "genre": "otros"
  },
  {
    "name": "Exitosa TV",
    "url": "http://190.108.83.69:8000/play/a07s/index.m3u8",
    "id": "tvlatam:exitosa-tv",
    "genre": "otros"
  },
  {
    "name": "FX HD",
    "url": "http://190.108.83.69:8000/play/a04i/index.m3u8",
    "id": "tvlatam:fx-hd",
    "genre": "cine"
  },
  {
    "name": "Film&Arts",
    "url": "http://190.108.83.69:8000/play/a00n/index.m3u8",
    "id": "tvlatam:film-arts",
    "genre": "otros"
  },
  {
    "name": "Food Network",
    "url": "http://190.108.83.69:8000/play/a08e/index.m3u8",
    "id": "tvlatam:food-network",
    "genre": "estilo"
  },
  {
    "name": "France 24",
    "url": "http://190.108.83.69:8000/play/a01j/index.m3u8",
    "id": "tvlatam:france-24",
    "genre": "otros"
  },
  {
    "name": "G DS",
    "url": "http://190.108.83.69:8000/play/a0cb/index.m3u8",
    "id": "tvlatam:g-ds",
    "genre": "otros"
  },
  {
    "name": "G LA KARIBENA",
    "url": "http://190.108.83.69:8000/play/a0cd/index.m3u8",
    "id": "tvlatam:g-la-karibena",
    "genre": "otros"
  },
  {
    "name": "GLOBAL",
    "url": "http://190.108.83.69:8000/play/a01b/index.m3u8",
    "id": "tvlatam:global",
    "genre": "otros"
  },
  {
    "name": "Golden Edge",
    "url": "http://190.108.83.69:8000/play/a00w/index.m3u8",
    "id": "tvlatam:golden-edge",
    "genre": "cine"
  },
  {
    "name": "Golden HD",
    "url": "http://190.108.83.69:8000/play/a00i/index.m3u8",
    "id": "tvlatam:golden-hd",
    "genre": "cine"
  },
  {
    "name": "H AMERICA TV",
    "url": "http://190.108.83.69:8000/play/a097/index.m3u8",
    "id": "tvlatam:h-america-tv",
    "genre": "abiertos"
  },
  {
    "name": "H ATV SUR HD",
    "url": "http://190.108.83.69:8000/play/a0cq/index.m3u8",
    "id": "tvlatam:h-atv-sur-hd",
    "genre": "otros"
  },
  {
    "name": "H ATV+ HD",
    "url": "http://190.108.83.69:8000/play/a0cp/index.m3u8",
    "id": "tvlatam:h-atv-hd",
    "genre": "otros"
  },
  {
    "name": "H LATELE HD",
    "url": "http://190.108.83.69:8000/play/a0cr/index.m3u8",
    "id": "tvlatam:h-latele-hd",
    "genre": "otros"
  },
  {
    "name": "H LATINA HD",
    "url": "http://190.108.83.69:8000/play/a09a/index.m3u8",
    "id": "tvlatam:h-latina-hd",
    "genre": "otros"
  },
  {
    "name": "H TV PERU",
    "url": "http://190.108.83.69:8000/play/a092/index.m3u8",
    "id": "tvlatam:h-tv-peru",
    "genre": "otros"
  },
  {
    "name": "HBO 2",
    "url": "http://190.108.83.69:8000/play/a0cx/index.m3u8",
    "id": "tvlatam:hbo-2",
    "genre": "cine"
  },
  {
    "name": "HBO Family HD",
    "url": "http://190.108.83.69:8000/play/a03x/index.m3u8",
    "id": "tvlatam:hbo-family-hd",
    "genre": "cine"
  },
  {
    "name": "HBO HD",
    "url": "http://190.108.83.69:8000/play/a035/index.m3u8",
    "id": "tvlatam:hbo-hd",
    "genre": "cine"
  },
  {
    "name": "HBO MUNDI",
    "url": "http://190.108.83.69:8000/play/a01h/index.m3u8",
    "id": "tvlatam:hbo-mundi",
    "genre": "cine"
  },
  {
    "name": "HBO POP HD",
    "url": "http://190.108.83.69:8000/play/a03k/index.m3u8",
    "id": "tvlatam:hbo-pop-hd",
    "genre": "cine"
  },
  {
    "name": "HBO Plus",
    "url": "http://190.108.83.69:8000/play/a06b/index.m3u8",
    "id": "tvlatam:hbo-plus",
    "genre": "cine"
  },
  {
    "name": "HBO Signature",
    "url": "http://190.108.83.69:8000/play/a01g/index.m3u8",
    "id": "tvlatam:hbo-signature",
    "genre": "cine"
  },
  {
    "name": "HBO XTREME HD",
    "url": "http://190.108.83.69:8000/play/a03y/index.m3u8",
    "id": "tvlatam:hbo-xtreme-hd",
    "genre": "cine"
  },
  {
    "name": "HEI HD",
    "url": "http://190.108.83.69:8000/play/a072/index.m3u8",
    "id": "tvlatam:hei-hd",
    "genre": "otros"
  },
  {
    "name": "HGTV",
    "url": "http://190.108.83.69:8000/play/a02f/index.m3u8",
    "id": "tvlatam:hgtv",
    "genre": "estilo"
  },
  {
    "name": "HOLA TV HD",
    "url": "http://190.108.83.69:8000/play/a073/index.m3u8",
    "id": "tvlatam:hola-tv-hd",
    "genre": "otros"
  },
  {
    "name": "HTV",
    "url": "http://190.108.83.69:8000/play/a00q/index.m3u8",
    "id": "tvlatam:htv",
    "genre": "musica"
  },
  {
    "name": "History 2",
    "url": "http://190.108.83.69:8000/play/a00j/index.m3u8",
    "id": "tvlatam:history-2",
    "genre": "documentales"
  },
  {
    "name": "History Channel HD",
    "url": "http://190.108.83.69:8000/play/a045/index.m3u8",
    "id": "tvlatam:history-channel-hd",
    "genre": "documentales"
  },
  {
    "name": "Home & Health HD",
    "url": "http://190.108.83.69:8000/play/a08k/index.m3u8",
    "id": "tvlatam:home-health-hd",
    "genre": "estilo"
  },
  {
    "name": "ID HD",
    "url": "http://190.108.83.69:8000/play/a04d/index.m3u8",
    "id": "tvlatam:id-hd",
    "genre": "otros"
  },
  {
    "name": "Kanal D Drama",
    "url": "http://190.108.83.69:8000/play/a084/index.m3u8",
    "id": "tvlatam:kanal-d-drama",
    "genre": "otros"
  },
  {
    "name": "L1",
    "url": "http://190.108.83.69:8000/play/a08s/index.m3u8",
    "id": "tvlatam:l1",
    "genre": "otros"
  },
  {
    "name": "L1 MAX",
    "url": "http://190.108.83.69:8000/play/a083/index.m3u8",
    "id": "tvlatam:l1-max",
    "genre": "otros"
  },
  {
    "name": "Las Estrellas HD",
    "url": "http://190.108.83.69:8000/play/a09l/index.m3u8",
    "id": "tvlatam:las-estrellas-hd",
    "genre": "abiertos"
  },
  {
    "name": "Latina HD",
    "url": "http://190.108.83.69:8000/play/a00g/index.m3u8",
    "id": "tvlatam:latina-hd",
    "genre": "otros"
  },
  {
    "name": "Lifetime",
    "url": "http://190.108.83.69:8000/play/a02i/index.m3u8",
    "id": "tvlatam:lifetime",
    "genre": "otros"
  },
  {
    "name": "Love Nature",
    "url": "http://190.108.83.69:8000/play/a085/index.m3u8",
    "id": "tvlatam:love-nature",
    "genre": "otros"
  },
  {
    "name": "MEGA HD",
    "url": "http://190.108.83.69:8000/play/a03m/index.m3u8",
    "id": "tvlatam:mega-hd",
    "genre": "abiertos"
  },
  {
    "name": "MTV HD",
    "url": "http://190.108.83.69:8000/play/a03a/index.m3u8",
    "id": "tvlatam:mtv-hd",
    "genre": "musica"
  },
  {
    "name": "Movistar Deportes",
    "url": "http://190.108.83.69:8000/play/a07o/index.m3u8",
    "id": "tvlatam:movistar-deportes",
    "genre": "otros"
  },
  {
    "name": "NTN 24 Horas",
    "url": "http://190.108.83.69:8000/play/a00r/index.m3u8",
    "id": "tvlatam:ntn-24-horas",
    "genre": "noticias"
  },
  {
    "name": "Nat Geo HD",
    "url": "http://190.108.83.69:8000/play/a046/index.m3u8",
    "id": "tvlatam:nat-geo-hd",
    "genre": "documentales"
  },
  {
    "name": "Nick HD",
    "url": "http://190.108.83.69:8000/play/a03l/index.m3u8",
    "id": "tvlatam:nick-hd",
    "genre": "infantil"
  },
  {
    "name": "Nuestra Tele",
    "url": "http://190.108.83.69:8000/play/a00k/index.m3u8",
    "id": "tvlatam:nuestra-tele",
    "genre": "otros"
  },
  {
    "name": "OROMAR TV",
    "url": "http://190.108.83.69:8000/play/a017/index.m3u8",
    "id": "tvlatam:oromar-tv",
    "genre": "otros"
  },
  {
    "name": "POPU TV",
    "url": "http://190.108.83.69:8000/play/a070/index.m3u8",
    "id": "tvlatam:popu-tv",
    "genre": "otros"
  },
  {
    "name": "Panamericana",
    "url": "http://190.108.83.69:8000/play/a018/index.m3u8",
    "id": "tvlatam:panamericana",
    "genre": "abiertos"
  },
  {
    "name": "Pasiones HD",
    "url": "http://190.108.83.69:8000/play/a03h/index.m3u8",
    "id": "tvlatam:pasiones-hd",
    "genre": "novelas"
  },
  {
    "name": "Plim Plim TV",
    "url": "http://190.108.83.69:8000/play/a07n/index.m3u8",
    "id": "tvlatam:plim-plim-tv",
    "genre": "otros"
  },
  {
    "name": "Plus TV Life",
    "url": "http://190.108.83.69:8000/play/a086/index.m3u8",
    "id": "tvlatam:plus-tv-life",
    "genre": "otros"
  },
  {
    "name": "R ALPHA",
    "url": "http://190.108.83.69:8000/play/a09c/index.m3u8",
    "id": "tvlatam:r-alpha",
    "genre": "otros"
  },
  {
    "name": "R CHARAPA TV",
    "url": "http://190.108.83.69:8000/play/a067/index.m3u8",
    "id": "tvlatam:r-charapa-tv",
    "genre": "otros"
  },
  {
    "name": "R Estacion Tv",
    "url": "http://190.108.83.69:8000/play/a07k/index.m3u8",
    "id": "tvlatam:r-estacion-tv",
    "genre": "otros"
  },
  {
    "name": "R Nex Tv",
    "url": "http://190.108.83.69:8000/play/a06r/index.m3u8",
    "id": "tvlatam:r-nex-tv",
    "genre": "otros"
  },
  {
    "name": "R ORIENTAL",
    "url": "http://190.108.83.69:8000/play/a05y/index.m3u8",
    "id": "tvlatam:r-oriental",
    "genre": "otros"
  },
  {
    "name": "R PREMIUM GO",
    "url": "http://190.108.83.69:8000/play/a082/index.m3u8",
    "id": "tvlatam:r-premium-go",
    "genre": "otros"
  },
  {
    "name": "R PUCALLPA TV",
    "url": "http://190.108.83.69:8000/play/a05z/index.m3u8",
    "id": "tvlatam:r-pucallpa-tv",
    "genre": "otros"
  },
  {
    "name": "R UCAYALINA TV",
    "url": "http://190.108.83.69:8000/play/a060/index.m3u8",
    "id": "tvlatam:r-ucayalina-tv",
    "genre": "otros"
  },
  {
    "name": "RADIO BETHEL",
    "url": "http://190.108.83.69:8000/play/a041/index.m3u8",
    "id": "tvlatam:radio-bethel",
    "genre": "religiosos"
  },
  {
    "name": "RPP",
    "url": "http://190.108.83.69:8000/play/a01a/index.m3u8",
    "id": "tvlatam:rpp",
    "genre": "otros"
  },
  {
    "name": "SONY CHANNEL HD",
    "url": "http://190.108.83.69:8000/play/a04a/index.m3u8",
    "id": "tvlatam:sony-channel-hd",
    "genre": "cine"
  },
  {
    "name": "STAR CHANNEL HD",
    "url": "http://190.108.83.69:8000/play/a04j/index.m3u8",
    "id": "tvlatam:star-channel-hd",
    "genre": "cine"
  },
  {
    "name": "Sony Movies",
    "url": "http://190.108.83.69:8000/play/a08j/index.m3u8",
    "id": "tvlatam:sony-movies",
    "genre": "cine"
  },
  {
    "name": "Space HD",
    "url": "http://190.108.83.69:8000/play/a04e/index.m3u8",
    "id": "tvlatam:space-hd",
    "genre": "cine"
  },
  {
    "name": "Stingray Concerts HD",
    "url": "http://190.108.83.69:8000/play/a00d/index.m3u8",
    "id": "tvlatam:stingray-concerts-hd",
    "genre": "otros"
  },
  {
    "name": "Studio Universal HD",
    "url": "http://190.108.83.69:8000/play/a074/index.m3u8",
    "id": "tvlatam:studio-universal-hd",
    "genre": "cine"
  },
  {
    "name": "Sun Channel HD",
    "url": "http://190.108.83.69:8000/play/a03z/index.m3u8",
    "id": "tvlatam:sun-channel-hd",
    "genre": "otros"
  },
  {
    "name": "T NOVA TV",
    "url": "http://190.108.83.69:8000/play/a07y/index.m3u8",
    "id": "tvlatam:t-nova-tv",
    "genre": "otros"
  },
  {
    "name": "T PBO HD",
    "url": "http://190.108.83.69:8000/play/a05r/index.m3u8",
    "id": "tvlatam:t-pbo-hd",
    "genre": "otros"
  },
  {
    "name": "TCM",
    "url": "http://190.108.83.69:8000/play/a00y/index.m3u8",
    "id": "tvlatam:tcm",
    "genre": "otros"
  },
  {
    "name": "TLC",
    "url": "http://190.108.83.69:8000/play/a02a/index.m3u8",
    "id": "tvlatam:tlc",
    "genre": "estilo"
  },
  {
    "name": "TNT HD",
    "url": "http://190.108.83.69:8000/play/a047/index.m3u8",
    "id": "tvlatam:tnt-hd",
    "genre": "noticias"
  },
  {
    "name": "TNT Novelas HD",
    "url": "http://190.108.83.69:8000/play/a038/index.m3u8",
    "id": "tvlatam:tnt-novelas-hd",
    "genre": "noticias"
  },
  {
    "name": "TNT Series HD",
    "url": "http://190.108.83.69:8000/play/a034/index.m3u8",
    "id": "tvlatam:tnt-series-hd",
    "genre": "noticias"
  },
  {
    "name": "TNT Sports Premiun HD",
    "url": "http://190.108.83.69:8000/play/a03i/index.m3u8",
    "id": "tvlatam:tnt-sports-premiun-hd",
    "genre": "deportes"
  },
  {
    "name": "TVE",
    "url": "http://190.108.83.69:8000/play/a08m/index.m3u8",
    "id": "tvlatam:tve",
    "genre": "otros"
  },
  {
    "name": "TVN HD",
    "url": "http://190.108.83.69:8000/play/a03f/index.m3u8",
    "id": "tvlatam:tvn-hd",
    "genre": "abiertos"
  },
  {
    "name": "Telefe",
    "url": "http://190.108.83.69:8000/play/a08l/index.m3u8",
    "id": "tvlatam:telefe",
    "genre": "abiertos"
  },
  {
    "name": "Telemundo",
    "url": "http://190.108.83.69:8000/play/a02d/index.m3u8",
    "id": "tvlatam:telemundo",
    "genre": "abiertos"
  },
  {
    "name": "Tlnovelas",
    "url": "http://190.108.83.69:8000/play/a06n/index.m3u8",
    "id": "tvlatam:tlnovelas",
    "genre": "novelas"
  },
  {
    "name": "Tooncast",
    "url": "http://190.108.83.69:8000/play/a02e/index.m3u8",
    "id": "tvlatam:tooncast",
    "genre": "otros"
  },
  {
    "name": "UNIVERSAL CHANNEL HD",
    "url": "http://190.108.83.69:8000/play/a031/index.m3u8",
    "id": "tvlatam:universal-channel-hd",
    "genre": "cine"
  },
  {
    "name": "USA",
    "url": "http://190.108.83.69:8000/play/a00v/index.m3u8",
    "id": "tvlatam:usa",
    "genre": "otros"
  },
  {
    "name": "Universal Cinema SD",
    "url": "http://190.108.83.69:8000/play/a0cz/index.m3u8",
    "id": "tvlatam:universal-cinema-sd",
    "genre": "cine"
  },
  {
    "name": "Universal Comedy SD",
    "url": "http://190.108.83.69:8000/play/a0d0/index.m3u8",
    "id": "tvlatam:universal-comedy-sd",
    "genre": "cine"
  },
  {
    "name": "Universal Premiere SD",
    "url": "http://190.108.83.69:8000/play/a0cy/index.m3u8",
    "id": "tvlatam:universal-premiere-sd",
    "genre": "deportes"
  },
  {
    "name": "Via X Esports",
    "url": "http://190.108.83.69:8000/play/a00u/index.m3u8",
    "id": "tvlatam:via-x-esports",
    "genre": "otros"
  },
  {
    "name": "Warner Channel HD",
    "url": "http://190.108.83.69:8000/play/a04b/index.m3u8",
    "id": "tvlatam:warner-channel-hd",
    "genre": "cine"
  },
  {
    "name": "Willax",
    "url": "http://190.108.83.69:8000/play/a07t/index.m3u8",
    "id": "tvlatam:willax",
    "genre": "otros"
  }
];

const CATEGORIES = [
  { id: 'all', name: 'Todos' },
  { id: 'deportes', name: 'Deportes' },
  { id: 'abiertos', name: 'Canales abiertos' },
  { id: 'noticias', name: 'Noticias' },
  { id: 'cine', name: 'Cine y series' },
  { id: 'novelas', name: 'Novelas' },
  { id: 'documentales', name: 'Documentales' },
  { id: 'estilo', name: 'Estilo de vida' },
  { id: 'infantil', name: 'Infantil' },
  { id: 'musica', name: 'Música' },
  { id: 'religiosos', name: 'Religiosos' },
  { id: 'otros', name: 'Otros' }
];

const CACHE_MS = 10 * 60 * 1000;
let remoteCache = null;
let remoteCacheTime = 0;

// Listas M3U públicas (auto-update)
const REMOTE_LISTS = [
  'https://iptv-org.github.io/iptv/countries/mx.m3u',
  'https://iptv-org.github.io/iptv/countries/ar.m3u',
  'https://iptv-org.github.io/iptv/countries/co.m3u',
  'https://iptv-org.github.io/iptv/countries/cl.m3u',
  'https://iptv-org.github.io/iptv/countries/pe.m3u',
  'https://iptv-org.github.io/iptv/countries/es.m3u'
];

function slug(s) {
  return String(s || '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'canal';
}

function detectGenre(name) {
  const n = (name || '').toLowerCase();
  if (/espn|fox.?sports|tyc|directv.?sports|nba|nfl|mlb|ufc|golf|win.?sports|tnt.?sports|dazn|bein|euro.?sport|liga|premier|champions/.test(n)) return 'deportes';
  if (/cnn|bbc|dw|noticias|news|canal.?n|24.?horas|tn|c5n|a24|todo.?noticias|globovision|ntn24|euronews/.test(n)) return 'noticias';
  if (/cartoon|disney|nick|discovery.?kids|baby|paka|clan|boomerang|cartoonito|nick.?jr/.test(n)) return 'infantil';
  if (/hbo|cine|cinemax|amc|tnt|space|universal|paramount|warner|sony|star.?channel|fx|axn|comedy|de.?pelicula|golden|sundance/.test(n)) return 'cine';
  if (/novela|telenovela|pasiones/.test(n)) return 'novelas';
  if (/history|discovery|nat.?geo|animal.?planet|investigation|science/.test(n)) return 'documentales';
  if (/mtv|vh1|htv|musica|music/.test(n)) return 'musica';
  if (/bethel|relig|iglesia|gospel/.test(n)) return 'religiosos';
  if (/hgtv|home|health|estilo|fashion|food|lifestyle|tlc/.test(n)) return 'estilo';
  if (/canal.?13|chilevision|mega|tvn|caracol|rcn|telefe|el.?trece|america|azteca|las.?estrellas|univision|telemundo|antena|telecinco/.test(n)) return 'abiertos';
  return 'otros';
}

function parseM3U(text) {
  const lines = text.split(/\r?\n/);
  const out = [];
  let name = null;
  for (const line of lines) {
    const t = line.trim();
    if (t.startsWith('#EXTINF:')) {
      const m = t.match(/,(.+)$/);
      name = m ? m[1].trim() : 'Canal';
    } else if (t && !t.startsWith('#') && name) {
      out.push({
        id: 'tvlatam:' + slug(name),
        name,
        url: t,
        genre: detectGenre(name)
      });
      name = null;
    }
  }
  return out;
}

async function getChannels() {
  const now = Date.now();
  if (remoteCache && (now - remoteCacheTime) < CACHE_MS) return remoteCache;

  // Intentar listas remotas
  let remote = [];
  for (const url of REMOTE_LISTS) {
    try {
      const res = await fetch(url, { timeout: 8000 });
      if (res.ok) {
        const text = await res.text();
        if (text.includes('#EXTM3U')) {
          remote = remote.concat(parseM3U(text));
        }
      }
    } catch (e) {}
  }

  // Deduplicar por nombre
  const seen = new Set();
  const merged = [];
  for (const c of [...remote, ...CHANNELS]) {
    const key = c.name.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(c);
    }
  }

  remoteCache = merged.length ? merged : CHANNELS;
  remoteCacheTime = now;
  return remoteCache;
}

function toMeta(c) {
  return {
    id: c.id,
    type: 'tv',
    name: c.name,
    genres: [c.genre],
    posterShape: 'square',
    description: c.name + ' – Transmisión en vivo',
    background: null,
    logo: null
  };
}

// ========== MANIFEST ==========
const manifest = {
  id: 'com.tvlatam.live',
  version: '1.1.0',
  name: 'TV Latam',
  description: 'Canales en vivo de Latinoamérica, España e internacionales. Se actualiza automáticamente.',
  logo: 'https://via.placeholder.com/256x256.png?text=TV+Latam',
  resources: ['catalog', 'meta', 'stream'],
  types: ['tv'],
  catalogs: [
    {
      type: 'tv',
      id: 'tvlatam_all',
      name: 'TV Latam',
      extra: [
        { name: 'genre', options: CATEGORIES.map(c => c.name), isRequired: false },
        { name: 'search', isRequired: false },
        { name: 'skip', isRequired: false }
      ]
    }
  ],
  idPrefixes: ['tvlatam:'],
  behaviorHints: {
    adult: false,
    configurable: false
  }
};

const builder = new addonBuilder(manifest);

// Catalog
builder.defineCatalogHandler(async ({ type, id, extra }) => {
  if (type !== 'tv') return { metas: [] };

  let channels = await getChannels();

  // Filtro por género
  if (extra && extra.genre && extra.genre !== 'Todos') {
    const cat = CATEGORIES.find(c => c.name === extra.genre);
    if (cat && cat.id !== 'all') {
      channels = channels.filter(c => c.genre === cat.id);
    }
  }

  // Búsqueda
  if (extra && extra.search) {
    const q = String(extra.search).toLowerCase();
    channels = channels.filter(c => c.name.toLowerCase().includes(q));
  }

  // Paginación
  const skip = parseInt(extra && extra.skip, 10) || 0;
  const page = channels.slice(skip, skip + 100);

  return { metas: page.map(toMeta) };
});

// Meta
builder.defineMetaHandler(async ({ type, id }) => {
  if (type !== 'tv') return { meta: null };
  const channels = await getChannels();
  const c = channels.find(ch => ch.id === id);
  if (!c) return { meta: null };
  return { meta: toMeta(c) };
});

// Stream
builder.defineStreamHandler(async ({ type, id }) => {
  if (type !== 'tv') return { streams: [] };
  const channels = await getChannels();
  const c = channels.find(ch => ch.id === id);
  if (!c || !c.url) return { streams: [] };

  return {
    streams: [
      {
        name: 'TV Latam',
        title: c.name + ' – En vivo',
        url: c.url,
        behaviorHints: {
          notWebReady: false,
          bingeGroup: 'tvlatam-live'
        }
      }
    ]
  };
});

// ========== SERVER ==========
const addonInterface = builder.getInterface();
const app = express();

app.use(getRouter(addonInterface));

app.get('/', (req, res) => {
  res.send(`
    <html><body style="font-family:sans-serif;background:#111;color:#eee;padding:40px">
      <h1>TV Latam – Addon Stremio</h1>
      <p>Addon de canales en vivo latinoamericanos.</p>
      <p><b>Instalar en Stremio / Nuvio:</b></p>
      <code style="background:#222;padding:8px 12px;display:inline-block">
        ${req.protocol}://${req.get('host')}/manifest.json
      </code>
      <p style="margin-top:24px;color:#888">Versión ${manifest.version}</p>
    </body></html>
  `);
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`TV Latam addon corriendo en http://localhost:${PORT}/manifest.json`);
});
