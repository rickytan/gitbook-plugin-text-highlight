function isInsideCode(ranges, index) {
    var first = 0;
    var last = ranges.length - 1;
    while (first <= last) {
        var mid = ranges[Math.floor((first + last) / 2)];
        if (index < mid[0]) {
            last = Math.floor((first + last) / 2) - 1;
        } else if (index > mid[1]) {
            first = Math.floor((first + last) / 2) + 1;
        } else {
            return true;
        }
    }
    return false;
}

module.exports = {
    hooks: {
        "page:before": function (page) {
            var content = page.content;

            var codeReg = /(((^\s*)```)[^`]*$)[^\0]*?\n\2(?=\s*$)/gm;
            var codeRanges = [];
            var match = codeReg.exec(content);
            while (match !== null) {
                codeRanges.push([match.index, codeReg.lastIndex]);
                match = codeReg.exec(content);
            }
            
            page.content = content.replace(/==([^=\n]+)==/g, function (match, p1, offset, string) {
                if (isInsideCode(codeRanges, offset)) {
                    return match;
                }
                return "<mark>" + p1 + "</mark>";
            });
            return page;
        }
    }
};
