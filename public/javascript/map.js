const address = window.listingData.location;
const title = window.listingData.title;

fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
  .then(res => res.json())
  .then(data => {
    if (data && data.length > 0) {
      const lat = parseFloat(data[0].lat);
      const lng = parseFloat(data[0].lon);

      const map = L.map("map").setView([lat, lng], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker([lat, lng])
        .addTo(map)
        .bindPopup(`<b>${title}</b><br>${address}`)
        .openPopup();
    } else {
      document.getElementById("map").innerHTML = "⚠️ Location not found!";
    }
  })
  .catch(err => {
    console.error(err);
    document.getElementById("map").innerHTML = "⚠️ Error loading map!";
  });
