const tamanhoCelula = 40;
let pecaId = 0;
document.body.append(criaTabuleiro());

function criaTabuleiro() {
    const tamanho = 8;
    let tabela = document.createElement('table');

    tabela.style.borderStyle = 'solid';
    tabela.style.borderSpacing = 0;
    tabela.style.margin = 'auto';

    for (let i = 0; i < tamanho; i++) {
        let linha = document.createElement('tr');
        tabela.append(linha);
        for (let j = 0; j < tamanho; j++) {
            let celula = document.createElement('td');
            linha.append(celula);

            celula.style.width = `${tamanhoCelula}px`;
            celula.style.height = `${tamanhoCelula}px`;
            if (i % 2 == j % 2) {
                celula.style.backgroundColor = 'black';
                if (i * 8 + j <= 24) {
                    celula.append(criaPeca('black'));
                } else if (i * 8 + j >= 40) {
                    celula.append(criaPeca('red'));
                }
            } else {
                celula.style.backgroundColor = 'white';
            }
        }
    };
    return tabela;
}

function criaPeca(cor) {
    let imagem = document.createElement('img');
    imagem.setAttribute('src', `${cor}.png`);
    imagem.setAttribute('width', `${tamanhoCelula-4}px`);
    imagem.setAttribute('height', `${tamanhoCelula-4}px`);
    return imagem;
}

//adcionando eventos às peças
peças = document.querySelectorAll('img')
peças.forEach(peça => {
	peça.setAttribute('draggable', 'true')
	peça.addEventListener('dragstart', dragstart);
	peça.addEventListener('dragend', dragend);
})


//separando as peças em duas listas diferentes
peçaspretas = []
peçasvermelhas = []

aux = 0
while (aux < 12) {
	peçaspretas.push(peças[aux]);
	aux += 1
}

aux2 = 12
while (aux < 24) {
	peçasvermelhas.push(peças[aux]);
	aux += 1
}


//mapeando o tabuleiro em eixos x e y;
aux = 0
celulas = document.querySelectorAll('td');
celulas.forEach(celula => {
	if (aux > 7) {
		aux = 0
	}
	celula.setAttribute('id', aux)
	aux += 1
})



id = 0
tr = document.querySelectorAll('tr')
tr.forEach(item => {
	item.setAttribute('id', id);
	id += 1
})

function darnomes() {
	peças.forEach(peça => {
		peça.setAttribute('name', '')
		peça.name = peça.parentNode.id;
	})
}


celulaspretas = []

celulas.forEach(celula =>{
	if (celula.style.backgroundColor == 'black'){
	celulaspretas.push(celula)}
})

// adcionando os eventos às células pretas;
celulaspretas.forEach(celulapreta => {
	celulapreta.addEventListener('dragover', dragover)
	celulapreta.addEventListener('dragenter', dragenter);
	celulapreta.addEventListener('dragleave', dragleave);
	celulapreta.addEventListener('drop', drop)
})


// definindo as funções
function dragstart() {
	this.classList.add('selecionado')
}

function dragend() {
	this.classList.remove('selecionado')
}

function dragover(e) {
	e.preventDefault()
}

function dragenter(e) {
	e.preventDefault();
	a = parseInt(document.querySelector('.selecionado').parentNode.parentNode.id)
	b = parseInt(this.parentNode.id)
	c = parseInt(document.querySelector('.selecionado').name)
	d = parseInt(this.id)
	e = this
	if (movimentosvalidos(a,b,c,d,e) == true) {
		this.style.backgroundColor = 'blue'
	}
	else {
		this.style.backgroundColor = 'red'
	}
}

function dragleave() {
	this.style.backgroundColor = 'black'
}

function drop(){
	indice = peçasvermelhas.indexOf(document.querySelector('.selecionado'))
	posy_inicial = parseInt(document.querySelector('.selecionado').parentNode.parentNode.id)
	posy_final = parseInt(this.parentNode.id)
	posx_inicial = parseInt(document.querySelector('.selecionado').name)
	posx_final = parseInt(this.id)
	destino_peça = this
	
	if (movimentosvalidos(posy_inicial,posy_final,posx_inicial,posx_final,destino_peça) == true) {
		this.style.backgroundColor = 'black'
		this.append(document.querySelector('.selecionado'))
		document.querySelector('.selecionado').setAttribute('name', this.id)
		if(comepeça(posy_final,posx_final,posx_inicial,indice) == true) {
		if (peçasvermelhas.indexOf(document.querySelector('.selecionado')) !== -1){
			if(posx_final < posx_inicial){
				tr[posy_final+1].childNodes[posx_final+1].childNodes[0].remove()
			}
			else{
				tr[posy_final+1].childNodes[posx_final-1].childNodes[0].remove()
			}
		}
		else {
			if(posx_final < posx_inicial){
				tr[posy_final-1].childNodes[posx_final+1].childNodes[0].remove()
			}
			else{
				tr[posy_final-1].childNodes[posx_final-1].childNodes[0].remove()
			}
		}
	}			
}
	else {
		this.style.backgroundColor = 'black' 
	}
		
}


/*nova função: analisa se a casa que está sendo pulada possui uma peça e verifica se a peça que está caprturando não é da mesma cor que a peça que está sendo capturada*/
function comepeça(posy_final,posx_final,posx_inicial,indice){
	if (indice !== -1){
	if (posx_final < posx_inicial) {
		if (tr[posy_final+1].childNodes[posx_final+1].hasChildNodes() == true){
			if (peçasvermelhas.indexOf(tr[posy_final+1].childNodes[posx_final+1].childNodes[0]) == -1){
			return true}
		}
		else {
			return false
		}
	}
	else {
		if (tr[posy_final+1].childNodes[posx_final-1].hasChildNodes() == true){
			if (peçasvermelhas.indexOf(tr[posy_final+1].childNodes[posx_final-1].childNodes[0]) == -1){
			return true}
		}
		else {
			return false
		}
	}
	}
	else {
		if (posx_final < posx_inicial){
		if (tr[posy_final-1].childNodes[posx_final+1].hasChildNodes() == true){
			if (peçaspretas.indexOf(tr[posy_final-1].childNodes[posx_final+1].childNodes[0]) == -1){
			return true}
		}
		else {
			return false
		}
	}
		else{
			if (tr[posy_final-1].childNodes[posx_final-1].hasChildNodes() == true){
			if (peçaspretas.indexOf(tr[posy_final-1].childNodes[posx_final-1].childNodes[0]) == -1){
			return true}
		}
		else {
			return false
		}
		}
	
	}


}

function movimentosvalidos(posy_inicial,posy_final,posx_inicial,posx_final,destino_peça){
	indice = peçasvermelhas.indexOf(document.querySelector('.selecionado'))
	if (peçasvermelhas.indexOf(document.querySelector('.selecionado')) !== -1 )	{
		if (posy_inicial == posy_final + 1){
			if (posx_final == posx_inicial + 1 || posx_final == posx_inicial - 1){
				if (destino_peça.hasChildNodes() == false){
					return true
				}
				else {
					return false
				}
			}
		}
		else if (posy_inicial == posy_final +2){
			if(posx_final == posx_inicial + 2 || posx_final == posx_inicial -2){
					if(comepeça(posy_final,posx_final,posx_inicial,indice) == true){
						if (destino_peça.hasChildNodes() == false){
						return true}
					}
				}
		}
	else {
		return false	}
			
		
}
	else{
		if (posy_inicial == posy_final - 1){
			if (posx_final == posx_inicial + 1 || posx_final == posx_inicial - 1){
				if (destino_peça.hasChildNodes() == false){
					return true
				}
				else {
					return false
				}
			}
		}
		else  if (posy_inicial == posy_final -2){
			if(posx_final == posx_inicial + 2 || posx_final == posx_inicial -2){
					if(comepeça(posy_final,posx_final,posx_inicial,indice) == true){
						if(destino_peça.hasChildNodes() == false){
						return true}
					}
				}
			else{
				return false
			}
	}
	
}}
