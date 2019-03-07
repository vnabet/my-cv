angular.module('cvApp.services', []).factory(
    'worksDocument', function($http) {
        var WorksDocument = (function() {            
            
            function WorksDocument() {
                
            }
            
            WorksDocument.prototype.data;
            
            WorksDocument.prototype.load = function(pHandler) {
                var self = this;
                $http({method: 'GET', url: 'works.json'}).success(function(pData) {
                    self.data = pData;
                    if(pHandler) pHandler(pData);
                });
            }
            
            WorksDocument.prototype.get = function(pId) {
                //console.log(typeof pId);
                var lWork = {};
                
                if(this.data) {
                    
                    for(var lIndex in this.data) {
                        var work = this.data[lIndex];
            
                        if(work.id === pId || lIndex == pId) {
                            lWork = work;
                        }
                    }  
                }
                
                return lWork;
                 
            }
            
            return WorksDocument;
            
        })();
        
                    
        return new WorksDocument;
    }
    
)