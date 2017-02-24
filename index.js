// var request = require('superagent');
var domain = 'http://localhost:9000';
var todoUrl = domain + '/todo';
var listUrl = domain + '/todo/items/';
var count = 0;
var todoLists = [];
var currentId = '';
/*$(document).ready(function () {   
    var table = $('#todoDataTable').DataTable();
    $('#todoDataTable').on('click', 'tr', function () {
    		console.log('ádasdasdasdsadasdasdadasdasdasdas');
        console.log(table.row(this).data());
    });
});*/

//

function homepageLoad() {
	count = 0;
	currentId = null;
	if (false) {
		for (var i in todoLists) {
			var table = document.getElementById("todolists");
			var newRow = table.insertRow(++count);
			newRow.className = "row";
			newRow.insertCell(0).innerHTML = todoLists[i].name;
			newRow.insertCell(1).innerHTML = todoLists[i].type;
			newRow.insertCell(2).innerHTML = todoLists[i].numberOfItem;
			newRow.insertCell(3).innerHTML = todoLists[i].count;
			newRow.setAttribute('id', todoLists[i].getAttribute('id'));
			console.log(todoLists.getAttribute['id']);
			newRow.addEventListener('click', function(){
				window.location.href = "items.html?id=" + this.getAttribute('id');
			})
		}
	}
	else {
		todoLists = [];
		loadMore();
	}
}

function loadMore() {
	var link = todoUrl + '?' + 'skip=' + count + '&limit=' + 10;
	console.log(link);
	$.get(link, function(res, status) {
		// var table = document.getElementById("todolists");
		var table = $("#todolists");
		for (var i in res) {
			var table = document.getElementById("todolists");
			var newRow = table.insertRow(count + 1);
			newRow.className = "row";
			// res._id
			newRow.insertCell(0).innerHTML = res[i].name;
			newRow.insertCell(1).innerHTML = res[i].type;
			newRow.insertCell(2).innerHTML = res[i].numberOfItem;
			newRow.insertCell(3).innerHTML = ++count;
			newRow.setAttribute('id', res[i]._id);
			newRow.addEventListener('click', function(){
				window.location.href = "items.html?id=" + this.getAttribute('id');
			})
			todoLists.push(newRow);
		}
	})
}

function getItems(todo_id) {
	$.get(listUrl + todo_id, function(res, status) {
		console.log(res);
		var table = document.getElementById("todolists");
		$('#todolists .row').remove();
		var items = res.items;
		for (var i in items) {
			var newRow = table.insertRow(++count);
			newRow.className = "row";
			// res._id
			newRow.insertCell(0).innerHTML = items[i].title;
			newRow.insertCell(1).innerHTML = new Date(items[i].created_at);
			newRow.insertCell(2).innerHTML = items[i].description;
			newRow.insertCell(3).innerHTML = count;
		}
	})
}

function addTodo() {
	var todoName = document.getElementById("todo-name").value;
	var todoType = document.getElementById('todo-type').value;
	console.log('value todo', todoName, todoType);
	if(todoName !== '') {
		var form = {
			name: todoName,
			type: todoType
		};
		$.post(todoUrl, form, function(res, status) {
			var table = document.getElementById("todolists");
			var newRow = table.insertRow(count + 1);
			newRow.className = "row";
			// res._id
			newRow.insertCell(0).innerHTML = res.name;
			newRow.insertCell(1).innerHTML = res.type;
			newRow.insertCell(2).innerHTML = res.numberOfItem;
			newRow.insertCell(3).innerHTML = ++count;
			newRow.setAttribute('id', res._id);
			newRow.addEventListener('click', function(){
				// console.log(newRow);
				// alert(newRow.getAttribute('id'));
				window.location.href = "items.html?id=" + this.getAttribute('id');
			})
			todoLists.push(newRow);
			// console.log(newRow);
			// $(".row").click(function(){
			// 	window.location.href = "items.html?" + $(this).children().eq(3).html();
			// });
		});
		
			
	}
	$('#todo-create-todos').modal('hide');//???
	document.getElementById("todo-name").value = '';
	document.getElementById('todo-type').value = 'list';
}

function addItem() {
	var title = document.getElementById("item-title").value;
	var description = document.getElementById('item-description').value;	
	if(title !== '') {
		var form = {
			title: title,
			description: description
		};
		$.post(listUrl + currentId, form, function(res, status) {
			console.log(res);
			test();
		});
	}
	$('#todo-create-todos').modal('hide');//???
	document.getElementById("item-title").value = '';
	document.getElementById('item-description').value = 'list';
}

function clearTodoInput() {
	document.getElementById("todo-name").value = '';
	document.getElementById('todo-type').value = 'list';
}

function test(){
	// alert("dzucnoi")
	var url = window.location.href;
	var _id = url.slice(url.indexOf('id=') + 3, url.length);
	currentId = _id;
	count = 0;
	getItems(_id);
}