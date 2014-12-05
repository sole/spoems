console.log('hey there');
document.body.appendChild(document.createTextNode('created on the fly'));

var req = new XMLHttpRequest();
req.open('get', 'build/data.json');
req.responseType = 'json';
req.addEventListener('load', onDataLoaded);
req.send();


function onDataLoaded(e) {
	console.log(this.response);
}
