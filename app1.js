
var mydata=[], data=[];

mydata =localStorage.getItem("jsondata");
console.log(mydata);
if(mydata!=null){
    data=JSON.parse(mydata);
    console.log(data);
    } else{
        data = [];
    }

function userobj(username1, firstname1, lastname1,email1, password1, phone1,location1) {
	this.username = username1;
	this.firstname = firstname1;
    this.lastname = lastname1;
	this.email = email1;
    this.password = password1;
  this.phone = phone1;
  this.location = location1;
}

messages = [ 
        {
            "id" :"0",
            "recipient":["Arun"],
            "recipient_img":"http://simpleicon.com/wp-content/uploads/user1.png",
            "sender":"Nanda",
            "sender_img":"http://simpleicon.com/wp-content/uploads/user1.png",
            "title":"This is a sample message to Arun.",
            "description":"This is a sample description to the message which has the above title",
            "created_at":"2017-01-19 09:45:00",
            "important":"0"
        },
		{
            "id" : "1",
            "recipient":["Varsha"],
            "recipient_img":"http://simpleicon.com/wp-content/uploads/user1.png",
            "sender":"mary",
            "sender_img":"http://simpleicon.com/wp-content/uploads/user1.png",
            "title":"This is a sample message to Arun.",
            "description":"This is a sample description to the message which has the above title",
            "created_at":"2017-01-19 09:45:00",
            "important":"0"
        },{
            "id" : "2",
            "recipient":["Nancy"],
            "recipient_img":"http://simpleicon.com/wp-content/uploads/user1.png",
            "sender":"monica",
            "sender_img":"http://simpleicon.com/wp-content/uploads/user1.png",
            "title":"This is a sample message to Arun.",
            "description":"This is a sample description to the message which has the above title",
            "created_at":"2017-01-19 09:45:00",
            "important":"0"
        },
		{
            "id":"3",
            "recipient":["Jane"],
            "recipient_img":"http://simpleicon.com/wp-content/uploads/user1.png",
            "sender":"rachel",
            "sender_img":"http://simpleicon.com/wp-content/uploads/user1.png",
            "title":"This is a sample message to Arun.",
            "description":"This is a sample description to the message which has the above title",
            "created_at":"2017-01-19 09:45:00",
            "important":"0"
        }
];
var app = angular.module('myApp',['ngRoute','ngStorage']);
app.config(function($routeProvider){
    $routeProvider
        .when('/',{
        templateUrl:'Login.html',
        controller:'logincontroller'
    })
    .when('/login',{
        templateUrl:'Login.html',
        controller:'logincontroller'
    })
    
    .when('/signup',{
        templateUrl:'signup.html',
        controller:'signupcontroller'
    })
    
    
    .when('/home',{
        templateUrl:'home.html'
    })
    .when('/profile',{
        templateUrl:'profile.html',
        controller:'profilecontroller'
    })
    .when('/messages',{
        templateUrl : 'messages.html',
        controller : 'messagecontroller'
    })
    .when('/messages/:id',{
        templateUrl : 'detail.html',
        controller : 'detailcontroller'
    })
    
    .when('/error',{
        template:'please try again later'
    })
    .otherwise({
        redirectTo:'/login'
    })
    })
var logincontroller=function($scope,$rootScope,$location){
     var mydata1 = localStorage.getItem("jsondata");
    console.log(mydata1);
         var obj=JSON.parse(mydata1);
    console.log(obj);
        //var objlen = obj.length;
    $scope.clicked = function(){
       
        
//        console.log(objlen);
//        console.log(mydata);
//        console.log(obj[0].username);
//        console.log("username from login page"+$scope.username);
//        console.log("password from login page"+$scope.password);
        var cntr=0;
        var un=$scope.username;
        var ps=$scope.password;
        angular.forEach(obj,function(elem,i){
            
            if(obj[i].username==un && obj[i].password == ps){
                $rootScope.id=i;
                console.log($rootScope.id);
                cntr++;
                console.log("true");
                
                //localStorage.setItem("index",i);
               
            }else{
                //console.log(false);
            }
        })
        if(cntr>0){
            $location.path('/home');
        }else{
            console.log("try again");
        }
//        for( i=0;i<objlen;i++){
//            
            //console.log("username from obj array"+obj[i].username);
            //console.log("password from obj array"+obj[i].password);
            
        
         //$location.path('/home');
        

 }
    $scope.signup=function(){
        $location.path('/signup')
    }
};
app.controller("logincontroller",logincontroller);


var signupcontroller = function($scope,$localStorage,$location){
 
    $scope.register=function(){

         var user1 = new userobj($scope.username, $scope.firstname, $scope.lastname,$scope.email, $scope.password, $scope.phone,$scope.loc);
         data.push(user1);
        localStorage.setItem("jsondata",JSON.stringify(data));
         $scope.username='';
        $scope.password='';
        $scope.firstname='';
        $scope.lastname='';
        $scope.email='';
        $scope.phone='';
        $scope.loc='';
        $location.path('/login');
    }
        

};
app.controller("signupcontroller",signupcontroller);

var profilecontroller = function($scope,$localStorage,$location,$rootScope,$compile){
    console.log($rootScope.id);
     var mydata2 = localStorage.getItem("jsondata");
    console.log("working till now");
    var obj1=JSON.parse(mydata2);
    console.log(obj1[$rootScope.id]);
    $scope.username = obj1[$rootScope.id].username;
    $scope.firstname = obj1[$rootScope.id].firstname;
    $scope.lastname = obj1[$rootScope.id].lastname;
    $scope.email = obj1[$rootScope.id].email;
    $scope.password = obj1[$rootScope.id].password;
    $scope.phone = obj1[$rootScope.id].phone;
    $scope.location = obj1[$rootScope.id].location;
    $scope.edit=function(){
        document.getElementById("btn_profile").remove(); 
        var btn = document.createElement("INPUT"); 
        btn.setAttribute("type", "button"); 
        btn.setAttribute("value", "save"); 
        btn.setAttribute("id", "btn_profile_save"); 
        btn.setAttribute("ng-click", "save()");
        document.getElementById("profileTR").appendChild(btn); 
        $compile(btn)($scope); 
        $("input").prop('disabled', false); 
     };
    $scope.save=function(){
        obj1[$rootScope.id].username = $('#uname_text').val().replace(/\./g, '-');
        obj1[$rootScope.id].firstname = $('#fname_txt').val().replace(/\./g, '-');
        obj1[$rootScope.id].lastname = $('#lname_txt').val().replace(/\./g, '-');
        obj1[$rootScope.id].email = $("#email_txt").val().replace(/\./g, '-');
        obj1[$rootScope.id].password = $('#pname_text').val().replace(/\./g, '-');
        obj1[$rootScope.id].phone = $('#phone_txt').val().replace(/\./g, '-'); 
        obj1[$rootScope.id].location = $('#location_txt').val().replace(/\./g, '-');
        localStorage.setItem('jsondata',JSON.stringify(obj1));
        console.log(obj1);
        
    }
}
app.controller("profilecontroller",profilecontroller);

var messagecontroller = function($scope){
    $scope.messages = messages;
    
}

app.controller('messagecontroller',messagecontroller);

var detailcontroller = function($scope,$routeParams){
    $scope.message = messages[$routeParams.id];
}

app.controller("detailcontroller",detailcontroller);



