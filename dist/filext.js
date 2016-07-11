var fileTypes = {
    // Blank Icon for Undefined Type
    blank:    "file_type_blank",

    // ---------- Images ----------
    afdesign: "file_type_affinitydesign",
    afphoto:  "file_type_affinityphoto",
    bmp:      "file_type_image",
    gif:      "file_type_image",
    jpeg:     "file_type_image",
    jpg:      "file_type_image",
    png:      "file_type_image",
    psd:      "file_type_photoshop",
    svg:      "file_type_svg",

    // ---------- Text ----------
    doc:      "file_type_word",
    docx:     "file_type_word",
    ppt:      "file_type_powerpoint",
    pptx:     "file_type_powerpoint",
    xls:      "file_type_excel",
    xlsx:     "file_type_excel",

    // ---------- Web ----------
    html:     "file_type_html",
    htmlTwig: "file_type_twig"
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