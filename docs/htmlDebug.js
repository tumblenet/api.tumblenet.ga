var all = document.getElementsByTagName("*");

for (var i=0, max=all.length; i < max; i++) {
	var item = all[i];
	var colorBorder = (all.length-i)*(256/all.length);
	
	item.style.position = "relative";
	item.style.border = `dashed hsl(${colorBorder},50%,50%)`;
}
