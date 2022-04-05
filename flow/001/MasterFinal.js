const express = require("express");
const router = express.Router();
var mongodb = require('../../function/mongodb');
var master_FN = "master_FN" ;


router.get('/flow001', async (req, res) => {

    res.json("testflow1");
});

router.post('/master-fn-data', async (req, res) => {

    let TYPE = await mongodb.find(master_FN,"TYPE",{});
    let UNIT = await mongodb.find(master_FN,"UNIT",{});
    let ITEMs = await mongodb.find(master_FN,"ITEMs",{});
    let MACHINE = await mongodb.find(master_FN,"MACHINE",{});
    let METHOD = await mongodb.find(master_FN,"METHOD",{});
    let SPECIFICATION = await mongodb.find(master_FN,"SPECIFICATION",{});
    let CALCULATE = await mongodb.find(master_FN,"CALCULATE",{}); //new

    let FREQUENCY = await mongodb.find(master_FN,"FREQUENCY",{});
    let INSTRUMENTS = await mongodb.find(master_FN,"INSTRUMENTS",{});
    let RESULTFORMAT = await mongodb.find(master_FN,"RESULTFORMAT",{});
    let TOLERANCE = await mongodb.find(master_FN,"TOLERANCE",{});
    
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


router.post('/master-fn-data-TYPE', async (req, res) => {
    let TYPE = await mongodb.find(master_FN,"TYPE",{});
    let ReturnSet = {"TYPE":TYPE,};
    res.json(ReturnSet);
});

router.post('/master-fn-data-UNIT', async (req, res) => {

    let UNIT = await mongodb.find(master_FN,"UNIT",{});
    let TYPE = await mongodb.find(master_FN,"TYPE",{});
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
    let ReturnSet = {"UNIT":UNIT,};
    res.json(ReturnSet);
});

router.post('/master-fn-data-ITEMs', async (req, res) => {

    let ITEMs = await mongodb.find(master_FN,"ITEMs",{});
    let TYPE = await mongodb.find(master_FN,"TYPE",{});
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

router.post('/master-fn-data-MACHINE', async (req, res) => {

    let MACHINE = await mongodb.find(master_FN,"MACHINE",{});
    let ReturnSet = {"MACHINE":MACHINE,};
    res.json(ReturnSet);
});

router.post('/master-fn-data-METHOD', async (req, res) => {

    let METHOD = await mongodb.find(master_FN,"METHOD",{});
    let ITEMs = await mongodb.find(master_FN,"ITEMs",{});
    let MACHINE = await mongodb.find(master_FN,"MACHINE",{});
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

router.post('/master-fn-data-SPECIFICATION', async (req, res) => {

    let SPECIFICATION = await mongodb.find(master_FN,"SPECIFICATION",{});
    let ITEMs = await mongodb.find(master_FN,"ITEMs",{});

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

router.post('/master-fn-data-CALCULATE', async (req, res) => {

    let CALCULATE = await mongodb.find(master_FN,"CALCULATE",{});
    let ReturnSet = {"CALCULATE":CALCULATE,};
    res.json(ReturnSet);
});



module.exports = router;
