// client-side js
// run by the browser each time your view template is loaded

// replaced jQuery with an event listener
document.addEventListener("DOMContentLoaded", function(event) {
    
  fetch('/search-track').then(resp => resp.json()).then((data) => {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /search-track', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Display the track name
    var trackName = document.createElement
    (`<h3><a href="${data.external_urls.spotify}">${data.name}</a></h3>`); //very confused by the ${data.external}
    trackName.appendTo('#search-track-container');
    
    // Display the artist name
    var artists = '';
    
    data.artists.forEach(function(item) {
      artists = artists + item.name + ' ';
    });
    
    let h5 = document.createElement('h5');
    h5.innerText = artists;
    document.getElementById('search-track-container').append(h5);
    
    // Display the album art
    var img = document.createElement('<img/>');
    img.attr('src', data.album.images[0].url);
    img.appendTo('#search-track-container');
  });
  
    var httpRequest = new XMLHttpRequest()
    httpRequest.onreadystatechange = function (data) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /category-playlists', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Display the covers of the playlists
    data
      .forEach((c) => {
      document.getElementById('category-playlists-container').appendTo(`<br><h1>${c.name}</h1><br>`)
      c.data.playlists.items.map(function(playlist, i) {
      var img = document.createElement('<img class="cover-image"/>');
      img.attr('src', playlist.images[0].url);
      img.appendTo('#category-playlists-container');
    });
    })
  };
  httpRequest.open('GET', '/artists');
  httpRequest.send();
  
  
    var httpRequest = new XMLHttpRequest()
    httpRequest.onreadystatechange = function (data) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /audio-features', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // The audio features we want to show
    var keys = ["danceability", "energy", "acousticness", "speechiness", "loudness"]
    
    // Display the audio features
    keys.map(function(key, i) {
      if (data.hasOwnProperty(key)) {
        var feature = document.createElement('<p><span class="big-number">' + data[key] + ' </span>'  + key + '</p>');
        feature.appendTo('#audio-features-container');
      }
    });
  };
  httpRequest.open('GET', '/audio-features');
  httpRequest.send();
  
  
    var httpRequest = new XMLHttpRequest()
    httpRequest.onreadystatechange = function (data) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /artist', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Display the artist's image
    var img = document.createElement('<img class="circle-image" />');
    img.attr('src', data.images[0].url);
    img.appendTo('#artist-container');
    
    // Display the artist name
    var trackName = document.createElement('<h3>' + data.name + '</h3>');
    trackName.appendTo('#artist-container');
    
    // Display the artist's genres
    data.genres.map(function(genre, i) {
      var genreItem = document.createElement('<p>' + genre + '</p>');
      genreItem.appendTo('#artist-container');
    });
  };
  httpRequest.open('GET', '/artist');
  httpRequest.send();
  
    var httpRequest = new XMLHttpRequest()
    httpRequest.onreadystatechange = function (data) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /artist-top-tracks', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Display the audio features
    data.map(function(track, i) {
      var trackName = document.createElement('<li>' + track.name + '</li>');
      trackName.appendTo('#top-tracks-container');
    });
  };
  httpRequest.open('GET', '/artist-top-tracks');
  httpRequest.send();
});
  
