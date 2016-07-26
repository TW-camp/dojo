'use strict'
describe('zipcode transform to barcode', function () {
    it('should valid the right input zipcode of 10', ()=> {
        let zipcodes = '45056-1234';
        let zipcodeObj = validZipcodeFormat(zipcodes);

        let expected = {
            zipcodes: '45056-1234',
            type: true
        };

        expect(zipcodeObj).toEqual(expected);
    })

    it('should valid the true zipcode of 5', ()=> {
        let zipcodes = '25443';
        let zipcodeObj = validZipcodeFormat(zipcodes);

        let expected = {
            zipcodes: '25443',
            type: true
        };

        expect(zipcodeObj).toEqual(expected);
    })

    it('should valid the true zipcode of 9', ()=> {
        let zipcodes = '254434333';
        let zipcodeObj = validZipcodeFormat(zipcodes);

        let expected = {
            zipcodes: '254434333',
            type: true
        };

        expect(zipcodeObj).toEqual(expected);
    })

    it('should valid the wrong zipcode', ()=> {
        let zipcodes = '254435';
        let zipcodeObj = validZipcodeFormat(zipcodes);

        let expected = null

        expect(zipcodeObj).toEqual(expected);
    })

    it('should drop the hyphen', ()=> {
        let zipcodeObj = {
            zipcodes: '45056-1234',
            type: true
        };

        let zipcodeWithoutHyphen = dropHyphen(zipcodeObj);

        let expected = {
            zipcodes: [4, 5, 0, 5, 6, 1, 2, 3, 4],
            type: true
        };
        expect(zipcodeWithoutHyphen).toEqual(expected);
    })

    it('should add the checkcode', ()=> {
        let zipcodeWithoutHyphen = {
            zipcodes: [4, 5, 0, 5, 6, 1, 2, 3, 4],
            type: true
        };
        let zipcodeWithCheckcode = addCheckcode(zipcodeWithoutHyphen);
        let expected = {
            zipcodes: [4, 5, 0, 5, 6, 1, 2, 3, 4, 0],
            type: true
        };

        expect(zipcodeWithCheckcode).toEqual(expected);
    })

    it('should transform to barcode', ()=> {
        let zipcodeWithCheckcode = {
            zipcodes:[4, 5, 0, 5, 6, 1, 2, 3, 4, 0],
            type:true
        };
        let allTransforms = loadAllTransforms();
        let barcodeAfterTrans = barcodeTransform(zipcodeWithCheckcode, allTransforms);

        let expected = {
            barcodes: ['|', ':|::|', ':|:|:', '||:::', ':|:|:', ':||::', ':::||', '::|:|', '::||:', ':|::|', '||:::', '|'],
            type: true
        };

        expect(barcodeAfterTrans).toEqual(expected);
    })

    it('transform', ()=> {
        let zipcodes = '45056-1234';
        let zipcodeString = printBarcodes(zipcodes);
        let expected = `|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|`;
        expect(zipcodeString).toEqual(expected);
    })

    it('input the right barcodes',()=>{
        let barcodes =  `|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|`;
        let barcodeObj = validBarcodeFormat(barcodes);

        let expected = {
            barcodes:`|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|`,
            type:true
        }

        expect(barcodeObj).toEqual(expected);
    })

    it('input the wrong barcodes',()=>{
        let barcodes =  `|:|::|:|:|:||::::|:|::||::::||::|:|::||::|::|||:::|`;
        let barcodeObj = validBarcodeFormat(barcodes);

        let expected = null;
        expect(barcodeObj).toEqual(expected);

    })

    it('drop long lines',()=>{
        let barcodeObj = {
            barcodes:`|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|`,
            type:true
        }
        let barcodesWithoutLonglines = dropLongLines(barcodeObj);

        let expected = {
            barcodes:`:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::`,
            type:true
        }

        expect(barcodesWithoutLonglines).toEqual(expected);
    })

    it('split barcodes',()=>{
        let barcodeObj = {
            barcodes:`:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::`,
            type:true
        }

        let barcodesArray = splitBarcodes(barcodeObj);
        let expected = {
            barcodes:[':|::|',':|:|:','||:::',':|:|:',':||::',':::||','::|:|','::||:',':|::|','||:::'],
            type:true
        }

        expect(barcodesArray).toEqual(expected);
    })

    it('transform to zipcode',()=>{
        let splitedBarcodes ={
            barcodes:[':|::|',':|:|:','||:::',':|:|:',':||::',':::||','::|:|','::||:',':|::|','||:::'],
            type:true
        };
        let allTransforms=loadAllTransforms();
        let zipcodeArr=zipcodeTransform(splitedBarcodes,allTransforms);

        let expected = {
            zipcodes:[4,5,0,5,6,1,2,3,4,0],
            type:true
        }

        expect(zipcodeArr).toEqual(expected);
    })

    it('checkout and add',()=>{
        let zipcodeArr={
            zipcodes:[4,5,0,5,6,1,2,3,4,0],
            type:true
        };

        let zipcodesWithHyphen = checkoutCheckcode(zipcodeArr);
        let expected = {
            zipcodes:[4,5,0,5,6,'-',1,2,3,4],
            type:true
        }

        expect(zipcodesWithHyphen).toEqual(expected);
    })

    it('print zipcodes',()=>{
        let barcodes = `|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|`;
        let zipcodeString = printZipcodes(barcodes);

        let expected = '45056-1234';
        expect(zipcodeString).toEqual(expected);
    })

    it('zipcode to barcode',()=>{
        let zipcodesObj = {
            zipcodes: '45056-1234',
            type: true
        };

        let barcodeString = zipcodeToBarcode(zipcodesObj);
        let expected = {
            barcodes:['|',':|::|',':|:|:','||:::',':|:|:',':||::',':::||','::|:|','::||:',':|::|','||:::','|'],
            type:true
        };
        expect(barcodeString).toEqual(expected);
    })

    it('barcode to zipcode',()=>{
        let barcodesObj=
        {
            barcodes:`|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|`,
            type:true
        };

        let zipcodeStrWithCheckcode=barcodeToZipcode(barcodesObj);
        let expected = {
            zipcodes:[4,5,0,5,6,'-',1,2,3,4],
            type:true
        };

        expect(zipcodeStrWithCheckcode).toEqual(expected);

    })
});
