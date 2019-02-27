function P(value,newValue) {
		if(P.pointers === undefined){
			P.pointers = {next:0};
		}
		console.log(typeof value + ": " + value);
		if(value !== undefined){
			P.pointers[value.id] = newValue || P.pointers[value.id];
			return P.pointers[value.id];
		}
		if(!new.target) {
			return new P(value);
		}
		this.id = P.pointers.next;
		P.pointers.next++;
		P(this,value);
	}
