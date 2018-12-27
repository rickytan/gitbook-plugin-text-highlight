module.exports = {
    hooks: {
        "page": function (page) {
            page.content = page.content.replace(/==([^=\n]+)==/g, "<mark>$1</mark>");
            return page;
        }
    }
};
