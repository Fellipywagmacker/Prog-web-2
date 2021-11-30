 ul = document.createElement('ul');
 ul.setAttribute('id', 'lista')
 document.querySelector('body').append(ul)
 
 document.querySelector('#cep').addEventListener('change', apagalista)

function procurar() {
	ddd = document.getElementById('cep').value
	fetch(`https://brasilapi.com.br/api/ddd/v1/${ddd}`)
	.then(retorno => {
		return retorno.json()
	})
	.then(dados => {
		dados.cities.forEach(dado => {
			crialista(dado)
		})
})
	}

function crialista(dado){
	li = document.createElement('li');
	li.textContent = dado
	document.querySelector('#lista').append(li)}

function apagalista(){
	itens = document.querySelectorAll('li')
	for(const item of itens){
		item.remove()
}}
