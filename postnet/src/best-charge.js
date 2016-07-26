function printBarcodes(zipcodes) {
    let zipcodesObj = validZipcodeFormat(zipcodes);
    let zipcodeWithoutHyphen = dropHyphen(zipcodesObj);
    let zipcodeWithCheckcode = addCheckcode(zipcodeWithoutHyphen);
    let allTransform = loadAllTransforms();
    let barcodeString = barcodeTransform(zipcodeWithCheckcode, allTransform);
    return barcodeString.barcodes.join("");
}

function printZipcodes(barcodes) {
    let barcodesObj = validBarcodeFormat(barcodes);
    let barcodesWithoutLonglines = dropLongLines(barcodesObj);
    let barcodesArray = splitBarcodes(barcodesWithoutLonglines);
    let allTransforms = loadAllTransforms();
    let zipcodeString = zipcodeTransform(barcodesArray,allTransforms);
    let zipcodeStrWithCheckcode = checkoutCheckcode(zipcodeString);
    return zipcodeStrWithCheckcode.zipcodes.join("");
}
function validZipcodeFormat(zipcodes) {
    let zipcodesArray = zipcodes.split("");
    let rightZipcodes = {
        zipcodes,
        type: true
    };
    let len = zipcodes.length;
    switch (len) {
        case 5:
            let a = zipcodesArray.filter((zipcode) => typeof (zipcode - 0) === 'number');
            if (a.length === zipcodesArray.length) {
                return rightZipcodes;
            }
            return null;
            break;

        case 9:
            let c = zipcodesArray.filter((zipcode) => typeof (zipcode - 0) === 'number');
            if (c.length === zipcodesArray.length) {
                return rightZipcodes;
            }
            return null;
            break;
        case 10:
            if (zipcodes.indexOf('-') === 5 && zipcodes.lastIndexOf('-') === 5) {
                let b = zipcodesArray.filter((zipcode) => isNaN(zipcode - 0) === false);
                if (b.length === 9) {
                    return rightZipcodes;
                }
                return null;
            }
            return null;
            break;
        default:
            return null;
    }
}
function dropHyphen({zipcodes, type}) {
    if (type) {
        let zipcodesStringArr = zipcodes.split("").filter((zipcode) => isNaN(zipcode - 0) === false);
        return {
            zipcodes: zipcodesStringArr.map((num) => {
                return parseInt(num);
            }),
            type: type
        }
    }
    return null;

}
function addCheckcode({zipcodes, type}) {
    if (type) {
        let codeSum = _.sum(zipcodes);

        zipcodes.push(codeSum % 10);
        return {
            zipcodes: zipcodes,
            type: type
        };
    }
    return null;

}
function barcodeTransform({zipcodes, type}, allTransforms) {
    if (type) {
        let a = zipcodes.map((singleCode) => {
            let hasCode = allTransforms.find(({zipcode,barcode}) => zipcode===singleCode);
            return hasCode.barcode;
        })

        a.push('|');
        a.unshift('|');
        return {
            barcodes: a,
            type: type
        };
    }
    return null;
}

function validBarcodeFormat(barcodes) {
    let len = barcodes.length;
    if (((len - 2) / 5 === 6 || (len - 2) / 5 === 10) && _.endsWith(barcodes, '|') && _.startsWith(barcodes, '|')) {
        return {
            barcodes: barcodes,
            type: true
        };
    }
    return null;
}
function dropLongLines({barcodes, type}) {
    if (type) {
        let barcodesStr = barcodes.substring(1, barcodes.length - 1);
        return {
            barcodes: barcodesStr,
            type
        }
    }
    return null;
}
function splitBarcodes({barcodes, type}) {
    if(type){
        let barcodesArr=[];
        for(let i=0;i<barcodes.length/5;i++){
            barcodesArr.push(barcodes.substr(i*5,5));
        }
        return {
            barcodes:barcodesArr,
            type
        }
    }
    return null;
}
function zipcodeTransform({barcodes, type},allTransforms) {
    if(type){
        let a = barcodes.map((singleCode)=>{
            let hasbarcode = allTransforms.find(({zipcode,barcode})=> barcode===singleCode);
            if(hasbarcode!==undefined){
                return hasbarcode.zipcode;
            }
        })
        return {
            zipcodes: a,
            type: type
        };
    }
    return null;
}
function checkoutCheckcode({zipcodes,type}) {
    if(type){
        let sum = _.sum(zipcodes);
        if(sum%10 === 0){
            zipcodes.splice(5,0,'-');
            zipcodes.pop();
            return{
                zipcodes,
                type
            }
        }
    }
    return null;
}

function zipcodeToBarcode(zipcodesObj) {
    let zipcodeWithoutHyphen = dropHyphen(zipcodesObj);
    let zipcodeWithCheckcode = addCheckcode(zipcodeWithoutHyphen);
    let allTransform = loadAllTransforms();
    let barcodeString = barcodeTransform(zipcodeWithCheckcode, allTransform);
    return barcodeString;
}

function barcodeToZipcode(barcodesObj) {
    let barcodesWithoutLonglines = dropLongLines(barcodesObj);
    let barcodesArray = splitBarcodes(barcodesWithoutLonglines);
    let allTransforms = loadAllTransforms();
    let zipcodeString = zipcodeTransform(barcodesArray,allTransforms);
    let zipcodeStrWithCheckcode = checkoutCheckcode(zipcodeString);
    return zipcodeStrWithCheckcode;
}