/**
 * Created by doi on 5/5/2016 AD.
 */


if (!sessionStorage['uid'] || !sessionStorage['username']) {
    window.location = "login.html";
} else {
    $('#fullname_welcome').html(sessionStorage['firstname'] + " " + sessionStorage['lastname']);
    $('#fullname_head').html(sessionStorage['username']);
}

if (page === "local-user-mgmt") {
    var adddiv = 0;
    $('#addlocaluser').hide();
    $('#editlocaluser').hide();

    $('#edit_cancel').on('click', function () {
        $('#edit_firstname').val(sessionStorage['edit_firstname']);
        $('#edit_lastname').val(sessionStorage['edit_lastname']);
        if (sessionStorage['edit_status']) {
            $('input#edit_enabled').iCheck("check");
        } else {
            $('input#edit_enabled').iCheck("uncheck");
        }
    })

    $('#add_cancel').on('click', function () {
        $('#add_firstname').val("");
        $('#add_lastname').val("");
        $('#add_username').val("");
    })

    $('input#edit_enabled').on('ifChecked', function () {
        window.sessionStorage.setItem("edit_status", 1);
    })

    $('input#edit_enabled').on('ifUnchecked', function () {
        window.sessionStorage.setItem("edit_status", 0);
    })

    $('#add_submit').on('click', function () {
        var formData = "firstname=" + $('#add_firstname').val() + "&lastname=" + $('#add_lastname').val() + "&username=" + $('#add_username').val() + "&password=" + sha256($('#add_password').val());
        $.ajax({
            url: serverURL + "add_localuser.php",
            type: "POST",
            data: formData,
            success: function (data, textStatus, jqXHR) {
                console.log(JSON.stringify(data.data));
                //data - response from server
                window.location = "local-user-mgmt.html";

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
            }
        });

    })

    $('#edit_submit').on('click', function () {
        if ($('#edit_password').val()) {
            var formData = "firstname=" + $('#edit_firstname').val() + "&lastname=" + $('#edit_lastname').val() + "&status=" + sessionStorage['edit_status'] + "&uid=" + $('#edit_uid').val() + "&password=" + sha256($('#edit_password').val());
        } else {
            var formData = "firstname=" + $('#edit_firstname').val() + "&lastname=" + $('#edit_lastname').val() + "&status=" + sessionStorage['edit_status'] + "&uid=" + $('#edit_uid').val();
        }

        $.ajax({
            url: serverURL + "update_localuser.php",
            type: "POST",
            data: formData,
            success: function (data, textStatus, jqXHR) {
                console.log(JSON.stringify(data.data));
                //data - response from server
                window.sessionStorage.setItem('edit_firstname', "");
                window.sessionStorage.setItem('edit_lastname', "");
                window.sessionStorage.setItem('edit_uid', "");
                window.sessionStorage.setItem('edit_status', "");
                window.location = "local-user-mgmt.html";

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
            }
        });

    })

    $('#add_username').on('keyup', function () {
        var formData = "username=" + $('#add_username').val();
        $.ajax({
            url: serverURL + "username_check.php",
            type: "POST",
            data: formData,
            success: function (data, textStatus, jqXHR) {
                console.log(JSON.stringify(data.data));
                //data - response from server

                try {
                    if (data.data[0].username == $('#add_username').val()) {
                        $('#add_username').addClass("red");
                        $('#username_tag').removeClass("fa-tag");
                        $('#username_tag').addClass("fa-times");
                        $('#add_submit').hide();

                    }
                } catch (e) {
                    $('#add_username').removeClass("red");
                    $('#username_tag').removeClass("fa-times");
                    $('#username_tag').addClass("fa-tag");
                    $('#add_submit').show();
                }


            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
            }
        });
    })

    function hideedit() {
        $('#editlocaluser').hide();
    }

    function hideadd() {
        $('#addlocaluser').hide();
    }

    $('#addenable').on('click', function () {
        if (adddiv == 0) {
            $('#addlocaluser').show();
            adddiv = 1;
        } else {
            $('#addlocaluser').hide();
            adddiv = 0;
        }
    })

    function deleteuser(uid, username) {
        var r = confirm("Do you want to delete this user?\nUsername: " + username);
        if (r == true) {
            var formData = "uid=" + uid;
            $.ajax({
                url: serverURL + "delete_localuser.php",
                type: "POST",
                data: formData,
                success: function (data, textStatus, jqXHR) {
                    console.log(JSON.stringify(data.data));
                    //data - response from server

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                }
            });
            window.location = "local-user-mgmt.html";
        } else {

        }
    }

    function edituser(uid, firstname, lastname, status) {
        $('#editlocaluser').show();
        $('#edit_firstname').val(firstname);
        window.sessionStorage.setItem('edit_firstname', firstname);
        $('#edit_lastname').val(lastname);
        window.sessionStorage.setItem('edit_lastname', lastname);
        $('#edit_uid').val(uid);
        window.sessionStorage.setItem('edit_uid', uid);

        if (status == 1) {
            $('input#edit_enabled').iCheck("check");
        } else {
            $('input#edit_enabled').iCheck("uncheck");
        }
        window.sessionStorage.setItem('edit_status', status);
    }

    //alert (page);
    var formData = "";
    $.ajax({
        async: false,
        url: serverURL + "list-local-user.php",
        type: "POST",
        data: formData,
        success: function (data, textStatus, jqXHR) {
            console.log(JSON.stringify(data.data));
            //data - response from server
            var html = "";
            for (var i = 0; i < data.data.length; i++) {
                html += '<tr class="even pointer">';
                html += '<td class="a-center "><input type="checkbox" class="flat" name="table_records" id="userbox"' + i + '></td>"';
                html += '<td class=" ">' + data.data[i].uid + '</td>';
                html += '<td class=" ">' + data.data[i].username + '</td>';
                html += '<td class=" ">' + data.data[i].firstname + '</td>';
                html += '<td class=" ">' + data.data[i].lastname + '</td>';
                html += '<td class=" ">' + data.data[i].created.replace(/%3A/g, ':').replace(/\+/, ' ') + '</td>';
                html += '<td class=" ">' + data.data[i].lastlogin.replace(/%3A/g, ':').replace(/\+/, ' ') + '</td>';
                if (data.data[i].enabled == 1) {
                    html += '<td class=" "><i class="fa fa-check-circle" aria-hidden="true"></i></td>';
                } else {
                    html += '<td class=" "><i class="fa fa-ban" aria-hidden="true"></i></td>';
                }
                html += '<td class=" "><a href="#" onclick=edituser(' + data.data[i].uid + ',"' + data.data[i].firstname + '","' + data.data[i].lastname + '",' + data.data[i].enabled + ')><i class="fa fa-wrench" aria-hidden="true"></i></a>&nbsp;<a href="#" onclick=deleteuser(' + data.data[i].uid + ',"' + data.data[i].username + '")><i class="fa fa-trash" aria-hidden="true"></i></a></td>';
                html += '</tr>';
            }
            $('#localusertable').html(html);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
}

if (page === "customer-account-mgmt") {

}