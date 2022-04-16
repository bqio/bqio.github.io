const matchAll = (data, regexp) => {
  let temp;
  const results = [];
  while ((temp = regexp.exec(data)) !== null) {
    results.push(temp);
  }
  return results;
};

const fetchProjects = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/bqio/bqio.github.io/master/.gitmodules"
  );
  const data = await response.text();
  const regexp = /path = (.*)\n/g;
  return matchAll(data, regexp).map((el) => el[1]);
};

Vue.createApp({
  data() {
    return {
      projects: [],
    };
  },
  methods: {
    open(rep) {
      window.open(`https://bqio.github.io/${rep}`, "_blank");
    },
  },
  async mounted() {
    this.projects = await fetchProjects();
  },
}).mount("#app");
