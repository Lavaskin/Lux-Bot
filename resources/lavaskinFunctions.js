var fs = require('fs');

module.exports = {
    txtToArray: function(textFile) {
        let data = fs.readFileSync(textFile).toString();
        let returnArray = data.split("\n");
        return returnArray;
    }
};