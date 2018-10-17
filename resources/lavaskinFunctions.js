var fs = require('fs');

module.exports = {
    txtToArray: function(textFile) {
        let data = fs.readFileSync(textFile).toString();
        let returnArray = data.split("\n");
        return returnArray;
    },

    binaryToDecimal: function(binary) {
        let decimal = 0;
        let power = (binary.length - 1);

        //(D * 2^binary.length)
        for (let i = 0; i < binary.length; i++) {
            decimal += (parseInt(binary[i]) * Math.pow(2, power));

            power -= 1;
        }
        
        return decimal;
    },

    decimalToBinary: function(decimal) {
        if (decimal === 0)
            return 0;
        
        let bin = new Array();
        
        
        //Remainder is the binary. Keep diving by 2 till you reach zero
        while (decimal > 0) {
            bin.push(decimal % 2);
            decimal = Math.floor(decimal / 2);
        }

        //Reverse the array to recieve the correct answer
        let binString = "";
        while (bin.length > 0)
            binString += bin.pop();

        return binString;
    }
};