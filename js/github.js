class Github {
  constructor() {
    this.url = "https://api.github.com/users/";
  }
  async getGithubData(username) {
    const userData = await (await fetch(this.url + username)).json();
    if (userData.message === "Not Found") {
      alert("Lütfen Geçerli Kullanıcı İsmi Giriniz");
      throw new Error("Lütfen Geçerli Kullanıcı İsmi Girinizz");
    }
    const repoData = await (await fetch(this.url + username + "/repos")).json();
    return {
      user: userData,
      repo: repoData,
    };
  }
}
