const addOpenStreetMapTiles = (map) => {
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
};

const setupLeafletDefaultIcons = () => {
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
};

const travelPinIcon = L.divIcon({
  className: "travel-map-pin",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -28],
});

const escapeHtml = (value) => {
  const element = document.createElement("div");
  element.textContent = value == null ? "" : String(value);
  return element.innerHTML;
};

const buildTravelPopup = (pin) => {
  const title = escapeHtml(pin.title || pin.place || "Travel note");
  const place = escapeHtml(pin.place || "");
  const description = escapeHtml(pin.description || "");
  const date = escapeHtml(pin.date || "");
  const url = escapeHtml(pin.url || "#");

  return `
    <div class="travel-map-popup">
      ${place ? `<p class="travel-map-popup-place">${place}</p>` : ""}
      <h2>${title}</h2>
      ${description ? `<p>${description}</p>` : ""}
      ${date ? `<p class="travel-map-popup-date">${date}</p>` : ""}
      <a href="${url}">Read post</a>
    </div>
  `;
};

const setupGeoJSONMaps = () => {
  document.querySelectorAll("pre>code.language-geojson").forEach((elem) => {
    const jsonData = elem.textContent;
    const backup = elem.parentElement;
    backup.classList.add("unloaded");

    const mapElement = document.createElement("div");
    mapElement.classList.add("map");
    backup.after(mapElement);

    const map = L.map(mapElement);
    addOpenStreetMapTiles(map);
    const geoJSON = L.geoJSON(JSON.parse(jsonData)).addTo(map);
    map.fitBounds(geoJSON.getBounds());
  });
};

const setupTravelMap = () => {
  const mapElement = document.getElementById("travel-map");
  const dataElement = document.getElementById("travel-map-data");

  if (!mapElement || !dataElement) {
    return;
  }

  const pins = JSON.parse(dataElement.textContent).filter((pin) => Number.isFinite(Number(pin.lat)) && Number.isFinite(Number(pin.lng)));
  const map = L.map(mapElement);
  addOpenStreetMapTiles(map);

  if (pins.length === 0) {
    map.setView([20, 0], 2);
    return;
  }

  const bounds = [];
  pins.forEach((pin) => {
    const latLng = [Number(pin.lat), Number(pin.lng)];
    bounds.push(latLng);
    L.marker(latLng, { icon: travelPinIcon }).addTo(map).bindPopup(buildTravelPopup(pin));
  });

  if (bounds.length === 1) {
    map.setView(bounds[0], 13);
  } else {
    map.fitBounds(bounds, { padding: [24, 24] });
  }
};

document.addEventListener("readystatechange", () => {
  if (document.readyState === "complete") {
    setupLeafletDefaultIcons();
    setupGeoJSONMaps();
    setupTravelMap();
  }
});
