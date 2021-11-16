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

peças = document.querySelectorAll('img')
peças.forEach(peça => {
	peça.setAttribute('draggable', 'true')
	peça.addEventListener('dragstart', dragstart);
	peça.addEventListener('dragend', dragend);
})

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
	peçasvermelhas.forEach(peças => {peças.setAttribute('name', '');
                                   peças.name = peças.parentNode.id;})
	
	peçaspretas.forEach(peça => {peça.setAttribute('name', '');
                               peça.name = peça.parentNode.id;})
}


celulaspretas = []

celulas.forEach(celula =>{
	if (celula.style.backgroundColor == 'black'){
	celulaspretas.push(celula)}
})

celulaspretas.forEach(celulapreta => {
	celulapreta.addEventListener('dragover', dragover)
	celulapreta.addEventListener('dragenter', dragenter);
	celulapreta.addEventListener('dragleave', dragleave);
	celulapreta.addEventListener('drop', drop)
})

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
	a = parseInt(document.querySelector('.selecionado').parentNode.parentNode.id)
	b = parseInt(this.parentNode.id)
	c = parseInt(document.querySelector('.selecionado').name)
	d = parseInt(this.id)
	e = this
	
	if (movimentosvalidos(a,b,c,d,e) == true) {
		this.style.backgroundColor = 'black'
		this.append(document.querySelector('.selecionado'))
		document.querySelector('.selecionado').setAttribute('name', this.id)
	}
	else {
		this.style.backgroundColor = 'black' 
	}
					
				}



function movimentosvalidos(a,b,c,d,e){
	if (peçasvermelhas.indexOf(document.querySelector('.selecionado')) !== -1 )	{
		if (a == b + 1){
			if (d == c + 1 || d == c - 1){
				if (e.hasChildNodes() == false){
					return true
				}
				else {
					return false
				}
			}
		}
	}
	else{
		if (a == b - 1){
			if (d == c + 1 || d == c - 1){
				if (e.hasChildNodes() == false){
					return true
				}
				else {
					return false
				}
			}
		}
	}
	
}
