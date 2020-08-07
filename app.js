const list = document.querySelector('#cafe-list');
const form = document.querySelector('#add-coffee-shop');

const addCafe = (event) => {
  event.preventDefault();
  db.collection('cafes').add({
    name: form.name.value,
    city: form.city.value
  });
  form.name.value = '';
  form.city.value = '';
};

const deleteCafe = (event) => {
  event.stopPropagation();
  const cafeId = event.target.parentElement.getAttribute('data-id');
  db.collection('cafes').doc(cafeId).delete();
};

const renderCafe = (doc) => {
  var li = document.createElement('li');
  var name = document.createElement('span');
  var city = document.createElement('span');
  var cross = document.createElement('div');

  li.setAttribute('data-id', doc.id); // because ID isn't stored in the doc.data(), it's a top level property
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cross.textContent = 'X';

  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);
  list.appendChild(li);

  cross.addEventListener('click', deleteCafe);
}

db.collection('cafes').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    renderCafe(doc);
  });
});

// using where clause on db -> can be used to implement search feature later on
db.collection('cafes').where('city', '==', 'Toronto').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    console.log(doc);
  });
});

form.addEventListener('submit', addCafe);
