var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');


var LoginContainer = require('./components/login.jsx').LoginContainer;
var MessagesContainer = require('./components/messages.jsx').MessagesContainer;

ReactDOM.render(
  React.createElement(LoginContainer),
  document.getElementById('app')
);

function setupAjax(loggedInUser){
  $.ajaxSetup({
    beforeSend: function(xhr){
      xhr.setRequestHeader("X-Parse-Application-Id", "tiygvl");
      xhr.setRequestHeader("X-Parse-REST-API-Key", "slumber");
      if(loggedInUser){
        xhr.setRequestHeader("X-Parse-Session-Token", loggedInUser.sessionToken);
      }
    }
  });
}

setupAjax();

var myUrl = 'https://tiny-parse-server.herokuapp.com';

$('#signup').on('submit', function(event){
  event.preventDefault();

  var username = $('#signup-email').val();
  var password = $('#signup-password').val();

  var user = {
    username: username,
    password: password
  };

  $.post(myUrl + '/users', user).then(function(data){
    console.log(data);
  });

});


$('#login').on('submit', function(event){
  event.preventDefault();

  var username = $('#email-login').val();
  var password = $('#password-login').val();

  var user = {
    username: username,
    password: password
  };

  var url = myUrl + '/login?username=' +
    encodeURIComponent(username) + '&' +
    'password=' + encodeURIComponent(password);

    $.get(url).then(function(data){
      console.log(data);
      var userData = JSON.stringify(data);
      localStorage.setItem('user', userData);
    });

});

var loggedInUser = localStorage.getItem('user');

if (loggedInUser) {
  loggedInUser = JSON.parse(loggedInUser);
  loggedInUser.sessionToken;
  setupAjax(loggedInUser);

  $.get(myUrl + '/users/me').then(function(data){
    console.log(data);


  });

  ReactDOM.render(
    React.createElement(MessagesContainer),
    document.getElementById('messages')
  );

}
