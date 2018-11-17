class Picture {
  constructor(src, title, id) {
    this.src = src;
    this.title = title;
    this.id = id;
  }

  create() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/pictures.json', true);

    // Передает правильный заголовок в запросе
    xhr.setRequestHeader('Content-type', 'application/json');

    const picture = this;
    xhr.onreadystatechange = function handleResponse() { // Вызывает функцию при смене состояния.
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 201) {
        picture.id = JSON.parse(this.response).id;
        picture.display();
      }
    };
    xhr.send(JSON.stringify({ picture: { src: this.src, title: this.title } }));
  }

  display() {
    const pictureDesk = document.querySelector('.images');
    const newPicture = document.createElement('div');
    newPicture.setAttribute('class', 'image-container');
    newPicture.setAttribute('data-id', this.id);


    newPicture.innerHTML = `
    <h2><button class="btn btn-info editButton"><i class="fas fa-edit"></i></button><button class="btn btn-success okButton">OK</button><span class="pictureTitle"> ${this.title}</span></h2>
    <input type="text" class="form-control editTitle">
    <div class="image-wrapper"><img src="${this.src}" class="img-thumbnail" alt="Responsive image">
    <button class="btn btn-danger deleteButton" type="delete">X</button></div>`;

    pictureDesk.appendChild(newPicture);
  }

  update() {
    const xhr = new XMLHttpRequest();
    xhr.open('PATCH', `http://localhost:3000/pictures/${this.id}.json`, true);

    // Передает правильный заголовок в запросе
    xhr.setRequestHeader('Content-type', 'application/json');

    const picture = this;
    xhr.onreadystatechange = function handleResponse(event) {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const imageContainer = document.querySelector(`[data-id="${picture.id}"]`);
        const okButton = imageContainer.querySelector('.okButton');

        okButton.style.display = 'none';
        imageContainer.querySelector('.editButton').style.display = 'block';
        imageContainer.querySelector('.editTitle').style.display = 'none';
        imageContainer.querySelector('.pictureTitle').innerText = picture.title;
      }
    };


    xhr.send(JSON.stringify({ picture: { id: this.id, title: this.title } }));
  }

  static index() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/pictures.json', true);

    // Передает правильный заголовок в запросе
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onreadystatechange = function handleResponse() { // Вызывает функцию при смене состояния.
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const pictures = JSON.parse(xhr.response);
        pictures.forEach((element) => {
          const picture = new Picture(element.src, element.title, element.id);
          picture.display();
        });

        // Запрос завершен. Здесь можно обрабатывать результат.
      }
    };
    xhr.send();
  }

  delete() {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `http://localhost:3000/pictures/${this.id}.json`, true);

    // Передает правильный заголовок в запросе
    xhr.setRequestHeader('Content-type', 'application/json');

    const picture = this;
    xhr.onreadystatechange = function handleResponse() { // Вызывает функцию при смене состояния
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 204) {
        document.querySelector(`[data-id="${picture.id}"]`).remove();
      }
    };

    xhr.send();
  }
}

const addButton = document.getElementById('addButton');
addButton.onclick = function createPictureByClick(event) {
  event.preventDefault();
  const src = document.getElementById('url').value;
  const title = document.getElementById('title').value;
  const picture = new Picture(src, title);
  picture.create();
};

document.querySelector('.images').addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.classList.contains('deleteButton')) {
    const { id } = event.target.closest('.image-container').dataset;
    const picture = new Picture(null, null, id);
    picture.delete();
  }

  if (event.target.classList.contains('editButton')) {
    const editTitle = event.target;
    const imageContainer = editTitle.closest('.image-container');

    editTitle.style.display = 'none';
    imageContainer.querySelector('.okButton').style.display = 'block';
    imageContainer.querySelector('.editTitle').style.display = 'block';
  }

  if (event.target.classList.contains('okButton')) {
    const okButton = event.target;
    const imageContainer = okButton.closest('.image-container');
    const { id } = event.target.closest('.image-container').dataset;
    const title = imageContainer.querySelector('.editTitle').value;
    const picture = new Picture(null, title, id);

    picture.update();
  }
});
// добавлять картинки в контейнер с классом с максимальной шириной и высотой
document.addEventListener('DOMContentLoaded', () => { // Аналог $(document).ready(function(){
  Picture.index();
});
