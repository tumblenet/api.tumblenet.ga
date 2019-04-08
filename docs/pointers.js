function P(value,newValue) {
	if(P.pointers === undefined){
		P.pointers = {next:0};
	}
	var type;
	try {
		type = value.constructor.name || typeof value;
	} catch(e) {
		type = typeof value;
	}
	//console.log(type + ": " + value);
	if(type == "Function") {
		value = new value();
		try {
			type = value.constructor.name || typeof value;
		} catch(e) {
			type = typeof value;
		}
	}
	if(value !== undefined && type == "P"){
		if(newValue !== undefined) {
			P.pointers[value.id] = newValue;
		}
		return P.pointers[value.id];
	}
	if(!new.target) {
		return new P(value);
	}
	this.id = P.pointers.next;
	this.toString = () => {
		var value = P.pointers[this.id];
		var type;
		try {
		 type = value.constructor.name || typeof value;
		} catch(e) {
			type = typeof value;
		}
		return "$" + this.id + ": " + type + " " + P.pointers[this.id];
	}
	P.pointers.next++;
	P(this,value);
}
