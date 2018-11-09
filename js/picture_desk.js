class Picture {
  constructor(url, title, id){
    this.url = url;
    this.id = id;
    this.title = title;
  }

  create() {
    var pictureDesk = document.querySelector(".images");
    var newPicture = document.createElement("div");
    newPicture.setAttribute("class", "image-container")

    newPicture.innerHTML = `
    <h2>${this.title}</h2>
    <img src="${this.url}" class="img-thumbnail" alt="Responsive image">
    <button data-id="5" class="btn btn-danger deleteButton" type="delete">X</button>`

    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://localhost:3000/pictures.json', true);

    //Передает правильный заголовок в запросе
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function() {//Вызывает функцию при смене состояния.
      if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 201) {
        pictureDesk.appendChild(newPicture)
      }
    }
    xhr.send(JSON.stringify({ picture: { src: this.url, title: this.title } }));
  }

  update() {
    var xhr = new XMLHttpRequest();
    xhr.open("PATCH", `http://localhost:3000/pictures.json/${this.id}`, true);

    //Передает правильный заголовок в запросе
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function() {//Вызывает функцию при смене состояния.
      if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        let updatedPicture = JSON.parse(xhr.response);
      }
    }

    xhr.send(JSON.stringify({ picture: { src: this.url, id: this.id, title: this.title } }));
  }

  index() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'http://localhost:3000/pictures.json', true);

    //Передает правильный заголовок в запросе
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function() {//Вызывает функцию при смене состояния.
      if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        var pictureIndex = JSON.parse(xhr.response)
        pictureIndex.forEach(function(element) {
          // this.index(element);
        })

        // Запрос завершен. Здесь можно обрабатывать результат.
      }
    }
    xhr.send();
  }

  delete() {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", `http://localhost:3000/pictures.json/${this.id}`, true);

    //Передает правильный заголовок в запросе
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function() {//Вызывает функцию при смене состояния.
      if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 204) {
        document.querySelector(`[data-id="${this.id}"]`).remove()
      }
    }

    xhr.send();
  }
}

let addButton = document.getElementById('addButton');
addButton.onclick = function() {
  event.preventDefault();
  let url = document.getElementById('url').value
  let title = document.getElementById('title').value
  let picture = new Picture(url, title);
  picture.create();
}

document.querySelector('.images').addEventListener('click', function(event){
  event.preventDefault();
  if (event.target.classList.contains('deleteButton')){
    event.target.parentElement.remove()
  }
});

//добавлять картинки в контейнер с классом с максимальной шириной и высотой
