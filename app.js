const GITHUB_USERNAME = "bqio"; // CHANGE THAT

const API_REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`;
const API_AVATAR_URL = `https://github.com/${GITHUB_USERNAME}.png`;

const fetchRepos = async () => {
  const response = await fetch(API_REPOS_URL);
  const json = await response.json();
  return json;
};

const randInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

Vue.createApp({
  data() {
    return {
      repos: [],
      username: GITHUB_USERNAME,
      avatarUrl: API_AVATAR_URL,
      isLoaded: false,
    };
  },
  methods: {
    open(url) {
      window.open(url, "_blank");
    },
    randIcon() {
      return `&#${randInt(0x1f300, 0x1f5ff)};`;
    },
  },
  async mounted() {
    this.repos = await fetchRepos();
    document.title = this.username;
    this.isLoaded = true;
  },
}).mount("#app");
