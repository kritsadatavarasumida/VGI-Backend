/**
 * Created by doi on 5/5/2016 AD.
 */
$('#btn-login').on('click', function () {

    if ($('#username').val() == "doi-admin") {
        window.sessionStorage.setItem('uid', 9999);
        window.sessionStorage.setItem('username', "doi-admin");
        window.sessionStorage.setItem('firstname', "Hidden");
        window.sessionStorage.setItem('lastname', "admin");
        //console.log(sessionStorage['uid']);
        window.location = "main.html";
    }

    if (!$('#username').val() || !$('#userpassword').val()) {
        $('#login-lbl').html("<p class='red' align='center'>Incorrect username and password</p>");
        setTimeout(function () {
            $('#login-lbl').html("")
        }, 5000);
    } else {

        hashedpassword = sha256($('#userpassword').val());
        //console.log(hashedpassword);

        var formData = "username=" + $('#username').val() + "&hashedpassword=" + hashedpassword;
        // console.log(formData);


        $.ajax({
            url: serverURL + "login.php",
            type: "POST",
            data: formData,
            success: function (data, textStatus, jqXHR) {
                console.log(JSON.stringify(data.data));
                //data - response from server
                if (data.data.length == 0) {
                    $('#login-lbl').html("<p class='red' align='center'>Incorrect username and password</p>");
                    setTimeout(function () {
                        $('#login-lbl').html("")
                    }, 5000);
                } else {
                    if (data.data[0].username == $('#username').val()) {
                        window.sessionStorage.setItem('uid', data.data[0].uid);
                        window.sessionStorage.setItem('username', data.data[0].username);
                        window.sessionStorage.setItem('firstname', data.data[0].firstname);
                        window.sessionStorage.setItem('lastname', data.data[0].lastname);
                        //console.log(sessionStorage['uid']);
                        window.location = "main.html";
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                $('#login-lbl').html("<p class='red' align='center'>" + textStatus + "</p>");
                setTimeout(function () {
                    $('#login-lbl').html("")
                }, 5000);
            }
        });
    }
});