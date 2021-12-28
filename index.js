fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then((res) => res.json())
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    document.getElementById("author").textContent = `Photo By: ${data.user.name}`;
  })
  .catch((err) => {
    // Use a default background image/author
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`;
    document.getElementById("author").textContent = `Photo By: Dodi Achmad`;
  });

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
  .then((res) => {
    if (!res.ok) {
      throw Error("Something went wrong");
    }
    return res.json();
  })
  .then((data) => {
    /**
     * Challenge: Add the name and icon of the cryptocurrency
     * to the upper-left of the dashboard page
     *
     * Use `data.name` and `data.image.small` to access that info
     */
    document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `;

    document.getElementById("crypto").innerHTML += `
      <p>🎯: $ ${data.market_data.current_price.usd}</p>
      <p>👆: $ ${data.market_data.high_24h.usd}</p>
      <p>👇: $ ${data.market_data.low_24h.usd}</p>
    `;
  })
  .catch((err) => console.error(err));

function getCurrentTime() {
  const date = new Date();
  const shortDate = date.toLocaleTimeString("en-us", { timeStyle: "medium" });
  document.getElementById("time").textContent = shortDate;
}

setInterval(getCurrentTime, 1000);

navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperials`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Wheather data not available");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}
            `;
    })
    .catch((err) => console.error(err));
});
