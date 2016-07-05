var fileTypes = {
    blank:    "blank", // Blank Icon for Undefined Type
    html:     "html",
    htmlTwig: "twig",
    png:      "image",
    jpg:      "image",
    jpeg:     "image",
    gif:      "image",
    svg:      "image",
    bmp:      "image",
    docx:     "docx",
    doc:      "docx",
    pptx:     "pptx",
    ppt:      "pptx",
    xlsx:     "xlsx",
    xls:      "xlsx"
};

$('.filext').each(function(index) {
    // 0 = initial string
    // 1 = first ext (test.html)
    // 2 = second ext (test.html.twig)
    var extRaw = $(this).html().match(/\.([\w]+)\.?([\w]*)$/i);
    var ext;
    var icon = fileTypes[ext];

    if (extRaw[2]) {
        ext = extRaw[1] + extRaw[2].replace(/^[a-z]/g, extRaw[2][0].toUpperCase());
        // document.write(ext);
    } else {
        ext = extRaw[1];
    }

    if (!icon) {
        icon = fileTypes.blank;
    }

    // document.write(icon+'<br>'); // Debug
    $(this).html(
        '<img src="http://neil-smith.org/filext/icons/' + 
        icon + 
        '.svg" class="filext-icon" aria-hidden="true">' + 
        $(this).html()
    );
});