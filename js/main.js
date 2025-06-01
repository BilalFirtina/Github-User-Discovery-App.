const githubName = document.querySelector("#githubName");
const form = document.querySelector("#searchForm");
const clearButton = document.querySelector("#clearButton");
const clearButtonAll = document.querySelector("#clearButtonAll");

const github = new Github();
const ui = new UI();

runEventListeners();

function runEventListeners() {
  form.addEventListener("submit", search);
  clearButton.addEventListener("click", clearInput);
  clearButtonAll.addEventListener("click", clearSearchedUser);
  document.addEventListener("DOMContentLoaded", runPageLoaded);
}

function clearInput() {
  ui.clearInput();
}

function clearSearchedUser() {
  ui.clearSearchedUserFromUI();
  Storagex.clearAllSearchedUserFromLocalStorage();
}

function runPageLoaded() {
  ui.fillSearchedUserToUI();
}

function search(e) {
  e.preventDefault();
  const username = githubName.value.trim();
  if (username == null || username.trim() == "") {
    return alert("Lütfen Kullanıcı İsmi Giriniz");
  } else {
    github
      .getGithubData(username)
      .then((response) => {
        ui.addSearchedUserToUI(response.user.name);
        Storagex.addSearchedUsersToStorage(response.user.name);
        ui.addUserProfileToUI(response.user);
        document.querySelector("#showRepo").addEventListener("click", (e) => {
          e.preventDefault();
          ui.showRepos(response.repo);
        });
      })
      .catch((error) => console.log(error));
  }
}
