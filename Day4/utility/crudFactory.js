const getAllFactory = function(ElementModel){
    return async function(req,res){
    try{
        console.log("I am inside get method");
        const UserDataStore = await ElementModel.find();
        if(UserDataStore.length == 0){
            throw new Error("No users Found");
        }
        res.status(200).json({
            status:"success",
            message:UserDataStore
        })
    }
    catch(err){
        res.status(404).json({
            status:"Failure",
            message:err.message
        })
    }
}
}

const createFactory = function(ElementModel){
    return async function(req, res) {
  try {
    const ElementDetails = req.body;
    const element = await ElementModel.create(ElementDetails);
    res.status(200).json({
      status: "success",
      message: `added the element`,
      element,
    });
  } 
  catch(err){
    res.status(500).json({
        status:"failure",
        message:err.message
    })
  }
}
}

const getElementByIdFactory = function(ElementModel){
    return async function(req,res){
    try{
        const ElementId = req.params.ElementId;
        const ElementDetails = await ElementModel.findById(ElementId);
        if(ElementDetails == "no Product found"){
            throw new Error(`user with ${ElementId} not found`);
        }
        else{
            res.status(200).json({
            status:"success",
            message:ElementDetails
        })
        }
    }
    catch(err){
        res.status(404).json({
            status:"failure",
            message:err.message
        })
    }
}
}

const deleteByIdFactory = function(ElementModel){
    return async function(req,res){
    let {elementId} = req.params;
    try{
        let element = await ElementModel.findByIdAndDelete(elementId);
        res.status(200).json({
        status:"successfull deletion",
        message:element
        }) 
    }
    catch(err){ 
        res.status(404).json({
            status:"Failure",
            message:`User with id:${elementId} not found to delete`
        })
    }
}
}

export { getAllFactory, createFactory, getElementByIdFactory, deleteByIdFactory };
