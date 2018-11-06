class PictureDesk {
  constructor(url){
    this.url = url;
  }

  addPicture() {
    var pictureDesk = document.querySelector(".container");
    var newPicture = document.createElement("div");
    newPicture.setAttribute("class", "row")

    newPicture.innerHTML = `
      <div class="col-md-9 gallery-img">
        <img src="${this.url}" class="img-thumbnail rounded" alt="Responsive image">
      </div>
      <div class="col-md-3">
        <button class="btn btn-danger d-flex align-items-center" id="deleteButton" type="delete">X</button>
      </div>`

    pictureDesk.appendChild(newPicture)
  }

  deletePicture() {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", `http://localhost:3000/picture_desk/`, true);

    //Передает правильный заголовок в запросе
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function() {//Вызывает функцию при смене состояния.
      if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 204) {
        requestRow.remove()
      }
    }
    xhr.send();
  }
}

let addButton = document.getElementById('addButton');
addButton.onclick = function() {
  event.preventDefault();
  let url = document.getElementById('url').value
  let pictureDesk = new PictureDesk(url);
  pictureDesk.addPicture();
}

//добавлять картинки в контейнер с классом с максимальной шириной и высотой
