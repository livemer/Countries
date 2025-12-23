let list = document.querySelector('.countries')

fetch('https://restcountries.com/v3.1/all?fields=name,flags,region,population,languages,currencies')
  .then(response => response.json())
  .then(data => {
    for(let i = 0; i < data.length; i+=5){
      country = data[i]

      let photoUrl = country['flags']['png']
      let name = country['name']['official']
      let region = country['region']
      let population = country['population']
      let languages = Object.values(country['languages']).join(', ')
      let currency = Object.values(Object.values(country['currencies'])[0])
      let currencyName = currency[0]
      let currencySymbol = currency[1]
      
      list.insertAdjacentHTML('beforeend', `
      <div class="col">
        <div class="card">
          <img src="${photoUrl}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${region}</p>
            <p class="card-text">👨‍👩‍👧‍👦 ${(population/1000000).toFixed(3)} млн</p>
            <p class="card-text">🗣️ ${languages}</p>
            <p class="card-text">💰 ${currencySymbol} ${currencyName}</p>
          </div>
        </div>
      </div>`)
    }
  })