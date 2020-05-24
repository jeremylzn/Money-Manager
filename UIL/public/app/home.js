let expensesStats = 0;
let incomesStats = 0;
let generalStats = 0;
let nameInput = "";
let json_expenses = {};
let json_incomes = {};
let userData;

window.onload = function() {
    $(".panel-expenses").append(Expenses_Table()).hide();
    $(".panel-incomes").append(Incomes_Table()).hide();

    fetch(`/home/userInfos`)
        .then(res => res.json())
        .then((data) => {
            if (data.error) {
                throw error
            } else {
                $('#username').append(data.username)
                var newKey = "UserId";
                var newValue = data.uId;
                json_expenses[newKey] = newValue;
                json_incomes[newKey] = newValue;

            }
        })
}

const toTitleCase = (phrase) => {
    return phrase
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

$(function() {
    // Display of expenses table :
    $(".expenses-btn").click(function() {
        $(".panel-incomes").hide();
        $(".panel-expenses").show();
    });
    // Display of incomes table :
    $(".incomes-btn").click(function() {
        $(".panel-expenses").hide();
        $(".panel-incomes").show();
    });
});

// Statistic Calcul :
$(function() {
    $(".stats-btn").click(function() {
        expensesStats = 0;

        var newValue = `${$('.year')[0].value}-${$('.month')[0].value}`;
        var newKey = 'Date'
        json_expenses[newKey] = newValue

        for (let index = 0; index < $('.inputExpenses').length; index++) {
            expensesStats -= parseFloat($('.inputExpenses')[index].value);
            var newKey = $('.expenses')[index].innerHTML.indexOf(">")
            var newKey = toTitleCase($('.expenses')[index].innerHTML.substring($('.expenses')[index].innerHTML.indexOf(">") + 1)).replace(/\s/g, '')
            var newValue = parseFloat($('.inputExpenses')[index].value)
            json_expenses[newKey] = newValue

        }
        $('#expenses-stats').html(expensesStats);

        incomesStats = 0;

        var newValue = `${$('.year')[0].value}-${$('.month')[0].value}`;
        var newKey = 'Date'
        json_incomes[newKey] = newValue

        for (let index = 0; index < $('.inputIncomes').length; index++) {
            incomesStats += parseFloat($('.inputIncomes')[index].value);
            var newKey = toTitleCase($('.incomes')[index].innerHTML.substring($('.incomes')[index].innerHTML.indexOf(">") + 1)).replace(/\s/g, '')
            var newValue = parseFloat($('.inputIncomes')[index].value)
            json_incomes[newKey] = newValue
        }
        $('#incomes-stats').html(incomesStats);
        var arr = $("[name='calcul']");
        generalStats = 0;
        for (var i = 0; i < arr.length; i++) {
            if (parseFloat(arr[i].value)) {
                if (arr[i].className == 'inputExpenses') {
                    generalStats -= parseInt(arr[i].value);
                } else
                    generalStats += parseInt(arr[i].value);
            }
        }
        console.log(json_incomes)
        console.log(json_expenses)
            //-----------------------------
            // Request the data to DB :
        $.post("/home/incomesData", {
            json_incomes,
            json_expenses
        });
        // ----------------------------

        $('#general-stats').html(generalStats);
        $(".statistic-content").toggleClass("active");

    });
});

$(function() {
    $("#cancel_stats-btn").click(function() {
        $(".statistic-content,.statistic").removeClass("active");
    });
});

// Add input expenses :
$(function() {
    $(".btn-expenses, .addinput-expenses").click(function() {
        $(".addinput-content-expenses,.addinput-expenses").toggleClass("active");
    });
    $(".addinput-btn-expenses").click(function(nameInput) {
        nameInput = $("#input-name-expenses").val();
        $(".addinput-content-expenses,.addinput-expenses").toggleClass("active");
        var newtd = document.createElement('td');
        var newth = document.createElement('th');
        var newtr = document.createElement('tr');
        newtr.className = 'element'
        newtd.innerHTML = '<input type = "number" class = "inputExpenses" value = "0" step = "0.01" name = "calcul"> </input>'
        newth.className = `th expenses`
        newth.innerHTML = '<input type="checkbox" id=' + nameInput + ' class="del-checkbox"> ' + nameInput
        newtr.appendChild(newth)
        newtr.appendChild(newtd)
        document.getElementById("plusexpenses").appendChild(newtr);

    });


});

// Add input incomes :
$(function() {
    $(".btn-incomes, .addinput-incomes").click(function() {

        $(".addinput-content-incomes,.addinput-incomes").toggleClass("active");
    });
    $(".addinput-btn-incomes").click(function(nameInput) {
        nameInput = $("#input-name-incomes").val();
        $(".addinput-content-incomes,.addinput-incomes").toggleClass("active");
        var newtd = document.createElement('td');
        var newth = document.createElement('th');
        var newtr = document.createElement('tr');
        newtr.className = 'element'
        newtd.innerHTML = '<input type = "number" class = "inputIncomes" value = "0" step = "0.01" name = "calcul"> </input>'
        newth.className = `th incomes`
        newth.innerHTML = '<input type="checkbox" id=' + nameInput + ' class="del-checkbox"> ' + nameInput
        newtr.appendChild(newth)
        newtr.appendChild(newtd)
        document.getElementById("plusincomes").appendChild(newtr);

    });
});

// Delete input :
function DeleteInput(inputName) {
    // console.log(json_expenses)

    for (let i = 0; i < document.getElementsByClassName('del-checkbox').length; i++) {
        if (document.getElementsByClassName('del-checkbox')[i].checked == true) {
            console.log(toTitleCase(document.getElementsByClassName('del-checkbox')[i].id));
            delete json_expenses[toTitleCase(document.getElementsByClassName('del-checkbox')[i].id)];
            delete json_incomes[toTitleCase(document.getElementsByClassName('del-checkbox')[i].id)];
            document.getElementsByClassName(inputName)[i].remove();
        }

    }
    console.log(json_expenses)
    console.log(json_incomes)

}




// Return of Expenses table :
function Expenses_Table() {
    return '<table style="margin-top: 5%;float: left;" class="bottomBorder" id="plusexpenses">' +
        '<tr id="expenses">' +
        '<th>' +
        '<button class="plus-btn btn-expenses">+</button></th>' +
        '<td class="td" style="border: 0px; text-align: center;"><h4>Expenses</h4></td>' +
        '</tr>' +
        '<tr class="element">' +
        '<th class="th expenses"><input id="Housing" type="checkbox" class="del-checkbox">Housing</th>' +
        '<td><input type="number" class="inputExpenses" value="0" step="0.01" name="calcul"></td>' +
        '</tr>' +
        '<tr class="element">' +
        '<th class="th expenses"><input id="Food" type="checkbox" class="del-checkbox">Food</th>' +
        '<td><input type="number" class="inputExpenses" value="0" step="0.01" name="calcul"></td>' +
        '</tr>' +
        '<tr class="element">' +
        '<th class="th expenses"><input id="Transport" type="checkbox" class="del-checkbox">Transport</th>' +
        '<td><input type="number" class="inputExpenses" value="0" step="0.01" name="calcul"></td>' +
        '</tr>' +

        '<tr class="element">' +
        '<th class="th expenses"><input id="Communication" type="checkbox" class="del-checkbox">Communication</th>' +
        '<td><input type="number" class="inputExpenses" value="0" step="0.01" name="calcul"></td>' +
        '</tr>' +
        '<tr class="element">' +
        '<th class="th expenses"><input id="Housing charges" type="checkbox" class="del-checkbox">Housing charges</th>' +
        '<td><input type="number" class="inputExpenses" value="0" step="0.01" name="calcul"></td>' +
        '</tr>' +
        '<tr class="element">' +
        '<th class="th expenses"><input id="University" type="checkbox" class="del-checkbox">University</th>' +
        '<td><input type="number" class="inputExpenses" value="0" step="0.01" name="calcul"></td>' +
        '</tr>' +
        '</table>'
};

// Return of Incomes table :
function Incomes_Table() {
    return '<table class="bottomBorder" style="margin-top: 5%;display: inline-block;" id="plusincomes">' +
        '<tr id="incomes">' +
        '<th><button class="plus-btn btn-incomes">+</button></th>' +
        '<td class="td" style="border: 0px; text-align: center;"><h4>Incomes</h4></td>' +
        '</tr>' +
        '<tr class="element">' +
        '<th class="th incomes"><input id="Salary" type="checkbox" class="del-checkbox">Salary</th>' +
        '<td><input type="number" class="inputIncomes" value="0" step="0.01" name="calcul"></td>' +
        '</tr>' +
        '<tr class="element">' +
        '<th class="th incomes"><input id="Scholarships" type="checkbox" class="del-checkbox">Scholarships</th>' +
        '<td><input type="number" class="inputIncomes" value="0" step="0.01" name="calcul"></td>' +
        '</tr>' +

        '<tr class="element">' +
        '<th class="th incomes"><input id="From Parents" type="checkbox" class="del-checkbox">From Parents</th>' +
        '<td><input type="number" class="inputIncomes" value="0" step="0.01" name="calcul"></td>' +
        '</tr>' +

        '<tr class="element">' +
        '<th class="th incomes"><input id="Extras" type="checkbox" class="del-checkbox">Extras</th>' +
        '<td><input type="number" class="inputIncomes" value="0" step="0.01" name="calcul"></td>' +
        '</tr>' +
        '</table>'
};