	function encontrar_h() {
		h = 1
		e = []
	while (h <= 6) {
		if (document.querySelectorAll(`h${h}`).length > 0){
		document.querySelectorAll(`h${h}`).forEach(item => e.push(item));
		return e;
	}	
		else {
		h += 1;
	}}}
	x = 32
	
	function criabotao() {
		encontrar = encontrar_h()
		if (encontrar.length > 0) {
		primeiro = encontrar[0];
		primeiro.setAttribute('style', `font-size:${x}px`);
		botaoaumentar = document.createElement('input');
		botaoaumentar.setAttribute('type', 'button');
		botaoaumentar.setAttribute('onclick', 'aumenta()');
		botaoaumentar.setAttribute('value', '+')
		if (document.querySelectorAll('input').length <= 12){
		primeiro.append(botaoaumentar);
		}
		botaodiminuir = document.createElement('input');
		botaodiminuir.setAttribute('type', 'button');
		botaodiminuir.setAttribute('onclick', 'diminui()');
		botaodiminuir.setAttribute('value', '-')
		if (document.querySelectorAll('input').length <= 13){
		primeiro.append(botaodiminuir);
	}
	}}
	function aumenta() {
	   if ( x < 41){
	   x += 3;
	   primeiro.setAttribute('style', `font-size:${x}px`);  
	 }}

	function diminui() {
	   if (x > 23) {
	   x -= 3;
	   primeiro.setAttribute('style', `font-size:${x}px`)
	 }}
