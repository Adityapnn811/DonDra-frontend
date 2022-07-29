export default async function fetchData(url, options) {
    const response = await fetch(url, options);
    return response.json();
}