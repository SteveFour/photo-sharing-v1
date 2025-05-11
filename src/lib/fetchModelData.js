// lib/fetchModelData.js
export default function fetchModel(path, callback) {
  const base = process.env.REACT_APP_API_BASE || "";

  const url = `${base}${path}`;
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then((data) => callback(null, data))
    .catch((err) => callback(err, null));
}
