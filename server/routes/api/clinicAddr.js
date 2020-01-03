const express = require("express");
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const { handleError,ValidaError } = require('../../CenterErrorHandle/error')
//load patientBasicInfor model
const ClinicAddr = require("../../models/ClinicAddr");

// @route GET api/books/test
// @description tests books route
// @access Public
router.get("/test", (req, res) => res.send("clinicAdd route testing!"));


//@route POST api?ClinicAddr
//@description add/save ClinicAddr detail
//access public
//server validation "check"

router.post("/addClinicAdd/",[
    check('addrLn1','clinic address1 is required!!').not().isEmpty(),
    check('addrLn2','clinic address2 is required!!').not().isEmpty(),
    check('addrLn3','clinic address3 is required!!').not().isEmpty(),
    check('addrLn4','clinic address4 is required!!').not().isEmpty(),
    check('city','clinic city is required!!').not().isEmpty(),
    check('state','clinic state is required!!').not().isEmpty(),
    check('country','clinic country group is required!!').not().isEmpty(),
    check('zipCode','clinic zipCode is required!!').not().isEmpty(),
    check('cntactDtls.primPhnNum','clinic PrimPhnNum  is required!!').not().isEmpty(),
    check('cntactDtls.emlAddr','clinic emlAddr is required!!').not().isEmpty(),
    check('locdtls','clinic locdtls is required!!').not().isEmpty(),
    check('cntactDtls.website','clinic website is required!!').not().isEmpty()

    //check('pntnHabit','Your email id is not valid').not().isEmpty()
],
async function(req,res,next){
    console.log("triger data...")
    //validation check
    const errors=validationResult(req);
    console.log(req.body);
    if(!errors.isEmpty()){
        return res.status(422).jsonp(errors.array());
    }else{
        
        var checkEmailAndEmail=await ClinicAddr.findOne({'cntactDtls.EmlAddr':req.body.cntactDtls.emlAddr});
        console.info("email",req.body.cntactDtls.EmlAddr);
        var checkEmailAndPhone=await ClinicAddr.findOne({'cntactDtls.PrimPhnNum':req.body.cntactDtls.primPhnNum});
        console.info("phone",req.body.cntactDtls.PrimPhnNum);
        //var checkEmailAndPhone=await ClinicAddr.findOne({'cntactDtls.EmlAddr':req.body.cntactDtls.EmlAddr});
        /* check email and phone already exit in db */
        try {
            if(checkEmailAndPhone!=null)
            throw new ValidaError(422,"phone number already exit..")
            else if(checkEmailAndEmail!=null)
            throw new ValidaError(422,"Email id already exit..")
            else
            ClinicAddr.create(req.body)
           .then(clinicAdd => res.json(
                                  {id:clinicAdd.clinId,
                                   message: "ClinicAddress added successfully..",
                                   status:"200" }
                                   ))
           .catch(err =>res.status(500).json(err))        
        } catch (error) {
            next(error)
        }
    }    
         
});

/* @route PUT api?ClinicAddr
   @description add/save ClinicAddr detail
   @access public
   @param id:clicId
 */

 router.put("/updateClinicAdd",[
    check('addrLn1','clinic address1 is required!!').not().isEmpty(),
    check('addrLn2','clinic address2 is required!!').not().isEmpty(),
    check('addrLn3','clinic address3 is required!!').not().isEmpty(),
    check('addrLn4','clinic address4 is required!!').not().isEmpty(),
    check('city','clinic city is required!!').not().isEmpty(),
    check('state','clinic state is required!!').not().isEmpty(),
    check('country','clinic country group is required!!').not().isEmpty(),
    check('zipCode','clinic zipCode is required!!').not().isEmpty(),
    check('cntactDtls.primPhnNum','clinic PrimPhnNum  is required!!').not().isEmpty(),
    check('cntactDtls.emlAddr','clinic emlAddr is required!!').not().isEmpty(),
    check('locdtls','clinic locdtls is required!!').not().isEmpty(),
    check('cntactDtls.website','clinic website is required!!').not().isEmpty()
    //check('pntnHabit','Your email id is not valid').not().isEmpty()
],async function(req,res,next) {

//validation check
const errors=validationResult(req);
    if(!errors.isEmpty()){
        console.info("Error",errors);
        return res.status(422).jsonp(errors.array());
    }else{
       await ClinicAddr.findOneAndUpdate({ClinId:req.query.id},req.body)
                   .then(result =>{
                    console.info("result",result)
                       try {
                           if(result==null)
                           throw new ValidaError(404,"Unable to find " +req.query.id);
                           else
                           res.json(result);
                       } catch (error) {
                           next(error);
                       }
                   })
                   .catch(err =>res.json(err));    
    }            
 });


 //@rounte GET api/ClinicAddr
//@description get all information
// public access
/* parameter
    id:1111 mandotary field
    skips:1, //option
    limits:1 //option
*/
router.get("/getClinicAllAddress",(req,res,next) =>{

    let skipPage=Number(req.query.page);
    let limitPage=Number(req.query.size);

    console.log("skip",skipPage)
    console.log("query",req.query)
    ClinicAddr.find().skip(skipPage).limit(limitPage)
            .then(result =>{
                console.info("Result",result);
                try {
                    if(result.length==0)
                    throw new ValidaError(400, 'Unable to find');
                    else
                    res.json(result)
                    next()
                } catch (error) {
                    next()
                }
            })
            .catch(err =>res.json(err));
});



module.exports=router;

