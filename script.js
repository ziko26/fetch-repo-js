// Main variables 
let theInput = document.querySelector('.get-repos input'),
	getButton = document.querySelector('.get-button'),
	showData = document.querySelector('.show-data');
	
getButton.onclick = function () {
	getRepos();
};
// Get repos function
function getRepos (){
	if (theInput.value == '') {
		showData.innerHTML = '<span>Please Write your Github Uername</span>';
	}else{
		fetch(`https://api.github.com/users/${theInput.value}/repos`)
		.then((response) => response.json())
		.then((repos) => {
			showData.innerHTML = '';
			repos.forEach(rep => {
				// Creat the main div element
				let mainDiv = document.createElement('div'),
					repName = document.createTextNode(rep.name);
				mainDiv.appendChild(repName);
				 let theUrl = document.createElement('a'), //creat the repo url
				 	 theUrlText = document.createTextNode('Visit');
				 theUrl.appendChild(theUrlText);
				 theUrl.href = `https://github.com/${theInput.value}/${rep.name}`; // creat href
				 theUrl.setAttribute('target', '_blank');
				 mainDiv.appendChild(theUrl);	
				 // Creat Starts span
				 let starsSpan = document.createElement('span'),
				 	 StarsText = document.createTextNode(`Stars ${rep.stargazers_count}`);
				 starsSpan.appendChild(StarsText);
				 mainDiv.appendChild(starsSpan);
				 mainDiv.className = 'repo-box';	  
				showData.appendChild(mainDiv);	
				
			});
		});
	}
}