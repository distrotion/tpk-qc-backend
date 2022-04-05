const express = require("express");
const router = express.Router();
var mongodb = require('../../function/mongodb');
var master_IC = "master_IC" ;


router.get('/flow001', async (req, res) => {

    res.json("testflow1");
});

router.post('/master-ic-data', async (req, res) => {

    let TYPE = await mongodb.find(master_IC,"TYPE",{});
    let UNIT = await mongodb.find(master_IC,"UNIT",{});
    let ITEMs = await mongodb.find(master_IC,"ITEMs",{});
    let MACHINE = await mongodb.find(master_IC,"MACHINE",{});
    let METHOD = await mongodb.find(master_IC,"METHOD",{});
    let SPECIFICATION = await mongodb.find(master_IC,"SPECIFICATION",{});
    let CALCULATE = await mongodb.find(master_IC,"CALCULATE",{}); //new

    let FREQUENCY = await mongodb.find(master_IC,"FREQUENCY",{});
    let INSTRUMENTS = await mongodb.find(master_IC,"INSTRUMENTS",{});
    let RESULTFORMAT = await mongodb.find(master_IC,"RESULTFORMAT",{});
    let TOLERANCE = await mongodb.find(master_IC,"TOLERANCE",{});
    
    let ReturnSet = {
        "TYPE":TYPE,
        "UNIT":UNIT,
        "ITEMs":ITEMs,
        "MACHINE":MACHINE,
        "METHOD":METHOD,
        "SPECIFICATION":SPECIFICATION,
        "CALCULATE":CALCULATE,
        "FREQUENCY":FREQUENCY,
        "INSTRUMENTS":INSTRUMENTS,
        "RESULTFORMAT":RESULTFORMAT,
        "TOLERANCE":TOLERANCE,
    }
    res.json(ReturnSet);
});


router.post('/master-ic-data-TYPE', async (req, res) => {
    let TYPE = await mongodb.find(master_IC,"TYPE",{});
    let ReturnSet = {"TYPE":TYPE,};
    res.json(ReturnSet);
});

router.post('/master-ic-data-UNIT', async (req, res) => {

    let UNIT = await mongodb.find(master_IC,"UNIT",{});
    let TYPE = await mongodb.find(master_IC,"TYPE",{});
    for( i =0;i<UNIT.length;i++){
        for(j=0;j<TYPE.length;j++){
            if(TYPE[j]['masterID'] === UNIT[i]['TYPE']){
                UNIT[i]['TYPE-NAME'] = TYPE[j]['TYPE'];
                break;
            }else{
                UNIT[i]['TYPE-NAME'] = '';
            }
        }
    }
    let ReturnSet = {
        "UNIT":UNIT,
        "TYPE":TYPE,
};
    res.json(ReturnSet);
});

router.post('/master-ic-data-ITEMs', async (req, res) => {

    let ITEMs = await mongodb.find(master_IC,"ITEMs",{});
    let TYPE = await mongodb.find(master_IC,"TYPE",{});
    for( i =0;i<ITEMs.length;i++){
        for(j=0;j<TYPE.length;j++){
            if(TYPE[j]['masterID'] === ITEMs[i]['TYPE']){
                ITEMs[i]['TYPE-NAME'] = TYPE[j]['TYPE'];
                break;
            }else{
                ITEMs[i]['TYPE-NAME'] = '';
            }
        }
    }
    let ReturnSet = {"ITEMs":ITEMs,};
    res.json(ReturnSet);
});

router.post('/master-ic-data-MACHINE', async (req, res) => {

    let MACHINE = await mongodb.find(master_IC,"MACHINE",{});
    let ReturnSet = {"MACHINE":MACHINE,};
    res.json(ReturnSet);
});

router.post('/master-ic-data-METHOD', async (req, res) => {

    let METHOD = await mongodb.find(master_IC,"METHOD",{});
    let ITEMs = await mongodb.find(master_IC,"ITEMs",{});
    let MACHINE = await mongodb.find(master_IC,"MACHINE",{});
    for( i =0;i<METHOD.length;i++){
        for(j=0;j<ITEMs.length;j++){
            if(ITEMs[j]['masterID'] === METHOD[i]['ITEMs']){
                METHOD[i]['ITEMs-NAME'] = ITEMs[j]['ITEMs'];
                break;
            }else{
                METHOD[i]['TYPE-NAME'] = '';
            }
        }

        for(j=0;j<MACHINE.length;j++){
            if(MACHINE[j]['masterID'] === METHOD[i]['METHOD']){
                METHOD[i]['METHOD-NAME'] = MACHINE[j]['METHOD'];
                break;
            }else{
                METHOD[i]['METHOD-NAME'] = '';
            }
        }
    }
    let ReturnSet = {"METHOD":METHOD,};
    res.json(ReturnSet);
});

router.post('/master-ic-data-SPECIFICATION', async (req, res) => {

    let SPECIFICATION = await mongodb.find(master_IC,"SPECIFICATION",{});
    let ITEMs = await mongodb.find(master_IC,"ITEMs",{});

    for( i =0;i<SPECIFICATION.length;i++){
        for(j=0;j<ITEMs.length;j++){
            if(ITEMs[j]['masterID'] === SPECIFICATION[i]['ITEMs']){
                SPECIFICATION[i]['ITEMs-NAME'] = ITEMs[j]['ITEMs'];
                break;
            }else{
                SPECIFICATION[i]['TYPE-NAME'] = '';
            }
        }
    }
    let ReturnSet = {"SPECIFICATION":SPECIFICATION,};
    res.json(ReturnSet);
});

router.post('/master-ic-data-CALCULATE', async (req, res) => {

    let CALCULATE = await mongodb.find(master_IC,"CALCULATE",{});
    let ReturnSet = {"CALCULATE":CALCULATE,};
    res.json(ReturnSet);
});



module.exports = router;
