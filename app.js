const list = document.querySelector('#cafe-list');
const form = document.querySelector('#add-coffee-shop');

const renderCafe = (doc) => {
  var li = document.createElement('li');
  var name = document.createElement('span');
  var city = document.createElement('span');

  li.setAttribute('data-id', doc.id); // because ID isn't stored in the doc.data(), it's a top level property
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;

  li.appendChild(name);
  li.appendChild(city);
  list.appendChild(li);
}

db.collection('cafes').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    renderCafe(doc);
  });
});

const addCafe = (event) => {
  event.preventDefault();
  db.collection('cafes').add({
    name: form.name.value,
    city: form.city.value
  });
  form.name.value = '';
  form.city.value = '';
};

form.addEventListener('submit', addCafe);
