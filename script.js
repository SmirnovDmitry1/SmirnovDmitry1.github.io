const cmd = document.querySelector("#cmd");
const progLanguages = document.querySelector(".progLanguages");
const select = document.querySelector("#technologies");
const img = document.querySelector(".avatar");
const btnWorkExperience = document.querySelector("#addWorkExperience");
const removeBtnWorkExperience = document.querySelector("#removeWorkExperience");
const label = document.querySelector("label");
const pre = document.querySelector("pre");
const profiles = {};
const style = display();
const users = document.querySelector("#users");
const btnSave = document.querySelector("#save");
let arrayData = [];
let editUser = {
  id: null,
  edit: false,
};

const cycle = (block, display) => {
  const name = document.querySelectorAll(block);
  for (let i = 0; i < name.length; i++) {
    name[i].style.display = display;
  }
};
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
function display() {
  return {
    block() {
      const input = document.querySelectorAll("input");
      cycle("textarea", "block");
      cycle("p", "none");
      cycle("li", "none");

      for (let i = 1; i < input.length; i++) {
        if (input[i].className === "custom-input") {
          input[i].style.display = "inline-block";
        } else {
          input[i].style.display = "block";
        }
      }
      removeBtnWorkExperience.style.display = "inline-block";
      label.style.display = "block";
      select.style.display = "block";
      btnWorkExperience.style.display = "inline-block";
      img.style.display = "none";
      pre.style.display = "none";
      btnSave.setAttribute("disabled", "disabled");
      cmd.setAttribute("disabled", "disabled");
    },
    none() {
      cycle("textarea", "none");
      cycle("input", "none");
      cycle("p", "block");
      cycle("li", "");

      removeBtnWorkExperience.style.display = "none";
      label.style.display = "none";
      select.style.display = "none";
      btnWorkExperience.style.display = "none";
      img.style.display = "block";
      pre.style.display = "block";

      arrayData &&
        arrayData.forEach((data, key) => {
          if (data.name !== "avatar") {
            const block = document.querySelector(`.${data.name}`);
            if (block === null) {
              arrayData.splice(key, 1);
            } else {
              if (data.up) {
                block.innerHTML = data.value.toUpperCase();
              } else if (data.name === "email" || data.name === "skype") {
                block.innerHTML = `${data.name}: ${data.value}`;
              } else {
                block.innerHTML = data.value;
              }
            }
          }
        });
      btnSave.removeAttribute("disabled");
      cmd.removeAttribute("disabled");
    },
  };
}

const getInput = () => {
  const input = document.querySelectorAll("input");
  if (input[1].style.display === "" || input[1].style.display === "none") {
    style.block();
  } else {
    style.none();
  }
};

function recording(value, name, up = false) {
  let element = false;
  let key = null;
  arrayData &&
    arrayData.forEach((data, i) => {
      if (data.name === name) {
        element = true;
        key = i;
      }
    });
  if (element) {
    arrayData[key].value = value;
  } else {
    const data = {
      value: value,
      name: name,
      up: up,
    };
    arrayData.push(data);
  }
}

async function recordingImage(event, name) {
  const img = document.querySelector(`.${name}`);
  const label = document.querySelector(`.custom-file-upload`);
  url = await toBase64(event.target.files[0]);
  img.style.backgroundImage = `url('${url}')`;
  label.style.color = "#40b61c";
  label.style.fontWeight = "bold";
  label.textContent = "success";
  const data = {
    value: url,
    name: name,
  };
  arrayData.push(data);
}

function technology(counter) {
  progLanguages.innerHTML = "";
  for (let i = 0; i < counter; i++) {
    value = chekName(counter, `li${i}`);
    progLanguages.innerHTML += `
        <input id="li${i}" type="text" onchange="recording(this.value, 'li${i}', true)" style="display: block" value="${value}">
        <li class="li${i}" style="display: none">test</li>
        `;
  }
}

const chekName = (key, name) => {
  for (let i = 0; i < key; i++) {
    let value = "";
    for (let j = 0; j < arrayData.length; j++) {
      if (arrayData[j].name === name) {
        value = arrayData[j].value;
        return value;
      }
    }
  }
  return "";
};

let counter = 1;

const addWorkExperience = (remove) => {
  const achievements = document.querySelector(".achievements");

  if (remove) {
    counter !== 0 ? (counter -= 1) : null;
  } else {
    counter < 5 ? (counter += 1) : null;
  }

  achievements.innerHTML = "<h5>PROJECTS</h5>";
  for (let i = 0; i < counter; i++) {
    const valueExperience = chekName(counter, `experience${i}`);
    const valueWhoWorked = chekName(counter, `whoWorked${i}`);
    const valueNameProject = chekName(counter, `nameProject${i}`);
    const valueWhenWorked = chekName(counter, `whenWorked${i}`);
    achievements.innerHTML += `
            <div class="workExperience">
                <h6>
                    <p style="display: none" class="who-worked heading whoWorked${i}">FRONT-END DEVELOPER</p>
                    <p style="display: none" class="name-project heading nameProject${i}">GUEST NOW</p>
                    <p style="display: none" class="when-worked heading whenWorked${i}">2015-2018</p>
                    <input id="whoWorked${i}" value="${valueWhoWorked}" class="custom-input" style="display: inline-block" type="text" onchange="recording(this.value, 'whoWorked${i}', true)" placeholder="who worked">
                    <input id="nameProject${i}" value="${valueNameProject}" class="custom-input" style="display: inline-block" type="text" onchange="recording(this.value, 'nameProject${i}', true)" placeholder="name project">
                    <input id="whenWorked${i}" value="${valueWhenWorked}" class="custom-input" style="display: inline-block" type="text" onchange="recording(this.value, 'whenWorked${i}', true)" placeholder="when worked">
                </h6>
                <pre style="display: none" class="pre-class experience${i}">Creatio At Guest now you can purchase tickets to existing events,
                create your own, invite more people by e mail or sharing links, manage
                date and place of the event.
                Responsibilities: creating platform from scratch; support
                Tools & Technologies: HTML, React.js, Bootstrap</pre>
                <textarea id="experience${i}" style="display: block;" cols="55" rows="4" onchange="recording(this.value, 'experience${i}')" maxlength="305">${valueExperience}</textarea>
            </div>
        `;
  }
};

for (let i = 0; i < 13; i++) {
  select.innerHTML += `<option value="${i + 1}">${i + 1}</option>`;
}

async function saveProfile() {
  const specialty = document.querySelector("#specialty");
  const name = document.querySelector("#name");
  const surname = document.querySelector("#surname");
  const user = `${specialty.value} ${name.value} ${surname.value}`;
  profiles.nameUser = user;
  profiles.dataUser = JSON.stringify(arrayData);

  if (editUser.edit) {
    url = `https://blanks-8e16e.firebaseio.com/profiles/${editUser.id}.json`;
    method = "PUT";
  } else {
    url = `https://blanks-8e16e.firebaseio.com/profiles.json`;
    method = "POST";
  }

  await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(profiles),
  });

  arrayData = [];
  editUser = {
    id: null,
    edit: false,
  };
  test();
}

async function test() {
  let url = "https://blanks-8e16e.firebaseio.com/profiles.json?print=pretty";
  let response = await fetch(url);

  let answer = await response.json();

  const profiles = [];

  answer &&
    Object.keys(answer).forEach(async (key, index) => {
      profiles.push({
        id: key,
        name: answer[key].nameUser,
      });
    });
  users.innerHTML = "<h2>Список карточек</h2>";
  profiles.forEach((user) => {
    users.innerHTML += `<button onclick="downloadUser('${user.id}')" type="button" class="btn btn-outline-success">${user.name}</button>`;
  });
}

async function delet(key) {
  let url = `https://blanks-8e16e.firebaseio.com/profiles/${key}.json`;
  await fetch(url, {
    method: "DELETE",
  });

  test();
  const delet = document.querySelector("#delete");
  delet.innerHTML = ``;
  editUser = {
    id: null,
    edit: false,
  };
}

async function downloadUser(key) {
  editUser.id = key;
  editUser.edit = true;
  const delet = document.querySelector("#delete");
  delet.innerHTML = `<button onclick="delet('${key}')" type="button" class="btn btn-outline-danger">Удалить</button>`;
  const achievements = document.querySelector(".achievements");
  let url = `https://blanks-8e16e.firebaseio.com/profiles/${key}.json`;
  let response = await fetch(url);
  const img = document.querySelector(`.avatar`);
  let user = await response.json();
  arrayData = JSON.parse(user.dataUser);
  img.style.backgroundImage = `url('./img/avatar.jpeg')`;
  progLanguages.innerHTML = "";
  achievements.innerHTML = "<h5>PROJECTS</h5>";
  arrayData &&
    arrayData.forEach((data) => {
      if (data.name === "avatar") {
        const img = document.querySelector(`.${data.name}`);
        img.style.backgroundImage = `url('${data.value}')`;
      } else {
        for (let i = 0; i < 5; i++) {
          if (data.name === `whoWorked${i}`) {
            counter = i + 1;
            achievements.innerHTML += `
                        <div class="workExperience">
                            <h6>
                                <p class="who-worked heading whoWorked${i}"></p>
                                <p class="name-project heading nameProject${i}"></p>
                                <p class="when-worked heading whenWorked${i}"></p>
                                <input id="whoWorked${i}" class="custom-input" style="display: none;" type="text" onchange="recording(this.value, 'whoWorked${i}', true)" placeholder="who worked">
                                <input id="nameProject${i}" class="custom-input" style="display: none;" type="text" onchange="recording(this.value, 'nameProject${i}', true)" placeholder="name project">
                                <input id="whenWorked${i}" class="custom-input" style="display: none;" type="text" onchange="recording(this.value, 'whenWorked${i}', true)" placeholder="when worked">
                            </h6>
                            <pre class="pre-class experience${i}"></pre>
                            <textarea id="experience${i}" style="display: none;" cols="55" rows="4" onchange="recording(this.value, 'experience${i}')" maxlength="305"></textarea>
                        </div>
                    `;
          }
        }
        const block = document.querySelector(`.${data.name}`);
        const input = document.querySelector(`#${data.name}`);
        if (block === null) {
          null;
        } else {
          if (data.up) {
            block.innerHTML = data.value.toUpperCase();
          } else if (data.name === "email" || data.name === "skype") {
            block.innerHTML = `${data.name}: ${data.value}`;
          } else {
            block.innerHTML = data.value;
          }
          if (input.tagName === "TEXTAREA") {
            input.textContent = data.value;
          } else {
            input.setAttribute("value", data.value);
          }
        }
        for (let i = 0; i < 13; i++) {
          if (data.name === `li${i}`) {
            progLanguages.innerHTML += `
                <input id="li${i}" type="text" onchange="recording(this.value, 'li${i}', true)" style="display: none" value="${data.value}">
                <li class="li${i}">${data.value}</li>
                `;
          }
        }
      }
    });
}

test();
