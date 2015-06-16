/**
*	State Error Range: 400-450
**/
var when = require("when"),
    log = require("log4js").getLogger("State-Api");

var router = require("./baseApi");

var State = require("../../models/State"),
	ApiResponse = require("../../objects/ApiResponse"),
	stateUtils = require("../../states");

router
	.get("/states", function(req, res){
		respObj = new ApiResponse();

		stateUtils.getAll().then(function(states){
			respObj.success(states);
    		res.json(respObj);

		}).catch(function(e){
			res.status(500).json(respObj);
		});
	})

	.post("/states/add", function(req, res){
		var name = req.body.name,
			transition = req.body.transition,
			bri = req.body.bri,
			color = req.body.color,
			respObj = new ApiResponse(),
			state;

		log.info(req.body);

		log.info("name [%s] transition [%s] bri [%s] color [%s]", name, transition, bri, color)

		// We can have either a room or a group as the state target
		if(name && transition && bri && color){

			// TODO: obv not the safest methodology. Decide if i care
			state = new State(req.body);
			log.info("Created new state [%o]", state);

			stateUtils.save(state).then(function(c){
				respObj.success(c);
        		res.json(respObj);

			}).catch(function(e){
				res.status(500).json(respObj);	
			});

		} else {
			log.error("Invalid state params [%o]", req.body);
	      	respObj.ErrorNo = 400;
	      	respObj.ErrorDesc = "Invalid state request";
	      	res.status(500).json(respObj);
		}

		
	})

	.delete("/states/:id", function(req, res){
	    var stateId = req.params.id;
	        respObj = new ApiResponse();

	    if(stateId){
	      stateUtils.delete(stateId).then(function(c){
	        if(c){
	          
	          // try to get all the remaining states to return on the response.
	          // The getAll() call is a convenience call and not critical. 
	          // Its isn't important enough to cause a failure response
	          // if that call fails just return back an empty success.
	          stateUtils.getAll().then(function(states){
	            respObj.success(states);
	            res.json(respObj);

	          }).catch(function(e){
	            respObj.success({});
	            res.json(respObj);

	          });

	        } else {
	          respObj.ErrorNo = 402;
	          respObj.ErrorDesc = "Unable to find state";
	          res.status(404).json(respObj);
	        }

	      }).catch(function(e){
	        respObj.ErrorNo = 403;
	        respObj.ErrorDesc = "Failed to remove state";
	        res.status(500).json(respObj);  
	  
	      });

	    } else {
	      log.error("Invalid stateId [%s]", stateId);
	      respObj.ErrorNo = 401;
	      respObj.ErrorDesc = "Invalid stateId"
	      res.status(500).json(respObj);
	    }

	  })


log.info("States api loaded");