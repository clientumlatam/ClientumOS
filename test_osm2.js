async function run() {
  const city = "Cordoba";
  const industry = "Ferreteria";
  const query = `${industry} ${city}`;
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&extratags=1&limit=5`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": "ClientumOS-B2BProspector/1.0 (clientumlatam@gmail.com)"
    }
  });
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}
run();
