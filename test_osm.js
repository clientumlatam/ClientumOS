async function run() {
  const city = "Cordoba";
  const industry = "Ferreteria";
  const query = `${industry} ${city}`;
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=15`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": "ClientumOS-B2BProspector/1.0 (clientumlatam@gmail.com)"
    }
  });
  if (!res.ok) {
    console.log("OSM Failed:", res.status);
    return;
  }
  const data = await res.json();
  console.log("OSM returned:", data.length, "results");
  if(data.length > 0) {
     console.log(data[0].display_name);
  }
}
run();
