const artistsName = [
  "rihanna",
  "porcelain_black",
  "pink",
  "the_amps",
  "lorde",
  "avicii",
  "wisin",
  "kane",
  "bad_bunny",
  "ozuna",
  "daddy_yankee",
  "yandel",
];

const localStorageArtistKey = "artistsData";

const getArtistsData = async () => {
  // We don't want to repeat the request if we already have that information on the browser
  // The Artist info is information that is rarer changed so we can save it in the js browser localStore
  let data = localStorage.getItem(localStorageArtistKey);
  // if (data) {
  //   return JSON.parse(data);
  // }

  const allArtistData = await Promise.all(
    artistsName.map(async (name) => {
      let artistData = await fetch(
        `https://theaudiodb.com/api/v1/json/2/search.php?s=${name}`
      ).then((data) => data.json());

      artistData = artistData.artists[0];

      let artistAlbums = await fetch(
        `https://theaudiodb.com/api/v1/json/2/album.php?i=${artistData.idArtist}`
      ).then((data) => data.json());

      // Add tracks to each album
      artistAlbums.album = await Promise.all(
        artistAlbums.album.map(async (albumData, index) => {
          const albumTracks = await fetch(
            `https://theaudiodb.com/api/v1/json/2/track.php?m=${albumData.idAlbum}`
          ).then((data) => data.json());
          return { ...albumData, ...{ tracks: albumTracks.track } };
        })
      );

      // Combine result of artistData with albumns data1
      return { ...artistData, ...{ albums: artistAlbums.album } };
    })
  );

  localStorage.setItem(localStorageArtistKey, JSON.stringify(allArtistData));

  return allArtistData;
};

const renderMusicSection = async () => {
  const artistsData = await getArtistsData();
  console.log("artistsData", artistsData);
  let html = "";

  for (let i = 0; i < artistsData.length; i++) {
    const albums = artistsData[i].albums;
    const lastAlbum = albums[albums.length - 1];

    html += `<div class="photo-ban"><img class="singer-photo" src="${artistsData[i].strArtistThumb}">
                  <div class="photo-overlay">
                      <div class="no-topper">
                          <div class="no-topper-c">
                              <h2>${artistsData[i].strArtist}</h2>
                              <p>${lastAlbum.strAlbum}</p>
                          </div>
                      </div>
                      <div class="hearts no-over"><img src="img/small-icon/iheart.svg"></div>
                      <a class="no-over">${lastAlbum.tracks.length} Tracks</a>
                  </div>
              </div>`;
  }
  document.querySelector(".music-container").innerHTML = html;
};

renderMusicSection();
