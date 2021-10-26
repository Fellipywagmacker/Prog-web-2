function listaordenada()	{
			escrever = document.querySelector('ol')
			escrever.setAttribute('id', 'inicio')
			
			const encontrar = document.querySelectorAll('h2');
			const elementos = new Array();
			encontrar.forEach(resultado => { elementos.push(resultado.textContent)
			const inicio = document.createElement('a')
			inicio.setAttribute('name', resultado.textContent);
			inicio.setAttribute('href', '#inicio');
			inicio.textContent = " início"
			resultado.append(inicio);
			} );

			
			elementos.forEach(topico => {
				lista = document.createElement('li');
				escrever.append(lista);
				const ancora = document.createElement('a')
				ancora.setAttribute('href', `#${topico}`)
				ancora.textContent = topico
				lista.append(ancora)
			})
		
}
