var fileTypes = {
    blank:    "blank", // Blank Icon for Undefined Type
    bmp:      "image",
    doc:      "docx",
    docx:     "docx",
    gif:      "image",
    html:     "html",
    htmlTwig: "twig",
    jpeg:     "image",
    jpg:      "image",
    png:      "image",
    ppt:      "pptx",
    pptx:     "pptx",
    svg:      "image",
    psd:      "ps",
    afdesign: "afdesign",
    afphoto:  "afphoto",
    xls:      "xlsx",
    xlsx:     "xlsx"
};

$('.filext').each(function(index) {
    // 0 = initial string
    // 1 = first ext (test.html)
    // 2 = second ext (test.html.twig)
    var extRaw = $(this).html().match(/\.([\w]+)\.?([\w]*)$/i);
    var ext;

    if (extRaw[2]) {
        ext = extRaw[1] + extRaw[2].replace(/^[a-z]/g, extRaw[2][0].toUpperCase());
    } else {
        ext = extRaw[1];
    }

    var icon = fileTypes[ext];
    if (!icon) {
        icon = fileTypes.blank;
    }

    // document.write(icon+'<br>'); // Debug
    $(this).html(
        '<img src="icons/' + 
        icon + 
        '.svg" class="filext-icon" aria-hidden="true">' + 
        $(this).html()
    );
});