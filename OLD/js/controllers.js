/**
 * Contrôleur de la liste des réalisations
 * 
 * @param {Object} $scope
 * @param {Object} worksDocument
 */
function works($scope, worksDocument) {
    
    $scope.worksList = [];
    $scope.currentWork = {};
    
    $scope.carouselStyle = {};
    $scope.carouselStyle.left = '0px';
    $scope.carouselStyle.width = '0px';
    
    worksDocument.load(function(pData) {
        $scope.worksList = pData;
        
        $scope.select(0);
        
    });
    
    $scope.buttons = [];
    
    /**
     * Séléction d'une réalisation 
     * @param {Object} pId Id de la réalisation, par son index ou son nom
     */
    $scope.select = function(pId) {
        //console.log(pId);
        if($scope.worksList.length > 0) {
            
            _activate(pId);
            
            $scope.currentWork = worksDocument.get(pId);
            
            //maj carousel
            $scope.buttons = [];
            for(var lIndex in $scope.currentWork.images) {
            	$scope.buttons[lIndex] = (lIndex == 0 )?'&#xf111&nbsp;':'&#xf10c&nbsp;';
            }
                        
            $scope.carouselStyle.width = ($scope.currentWork.images.length * 320) + 'px';
            
            _updatePicture(0);
            
        }
    }
    
    /**
     * Activation d'une entrée dans le menu des réalisations 
     * @param {Object} pId Id de la réalisation, par son index ou son nom
     */
    function _activate(pId) {
        for(var lIndex in $scope.worksList) {
            
            var lWork = $scope.worksList[lIndex];
            
            lWork.active = '';
            
            if(lWork.id === pId || lIndex == pId) {
                lWork.active = 'active';
            }
        }
    }
    
    /**
     * Image suivante sur le carousel
     * @param {Object} pEvent Evènement de click
     */
    $scope.nextImage = function(pEvent) {
        
        if($scope.currentWork) {
        
            var lIndex = Math.abs(parseInt($scope.carouselStyle.left)) / 320;
           
           _display(lIndex + 1);
        }
        
        pEvent.preventDefault();
    }
    
    /**
     * Image précédente sur le carousel
     * @param {Object} pEvent Evènement de click
     */
    $scope.prevImage = function(pEvent) {
        
        if($scope.currentWork) {
            
            var lIndex = Math.abs(parseInt($scope.carouselStyle.left)) / 320;
           
           _display(lIndex - 1);
        }
        
        pEvent.preventDefault();
    }
    
    /**
     * Selection de l'image avec les boutons
     * 
     * @param {Object} pEvent Evènement de click
     */
    $scope.selectImage = function(pEvent) {
    	
    	_display(parseInt(pEvent.currentTarget.id));
    	
    	pEvent.preventDefault();
    }
    
    /**
     * Mise à jour du carousel en fonction de l'index de l'image
     * 
     * @param {Int} pIndex index de l'image à afficher 
     */
    function _display(pIndex) {
    	
    	if(pIndex >= $scope.currentWork.images.length) {
    		pIndex = 0
    	} else if(pIndex < 0) {
    		pIndex = $scope.currentWork.images.length - 1;
    	}
    	
    	_updatePicture(pIndex);
    	_updateButtons(pIndex);
    }
    
    /**
     * Affichage de l'image
     * 
     * @param {Int} pIndex index de l'image à afficher 
     */
    function _updatePicture(pIndex) {
    	$scope.carouselStyle.left = '-' + (pIndex * 320) + 'px';
    }
    
    /**
     * Mise à jour des boutons du carousel
     * 
     * @param {Int} pIndex index de l'image à afficher 
     */
    function _updateButtons(pIndex) {
    	
    	for(var lIndex in $scope.buttons) {
    		$scope.buttons[lIndex] = (lIndex == pIndex)?'&#xf111&nbsp;':'&#xf10c&nbsp;';	
    	}   	
    }
}


/**
 * Contrôleur du formulaire de contacts
 * 
 * @param {Object} $scope
 */
function contact($scope, $http) {
	
	$scope.form = {};
	$scope.sended = false;
	$scope.errors = false;
	
	/**
	 * Envoi du formulaire
	 * 
 	 * @param {Object} pEvent
	 */
	$scope.send = function() {
		
		var lRequestData ='';
		
		lRequestData += 'name=' + $scope.form.name + '&';
		lRequestData += 'email=' + $scope.form.email + '&';
		lRequestData += 'confirmEmail=' + $scope.form.confirmEmail + '&';
		lRequestData += 'message=' + $scope.form.message;
		
		
		$http({
		    method: 'POST',
		    url: 'services/mail.php',
		    data: lRequestData,
		    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}
		}).success(function(data, status, headers, config) {
			
			//console.log(data);
			$scope.errors = data.errormsg?data.errormsg:false;
			
			$scope.sended = data.sended=="true"?true:false;
			
			
			
		}).error(function(data, status, headers, config) {
		  	
		});
	}
	
}







		
/*$http({
    method: 'POST',
    url: 'services/mail.php',
    data: tutu,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
}).success(function(data, status, headers, config) {
	
	console.log(data);
	
}).error(function(data, status, headers, config) {
  	
});*/
