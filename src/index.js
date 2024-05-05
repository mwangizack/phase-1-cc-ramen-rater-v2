// index.js

// Callbacks
const handleClick = (ramen, name, restaurant, rating, comment) => {
  // Add code
  const imageSection = document.querySelector('#ramen-detail .detail-image')
  const nameSection = document.querySelector('#ramen-detail .name')
  const restaurantSection = document.querySelector('#ramen-detail .restaurant')
  const ratingSection = document.querySelector('#rating-display')
  const commentSection = document.querySelector('#comment-display')

  imageSection.src = ramen.src
  nameSection.textContent = name
  restaurantSection.textContent = restaurant
  ratingSection.textContent = rating
  commentSection.textContent = comment
};

const addSubmitListener = () => {
  // Add code
  const form = document.querySelector('#new-ramen')
  form.addEventListener('submit', e => {
    fetch('http://localhost:3000/ramens', {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify({
        name: e.target.new_name.value,
        restaurant: e.target.new_restaurant.value,
        image: e.target.new_image.value,
        rating: e.target.new_rating.value,
        comment: e.target.new_comment.value
      })
    })
    .then(res => res.json())
    .then(data => {
      displayRamens()
    })
    .catch(error => `Error adding new ramen: ${error}`)
  })
}

const displayRamens = () => {
  // Add code
  fetch('http://localhost:3000/ramens')
  .then(res => res.json())
  .then(data => {
    data.forEach(ramen => {
      const name = ramen.name
      const restaurant = ramen.restaurant
      const image = ramen.image
      const rating = ramen.rating
      const comment = ramen.comment

      const imageSection = document.querySelector('#ramen-menu')
      const ramenImage = document.createElement('img')
      ramenImage.src = image
      imageSection.appendChild(ramenImage)

      ramenImage.addEventListener('click', e => handleClick(e.target, name, restaurant, rating, comment))
    })
  })
  .catch(error => `Error fetching ramens: ${error}`)
};

const main = () => {
  // Invoke displayRamens here
  displayRamens()
  // Invoke addSubmitListener here
  addSubmitListener()
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
