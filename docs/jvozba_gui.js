function jvozba_gui(txt) {
    txt = txt.replace(/h/g, "'");
    txt = txt.toLowerCase();
    var arr = txt.split(" ");
    var arr2 = [];
    arr = arr.filter(function (a) { return a !== ""; });
    if (arr.length === 0) {
        /* empty */
        return;
    }
    if (arr.length === 1) {
        output_corresponding_selrafsi(arr[0]);
        return;
    }
    try {
        for (var i = 0; i < arr.length; i++) {
            var dat = arr[i];
            if (dat.startsWith("-") || dat.endsWith("-")) { // "luj-" or "-jvo"
                arr[i] = search_selrafsi_from_rafsi(dat.replace(/-/g, ""));
            }
            arr2[arr2.length] = arr[i];
        }
        var answers = jvozba(arr, document.getElementById("lalaidoi").checked);
    }
    catch (e) {
        alert(e);
        return;
    }
    output_jvozba_answers(answers, arr2);
}
/* single rafsi -> dictionary */
function output_corresponding_selrafsi(rafsi) {
    var bare_rafsi = rafsi.replace(/-/g, "");
    var selrafsi = search_selrafsi_from_rafsi2(bare_rafsi);
    if (selrafsi) {
        var info = "<div class='txt'>-" + bare_rafsi + "- is a rafsi for {" + selrafsi + "}</div>";
        document.getElementById("res").innerHTML = info;
    }
    else {
        var info = "<div class='txt'>No word found for rafsi -" + bare_rafsi + "-</div>";
        document.getElementById("res").innerHTML = info;
    }
}
function output_jvozba_answers(answers, inputs) {
    var info = "<div class='txt'>Displaying results for {" + inputs.join(" ") + "}: <span class='bri'>brivla</span> <span class='cme'>cmevla</span></div>";
    var table = "<table>";
    for (var i = 0; i < answers.length; i++) {
        var word = answers[i].lujvo;
        var last = get_CV_info(word[word.length - 1]);
        table += "<tr class='" +
            (last === "V" ? "brivla" : "cmevla") + "'>";
        table += "<td>";
        if (last !== "V" && !(document.getElementById("lalaidoi").checked)) {
            table += ".";
        }
        table += word;
        if (last !== "V") {
            table += ".";
        }
        table += "</td>";
        table += "<td style='text-align: right;'>";
        table += answers[i].score;
        table += "</td>";
        table += "</tr>";
    }
    table += "</table>";
    document.getElementById("res").innerHTML = info + table;
}
function jvozba_gui_loaded() {
    // URL() supported by modern browsers
    var url = new URL(location.href);
    let jvozbaParam = url.searchParams.get('b');
    if (jvozbaParam) {
        document.getElementById("b").value = url.searchParams.get('b');
        jvozba_gui(document.getElementById("b").value);
    }
    let jvokahaParam = url.searchParams.get('d');
    if (jvokahaParam) {
        document.getElementById("d").value = url.searchParams.get('d');
        jvokaha_gui(document.getElementById("d").value);
    }
}
