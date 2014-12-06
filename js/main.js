var req = new XMLHttpRequest();
req.open('get', 'build/data.json');
req.responseType = 'json';
req.addEventListener('load', onDataLoaded);
req.send();


function onDataLoaded(e) {
	console.log(this.response);
	var main = document.querySelector('main');

	var emails = this.response;
	emails.forEach(function(email) {
		var article = document.createElement('article');
		main.appendChild(article);
		var h2 = document.createElement('h2');
		h2.innerHTML = email.title;
		var div = document.createElement('div');
		div.innerHTML = email.contents;
		article.appendChild(h2);
		article.appendChild(div);
	});
}
