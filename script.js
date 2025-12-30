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
      let currencies = Object.values(Object.values(country)[2]).map(currency => {
        return `${currency.symbol} ${currency.name}`
      }).join(', ')
      
      if(population >= 1000000){
        population = `${(population/1000000).toFixed(2)} млн`
      }
      else if(population >= 1000){
        population = `${(population/1000).toFixed(2)} тыс`
      }
      else{
        population = `${population} чел`
      }

      list.insertAdjacentHTML('beforeend', `
      <div class="col">
        <div class="card">
          <img src="${photoUrl}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${region}</p>
            <p class="card-text">👨‍👩‍👧‍👦 ${population}</p>
            <p class="card-text">🗣️ ${languages}</p>
            <p class="card-text">💰 ${currencies}</p>
          </div>
        </div>
      </div>`)
    }
  })