const path = `https://601803ee971d850017a3f625.mockapi.io/members`;

const menu = document.getElementById("menu");
const toggle = document.getElementById('menuToggle').children[0];

const image = document.querySelector("#profile-image");
const bio = document.querySelector("#bio");
const userName = document.querySelector("#name");

const htmlContainer = document.querySelector("#html-container");
const cssContainer = document.querySelector("#css-container");
const jsContainer = document.querySelector("#js-container");

menu.addEventListener("click", (e) => {
  main(e.path[0].innerText)
});

async function main(option) {
  const me = await getData(path);

  let a = me.map(() =>
    option ? me.find(elem => elem.name == option) : me[0]
  ).filter(item => typeof item === 'object');

  populateFields(a);
  toggle.checked = false;
}

async function getData(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data);
}

function populateFields(data) {
  image.src = data[0].mugshot;
  bio.innerText = data[0].other.bio;
  userName.innerText = data[0].name + " " + data[0].surname;

  for (let index = 0; index < data[0].other.skills.html; index++) {
    htmlContainer.children[index].classList.add("accomplished");
  }
  for (let index = 0; index < data[0].other.skills.css; index++) {
    cssContainer.children[index].classList.add("accomplished");
  }
  for (let index = 0; index < data[0].other.skills.js; index++) {
    jsContainer.children[index].classList.add("accomplished");
  }
}

main();