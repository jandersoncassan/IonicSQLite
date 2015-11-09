var db = null;
 
var example = angular.module('starter', ['ionic', 'ngCordova'])
    .run(function($ionicPlatform, $cordovaSQLite) {
        $ionicPlatform.ready(function() {
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
            db = $cordovaSQLite.openDB("my.db");
			alert('BANCO CRIADO');
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
        });
    });

  example.controller("ExampleController", function($scope, $cordovaSQLite) {
 
	 $scope.resultado=[];
	 $scope.mensagemFinal ="Iniciou a parada";

    $scope.insert = function(firstname, lastname) {
		alert('INSERT');
        var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
		
        $cordovaSQLite.execute(db, query, [firstname, lastname]).then(function(res) {		
			$scope.mensagemFinal="FOI!" + res.insertId;
			$scope.resultado.push({mensagem:"Insert ok"});
            console.log("INSERT ID -> " + res.insertId);
        }, function (err) {
			$scope.mensagemFinal="ERRO! "+ err;
			$scope.resultado.push({mensagem:"FAIL"});
            console.error(err);
        });
    }
 
    $scope.select = function(lastname) {
		alert('SELECT');
        var query = "SELECT firstname, lastname FROM people WHERE lastname = ?";
        $cordovaSQLite.execute(db, query, [lastname]).then(function(res) {
            if(res.rows.length > 0) {
				$scope.resultado="SELECTED -> "+ res.rows.item(0).insertId + " " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname;
                console.log("SELECTED -> " + res.rows.item(0).id + " " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
    }
 
});