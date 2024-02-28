document.addEventListener("DOMContentLoaded", async () => {
    try {
        let res = await fetch("https://restcountries.com/v3.1/all");
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await res.json();
        let contenedorPaises = document.querySelector("#countries-response");

        function mostrarPaises(paises) {
            contenedorPaises.innerHTML = ""; 
            paises.forEach((e, index) => {
                let tarjetaPais = document.createElement("div");
                tarjetaPais.className = "TarjetaPaises";
                tarjetaPais.innerHTML = `
                    <img src="${e.flags.png}">
                    <h3>Nombre país:</h3>
                    ${e.name.common}
                    <h3>Capital:</h3>
                    ${e.capital}
                    <div class="myModal modal">
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <img src="${e.flags.png}">
                        <h3>Nombre oficial</h3>
                        <p>${e.name.official}</p>
                        <h3>Capital</h3>
                        <p>${e.capital}</p>
                        <h3>Poblacion</h3>
                        <p>${e.population}</p>                    
                        <h3>Continente</h3>
                        <p>${e.continents}</p>
                        <h3>Area total</h3>
                        <p>${e.area}</p>
                        <button class="lessInfo">Menos Información</button>
                    </div>
                    </div>

                    <button class="moreInfo">Más Información</button>

                `;
                tarjetaPais.addEventListener("click", () => {
                    mostrarDetallesPais(index);
                });
                contenedorPaises.appendChild(tarjetaPais);
            });
        }

        function mostrarDetallesPais(index) {
                var modal = document.getElementsByClassName("myModal")[index];
                var btn = document.getElementsByClassName("moreInfo")[index];
                var span = document.getElementsByClassName("close")[index];
                var lessInfo = document.getElementsByClassName("lessInfo")[index];

                btn.onclick = function() {
                modal.style.display = "block";
                }

                span.onclick = function() {
                modal.style.display = "none";
                }

                lessInfo.onclick = function() {
                modal.style.display = "none";
                }

                window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
                }
        }

        mostrarPaises(data);

        document.querySelector("#input").addEventListener("input", (event) => {
            let paisesFiltrados = data.filter(e => e.name.common.toLowerCase().includes(event.target.value.toLowerCase()));
            mostrarPaises(paisesFiltrados);
        });
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
});
