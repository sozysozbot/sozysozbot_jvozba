function get_lujvo_score(rafsi_ynr_sequence) {
    var lujvo = rafsi_ynr_sequence.join("");
    var L = lujvo.length;
    var A = lujvo.split("'").length - 1;
    var H = 0;
    var R = 0;
    for (var i = 0; i < rafsi_ynr_sequence.length; i++) {
        switch (get_CV_info(rafsi_ynr_sequence[i])) {
            case "C":
            case "Y":
                H++;
                break; // ynr-hyphen
            case "CVCCV":
                R += 1;
                break;
            case "CVCC":
                R += 2;
                break;
            case "CCVCV":
                R += 3;
                break;
            case "CCVC":
                R += 4;
                break;
            case "CVC":
                R += 5;
                break;
            case "CV'V":
                R += 6;
                break;
            case "CCV":
                R += 7;
                break;
            case "CVV":
                R += 8;
                break;
        }
    }
    var V = (lujvo.match(/[aeiou]/g) || []).length;
    return (1000 * L) - (500 * A) + (100 * H) - (10 * R) - V;
}
/*
get_CV_info("jvo") === "CCV"
get_CV_info("ma'o") === "CV'V"
*/
function get_CV_info(v) {
    return v.split("").map(function (c) {
        if ("aeiou".indexOf(c) !== -1)
            return "V";
        if ("bcdfgjklmnprstvxz".indexOf(c) !== -1)
            return "C";
        if (c === "'")
            return "'";
        if (c === "y")
            return "Y";
    }).join("");
}
