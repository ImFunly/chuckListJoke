const botonDOM = document.getElementById("fetchJoke");
const listaChistesDOM = document.getElementById("jokeList");
const bodyDOM = document.querySelector("body");

const divDOM = document.createElement("div");
bodyDOM.insertBefore(divDOM, listaChistesDOM);
divDOM.appendChild(botonDOM);

const listaChistes = JSON.parse(localStorage.getItem("Chistes")) || [];
addToDOM(listaChistes);
//console.log(listaChistes);

botonDOM.addEventListener("click", getAPI);
//console.log(localStorage);

function getAPI() {
  fetch("https://api.chucknorris.io/jokes/random")
    .then((response) => {
      if (!response.ok) {
        throw new Error("La solicitud no fue exitosa");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(data.value);
      const chiste = data.value;

      createArray(chiste);
    });
}

function createArray(chiste) {
  listaChistes.push(chiste);
  //console.log(listaChistes);
  localStorage.setItem("Chistes", JSON.stringify(listaChistes));
  addToDOM(listaChistes);
}

function addToDOM(listaChistes) {
  listaChistesDOM.innerHTML = "";

  for (i in listaChistes) {
    const liChiste = document.createElement("li");
    liChiste.setAttribute("class", "liChiste");
    liChiste.textContent = listaChistes[i];
    listaChistesDOM.appendChild(liChiste);
  }
  //console.log(localStorage);
}

const resetButton = document.createElement("button");
resetButton.setAttribute("class", "resetButton");
bodyDOM.insertBefore(resetButton, listaChistesDOM);
resetButton.textContent = "Eliminar Chistes";
divDOM.appendChild(resetButton);

resetButton.addEventListener("click", () => {
  //console.log("Holaaa");
  //console.log(localStorage);
  localStorage.clear();
  listaChistesDOM.innerHTML = "";
  listaChistes.length = 0;

  //console.log(localStorage);
  //console.log(listaChistes);
});
