module.exports = {
    hooks: {
        "page:before": function (page) {
            page.content = page.content.replace(/==([^=\n]+)==/g, "<mark>$1</mark>");
            return page;
        }
    }
};
