type LujvoAndScore = { lujvo: string, score: number };

/*
jvozba(["lujvo","zbasu"]) ==> [{"lujvo":"jvozba","score":5858},{"lujvo":"luvzba","score":5878},{"lujvo":"jvozbas","score":6888},{"lujvo":"luvzbas","score":6908},{"lujvo":"jvozbasu","score":7897},{"lujvo":"luvzbasu","score":7917},{"lujvo":"lujvyzba","score":8008},{"lujvo":"lujvyzbas","score":9038},{"lujvo":"lujvyzbasu","score":10047}]
*/
function jvozba(arr: string[], forbid_la_lai_doi?: boolean): LujvoAndScore[] {
	var candid_arr: string[][] = [];

	for (var i = 0; i < arr.length; i++) {
		candid_arr.push(get_candid(arr[i], /*isLast:*/ i === arr.length - 1))
	}

	var answers: LujvoAndScore[] = create_every_possibility(candid_arr).map(function (rafsi_list: string[]) {
		var result = normalize(rafsi_list);
		return { lujvo: result.join(""), score: get_lujvo_score(result) };
	}).filter(function (d: LujvoAndScore) {
		var l = d.lujvo;
		return !(is_cmevla(l) && forbid_la_lai_doi
			&& (l.match(/^(lai|doi)/)
				|| l.match(/[aeiouy](lai|doi)/)
				|| l.match(/^la[^u]/)  // the fact that CLL explicitly forbids two sequences `la` and `lai` signifies that `lau` is not forbidden
				|| l.match(/[aeiouy]la[^u]/)
			)
		);
	}).sort(function (a, b) {
		return a.score - b.score;
	});

	return answers;
}

function is_cmevla(valsi: string): boolean {
	return valsi.length >= 1 && "aeiouy'".indexOf(valsi.charAt(valsi.length - 1)) === -1
}

function normalize(rafsi_list: string[]): string[] {
	if (rafsi_list.length < 2) {
		throw new Error("You need at least two valsi to make a lujvo");
	}

	var input: string[] = Array.from(rafsi_list); //copy
	var result: string[] = [input.pop()!]; // add the final rafsi


	while (input.length) {
		var rafsi: string = input.pop()!;
		var end = rafsi.charAt(rafsi.length - 1);
		var init = result[0].charAt(0);

		if (is_4letter(rafsi)) {
			result.unshift("y");
		} else if (is_C(end) && is_C(init) && is_permissible(end, init) === 0) {
			result.unshift("y");
		} else if (end === "n" && ["ts", "tc", "dz", "dj"].indexOf(result[0].slice(0, 2)) !== -1) {
			result.unshift("y");
		} else if (input.length === 0 && is_CVV(rafsi)) { //adapting first rafsi, which is CVV; gotta think about r-hyphen
			var hyphen = "r";
			if (result[0].startsWith("r")) {
				hyphen = "n";
			}

			if (rafsi_list.length > 2 || !is_CCV(result[0])) {
				result.unshift(hyphen);
			}
		} else if (input.length === 0 && is_CVC(rafsi) && is_tosmabru(rafsi, result)) {
			result.unshift("y");
		}

		result.unshift(rafsi);
	}

	return result;
}

function is_tosmabru(rafsi: string, rest: string[]): boolean {
	//skip if cmevla
	if (is_cmevla(rest[rest.length - 1])) { // ends with a consonant
		return false;
	}

	var index;
	for (var i = 0; i < rest.length; i++) {
		if (is_CVC(rest[i])) continue;

		index = i;
		if (rest[i] === "y" ||
			(
				() => {

					if (get_CV_info(rest[i]) !== "CVCCV") {
						return false;
					}
					let charAt2 = rest[i].charAt(2);

					if (!is_C(charAt2)) {
						throw new Error("Cannot happen");
					}

					let charAt3 = rest[i].charAt(3);
					if (!is_C(charAt3)) {
						throw new Error("Cannot happen");
					}

					return 2 === is_permissible(charAt2, charAt3);
				}
			)()
		) {
			break;
			// further testing
		} else {
			return false;
		}
	}

	if (typeof index === "undefined") {
		/* This can only occur if everything is CVC, but the that is a cmevla */
		throw new Error("Cannot happen");
	}

	//further testing

	var tmp1: string = rafsi;
	var tmp2 = rest[0];
	var j = 0;
	do {
		if (tmp2 === "y") return true;

		let a = tmp1.charAt(tmp1.length - 1);
		if (!is_C(a)) {
			throw new Error("Cannot happen");
		}

		let b = tmp2.charAt(0);
		if (!is_C(b)) {
			throw new Error("Cannot happen");
		}

		if (2 !== is_permissible(a, b)) {
			return false;
		}
		tmp1 = tmp2;
		tmp2 = rest[++j];
	} while (j <= index);
	return true;
}


function is_CVV(rafsi: string) {
	return (get_CV_info(rafsi) === "CVV"
		|| get_CV_info(rafsi) === "CV'V");
}

function is_CCV(rafsi: string) {
	return get_CV_info(rafsi) === "CCV";
}

function is_CVC(rafsi: string) {
	return get_CV_info(rafsi) === "CVC";
}

function is_4letter(rafsi: string) {
	return (get_CV_info(rafsi) === "CVCC"
		|| get_CV_info(rafsi) === "CCVC");
}

type Consonant = "r" | "l" | "n" | "m" | "b" | "v" | "d" | "g" | "j" | "z" | "s" | "c" | "x" | "k" | "t" | "f" | "p";
function is_permissible(c1: Consonant, c2: Consonant): 0 | 1 | 2 //2: initial ok; 1: ok; 0: none ok
{
	return ({
		r: { r: 0, l: 1, n: 1, m: 1, b: 1, v: 1, d: 1, g: 1, j: 1, z: 1, s: 1, c: 1, x: 1, k: 1, t: 1, f: 1, p: 1 },
		l: { r: 1, l: 0, n: 1, m: 1, b: 1, v: 1, d: 1, g: 1, j: 1, z: 1, s: 1, c: 1, x: 1, k: 1, t: 1, f: 1, p: 1 },
		n: { r: 1, l: 1, n: 0, m: 1, b: 1, v: 1, d: 1, g: 1, j: 1, z: 1, s: 1, c: 1, x: 1, k: 1, t: 1, f: 1, p: 1 },
		m: { r: 2, l: 2, n: 1, m: 0, b: 1, v: 1, d: 1, g: 1, j: 1, z: 0, s: 1, c: 1, x: 1, k: 1, t: 1, f: 1, p: 1 },
		b: { r: 2, l: 2, n: 1, m: 1, b: 0, v: 1, d: 1, g: 1, j: 1, z: 1, s: 0, c: 0, x: 0, k: 0, t: 0, f: 0, p: 0 },
		v: { r: 2, l: 2, n: 1, m: 1, b: 1, v: 0, d: 1, g: 1, j: 1, z: 1, s: 0, c: 0, x: 0, k: 0, t: 0, f: 0, p: 0 },
		d: { r: 2, l: 1, n: 1, m: 1, b: 1, v: 1, d: 0, g: 1, j: 2, z: 2, s: 0, c: 0, x: 0, k: 0, t: 0, f: 0, p: 0 },
		g: { r: 2, l: 2, n: 1, m: 1, b: 1, v: 1, d: 1, g: 0, j: 1, z: 1, s: 0, c: 0, x: 0, k: 0, t: 0, f: 0, p: 0 },
		j: { r: 1, l: 1, n: 1, m: 2, b: 2, v: 2, d: 2, g: 2, j: 0, z: 0, s: 0, c: 0, x: 0, k: 0, t: 0, f: 0, p: 0 },
		z: { r: 1, l: 1, n: 1, m: 2, b: 2, v: 2, d: 2, g: 2, j: 0, z: 0, s: 0, c: 0, x: 0, k: 0, t: 0, f: 0, p: 0 },
		s: { r: 2, l: 2, n: 2, m: 2, b: 0, v: 0, d: 0, g: 0, j: 0, z: 0, s: 0, c: 0, x: 1, k: 2, t: 2, f: 2, p: 2 },
		c: { r: 2, l: 2, n: 2, m: 2, b: 0, v: 0, d: 0, g: 0, j: 0, z: 0, s: 0, c: 0, x: 0, k: 2, t: 2, f: 2, p: 2 },
		x: { r: 2, l: 2, n: 1, m: 1, b: 0, v: 0, d: 0, g: 0, j: 0, z: 0, s: 1, c: 0, x: 0, k: 0, t: 1, f: 1, p: 1 },
		k: { r: 2, l: 2, n: 1, m: 1, b: 0, v: 0, d: 0, g: 0, j: 0, z: 0, s: 1, c: 1, x: 0, k: 0, t: 1, f: 1, p: 1 },
		t: { r: 2, l: 1, n: 1, m: 1, b: 0, v: 0, d: 0, g: 0, j: 0, z: 0, s: 2, c: 2, x: 1, k: 1, t: 0, f: 1, p: 1 },
		f: { r: 2, l: 2, n: 1, m: 1, b: 0, v: 0, d: 0, g: 0, j: 0, z: 0, s: 1, c: 1, x: 1, k: 1, t: 1, f: 0, p: 1 },
		p: { r: 2, l: 2, n: 1, m: 1, b: 0, v: 0, d: 0, g: 0, j: 0, z: 0, s: 1, c: 1, x: 1, k: 1, t: 1, f: 1, p: 0 }
	}[c1][c2] as (0 | 1 | 2));
}
