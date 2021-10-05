const search = document.getElementById('search')
const numberSearch = document.getElementById('number')
const btnSearch = document.getElementById('btn')
const ContainerBook = document.getElementById('ContainerBook')
const select = document.getElementById('select__category')
const animation = document.querySelector('.animation')

btnSearch.addEventListener('click',  event => {
    event.preventDefault()

    ContainerBook.innerHTML = ''

    if (numberSearch.value < 1 || numberSearch.value > 40 || search.value === '') {
        return alert('Ошибка ввода названия или количества')
    }
    animation.style.display = 'block'

    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search.value.trim()}+${select.value.trim()}:&maxResults=${numberSearch.value}`)
        .then( function (response) {
            let data = response.data

            if (response.data.totalItems === 0) {
                animation.style.display = 'none'
               return ContainerBook.textContent = 'По вашему запросу не найдено книг!'
            }

            data.items.forEach(item => {
                let bookCase = document.createElement('div')
                bookCase.classList.add('book__case')

                bookCase.innerHTML = `
                    <img class="book__img" src="${item.volumeInfo.imageLinks.smallThumbnail}" alt="">
                    <div class="book__case-content">
                        <div class="">${item.volumeInfo.title}</div>
                        <a class="book__link" href="${item.volumeInfo.infoLink}" target="_blank">Подробнее о книге</a>
                    </div>
                `
                ContainerBook.appendChild(bookCase)
                animation.style.display = 'none'
             })
        })
        .catch(function (error, response) {
            if (response !== 200) {
                console.log(`Ошибка: ${error}`)
            }
        })
})