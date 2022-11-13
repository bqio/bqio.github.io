const cardList = document.querySelector("#card-list");
const app = document.querySelector("#app");
const loader = document.querySelector("#loader");

const GITHUB_REPOS_URL =
  "https://api.github.com/users/bqio/repos?per_page=100&sort=pushed";

const fetchRepos = async () => {
  const response = await fetch(GITHUB_REPOS_URL);
  const json = await response.json();
  return json;
};

const openRepo = (repo) => {
  window.open(repo.html_url, "_blank");
};

const addRepo = (repo) => {
  const cardItem = document.createElement("div");
  const cardTitle = document.createElement("div");
  const cardDescription = document.createElement("div");

  cardItem.classList.add("card-item");
  cardTitle.classList.add("card-title");
  cardDescription.classList.add("card-description");

  cardTitle.innerText = repo.name;
  cardDescription.innerText = repo.description;

  cardItem.appendChild(cardTitle);
  cardItem.appendChild(cardDescription);

  cardTitle.addEventListener("click", () => openRepo(repo));

  cardList.appendChild(cardItem);
};

const showNode = (node) => {
  node.style.display = "block";
};

const hideNode = (node) => {
  node.style.display = "none";
};

window.addEventListener("DOMContentLoaded", async () => {
  const repos = await fetchRepos();

  for (const repo of repos) {
    addRepo(repo);
  }

  hideNode(loader);
  showNode(app);
});
