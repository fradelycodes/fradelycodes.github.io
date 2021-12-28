fetch("https://www.theaudiodb.com/api/v1/json/2/search.php?s=coldplay")
  .then((res) => res.json())
  .then((data) => {
    let html = "";
    for (let coldplay of postsArr) {
      html += `
                <h3>${coldplay.strArtist}</h3>
               
                <hr />
            `;
    }
  });
