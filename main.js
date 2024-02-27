document.addEventListener("DOMContentLoaded", async () => {
    try {
        let res = await fetch("https://restcountries.com/v3.1/all");
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await res.json();
        let contenedorPaises = document.querySelector("#countries-response");

        data.forEach(e => {
            contenedorPaises.insertAdjacentHTML("beforeend", `
                <div class="TarjetaPaises">
                    <img src="${e.flags.png}">
                    <h3>Nombre país:</h3>
                    ${e.name.common}
                    <h3>Capital:</h3>
                    ${e.capital}
                </div>
            `);
        });
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
});
