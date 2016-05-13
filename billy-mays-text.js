function BillyMaysSampleText(name,product,price,phone) {
	name    = (name    || "Billy Mays");
	product = (product || "Oxi-Clean") + "™";
	price   = (price   || (_randint(10,30)-0.05));
	phone   = (phone   || "1-800-"+_randint(100,999)+"-"+_randint(1000,9999));
	var mult = 1, loop = 0, extra = "", output = "";
	function _randint(a,b) {
		return Math.round((b-a)*Math.random())+a;
	}
	function _chance(percent) {
		return percent > 100 * Math.random();
	}
	function _any(arr) {
		return arr[_randint(0,arr.length-1)];
	}
	function _punct() {
		return _any([".","!"]) + " ";
	}
	function _numword(x) {
		return ["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty"][x];
	}
	function _adjective() {
		return _any(["amazing","incredible","powerful","unbelievable","must-have","new","all new","brand new","awesome","useful","great","best","impressive","fresh","neat","cool","mildy interesting","fascinating","mystifying"]);
	}
	function _verb1() {
		return _any(["clean","cleanse","fight","eliminate","destroy","sanitize","explode","wipe away","rinse off","pick up","get rid of","remove","exterminate","exfoliate","preserve","fix","hide","kill","eradicate","murder"]);
	}
	function _verb2() {
		return _any(["cleans","cleanses","fights","eliminates","destroys","sanitizes","explodes","wipes away","rinses off","picks up","gets rid of","removes","exterminates","exfoliates","preserves","fixes","hides","kills","eradicates","murders"]);
	}
	function _noun() {
		return _any(["bacteria","germs","mold","mildew","grease","stains","scratches","tears","tough stains","urine","blood","dust","dirt","grime","rust","gunk","goo","the icky stuff","things","people","people you hate","your family","your in-laws","your ex","your haters"]);
	}
	function _extraproduct() {
		return _any(["a bucket of rubber duckies","a pack of Ticonderoga™ #2 pencils","a bottle of Dawn™ dishsoap","a tub of LEGOs™","a box of Russell Stover™ chocolates","a McDonald's Happy Meal™","a frisbee","a DVD copy of "+_any(["Star Wars VII™","Seinfeld™","Hot Wheels™"]),"the official {product} guide written by yours truly"]);
	}
	function shipping() {
		return _any(["if you pay ","with "])+_any(["processing","shipping"])+" & handling";
	}
	function free() {
		return _any(["free","absolutely free","free of charge"]);
	}
	function but_wait_theres_more() {
		return _any(["but wait, there's more","I'm not done yet","and that's not all","it gets even better","hold it right there"]);
	}
	
	// ---------------------GENERATE TEXT-------------------------- //
	
	output = _any(["Hi I'm {name}","I'm {name}","My name is {name}"]) + ", "
	       + _any(["introducing the {adjective} {product}","and today I'll show you the {adjective} {product}","here with another {adjective} product: {product}"]) + _punct();
	loop = _randint(1,3);
	while (loop--)
		output += _any(["you struggle to ","you just can't ","you try and try to ","you spend too long trying to "]) + "{verb1} {noun}. ";
	output += _any(["nothing you do works","nothing works no matter how much you try","you can't even finish the job","you're frustrated","it's just not good enough"]) + ". ";
	output += _any(["then you need {product}","stop what you're doing and use {product}","ditch that and get {product}","it's time you get {product}"]) + _punct()
		   + "{product} {verb2} {noun} " + _any(["like nothing else","better than the leading product","immediately","easily"]) + _punct();
	loop = _randint(1,3);
	while (loop--) output += "it {verb2}, ";
	output += "it even {verb2} {noun}" + _punct();
	output += _any(["for","for just","for the low price of"]) + " ${price}! ";
	output += _any(["just call the number on your screen: ","to order {product} right now, call: "]) + "{phone}. ";
	if (_chance(30)) {
		mult = _randint(2,10);
		output += but_wait_theres_more() + _punct();
		output += "if you " + _any(["","pick up the phone and ","give us a "]) + "call right now, "+ _any(["you'll get","you'll receive","we'll give you","we'll offer you "]) + mult + " times as much {product}" + ", " + free() + "! ";
	}
	if (_chance(60)) {
		extra = _extraproduct();
		output += but_wait_theres_more() + _punct();
		output += "if you call in the next " + (5*_randint(1,6)) + " minutes, " + _any(["we'll also throw in ","you also get "]) + extra + (_chance(50) ? ", a $" + _randint(5,100) + " value" : "") + (_chance(50) ? " (" + shipping() + ")" : ", " + free()) + _punct();
	}
	output += "you get " + (mult>1 ? _numword(mult) + " " : "") + "{product}" + (extra ? " and " + extra + " " : " ") + _any(["all for","for just","all for just","all for the low price of"]) + " ${price}, " + _any(["or your money back","satisfaction guaranteed","we'll repay you otherwise"]) + _punct();
	output += _any(["what are you waiting for?","you won't get a better deal anywhere else!","this is as good as it gets!"]) + " call now and order {product}!";
	
	// ---------------------PROCESS TEXT-------------------------- //

	for (var loop = 0, extra = "", thing; loop < output.length; loop++) {
		if (output[loop] == "{") {
			thing = "";
			while (output[++loop] != "}") thing += output[loop];
			switch (thing) {
				case "name":      thing = name;         break;
				case "product":   thing = product;      break;
				case "price":     thing = price;        break;
				case "phone":     thing = phone;        break;
				case "noun":      thing = _noun();      break;
				case "verb1":     thing = _verb1();     break;
				case "verb2":     thing = _verb2();     break;
				case "adjective": thing = _adjective(); break;
			}
			extra += thing;
		} else if (output[loop-2]+output[loop-1]== ". " || output[loop-2]+output[loop-1]== "! ") {
			extra += output[loop].toUpperCase();
		} else {
			extra += output[loop];
		}
	}
	output = extra;

	return output;
}