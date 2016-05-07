/**
 * Created by doi on 5/5/2016 AD.
 */
var validuser = 0;

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function isEmailAddress(str) {
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(str);  // returns a boolean
}

function isPhoneNumber(str) {
    var pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return pattern.test(str);  // returns a boolean
}

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
    $('#addwizard').hide();
    $('#customer-login').on('keyup', function () {
        $('#lbl-customer-login').html($('#customer-login').val());
        var formData = "username=" + $('#customer-login').val();
        $.ajax({
            url: serverURL + "customer_username_check.php",
            type: "POST",
            data: formData,
            success: function (data, textStatus, jqXHR) {
                console.log(JSON.stringify(data.data));
                //data - response from server

                try {
                    if (data.data[0].username == $('#customer-login').val()) {
                        $('#customer-login').addClass("red");
                        validuser = 0;
                    }
                    if (data.data.length == 0) {
                        validuser = 1;
                    }
                } catch (e) {
                    $('#customer-login').removeClass("red");
                    validuser = 1;
                }


            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
            }
        });
    })

    $('#email').on('keyup', function () {
        $('#lbl-customer-email').html($('#email').val());
    })

    $('#phone').on('keyup', function () {
        $('#lbl-customer-phone').html($('#phone').val());
    })

    $('#vgi').on('keyup', function () {
        $('#lbl-customer-vgi').html($('#vgi').val());
    })

    $('#company_name').on('keyup', function () {
        $('#lbl-customer-company-name').html($('#company_name').val());
    })

    $('#addnewwizard').on('click', function () {
        $('#addwizard').show();


    })

    $('#addwizardclose').on('click', function () {
        $('#addwizard').hide();


    })

    var formData = "";
    $.ajax({
        async: false,
        url: serverURL + "list-customer-account.php",
        type: "POST",
        data: formData,
        success: function (data, textStatus, jqXHR) {
            console.log(JSON.stringify(data.data));
            //data - response from server
            var html = "";
            for (var i = 0; i < data.data.length; i++) {
                html += '<tr><td>' + data.data[i].cid + '</td><td>';
                html += '<a>' + data.data[i].username + '</a><br /><small>Created ' + data.data[i].created.replace(/%3A/g, ':').replace(/\+/g, ' ') + '</small></td>';
                html += '<td><ul class="list-inline">';
                html += '<li> <img src="images/user.png" class="avatar" alt="Avatar" title="Contact: ' + data.data[i].person1 + '\nMobile: ' + data.data[i].mobile1 + '"> </li>';
                if (data.data[i].person2 && data.data[i].mobile2) {
                    html += '<li> <img src="images/user.png" class="avatar" alt="Avatar" title="Contact: ' + data.data[i].person2 + '\nMobile: ' + data.data[i].mobile2 + '"> </li>';
                }
                if (data.data[i].person3 && data.data[i].mobile3) {
                    html += '<li> <img src="images/user.png" class="avatar" alt="Avatar" title="Contact: ' + data.data[i].person3 + '\nMobile: ' + data.data[i].mobile3 + '"> </li>';
                }
                if (data.data[i].person4 && data.data[i].mobile4) {
                    html += '<li> <img src="images/user.png" class="avatar" alt="Avatar" title="Contact: ' + data.data[i].person4 + '\nMobile: ' + data.data[i].mobile4 + '"> </li>';
                }
                html += '</ul></td>';
                html += '<td><a>' + data.data[i].email.replace(/%40/g, '@') + '</a><br /><small>' + data.data[i].company_name.replace(/\+/g, ' ') + '</small></td>';
                html += '<td><a>' + data.data[i].phone + '</a><br /><small></small></td>';
                html += '<td><a>' + data.data[i].vgi.replace(/%40/g, '@') + '</a><br /><small></small></td>';
                html += '<td><a>' + data.data[i].lastlogin.replace(/%3A/g, ':').replace(/\+/g, ' ') + '</a><br /><small>Enabled: ';
                if (data.data[i].enabled == 1) {
                    html += '<i class="fa fa-check" aria-hidden="true"></i>';
                } else {
                    html += '<i class="fa fa-times" aria-hidden="true"></i>';
                }
                html += '</small></td>';
                html += '<td>';
                html += '<a href="#" class="btn btn-primary btn-xs"><i class="fa fa-folder"></i> View </a>';
                html += '<a href="customer-profile.html?mode=edit&cid=' + data.data[i].cid + '" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> Edit </a>';
                html += '<a href="#" class="btn btn-danger btn-xs" onclick=deletecustomer(' + data.data[i].cid + ',"' + data.data[i].username + '")><i class="fa fa-trash-o"></i> Delete </a>';
                html += '</td>';


                html += '</tr>';
            }
            $('#customertable').html(html);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });

    function deletecustomer(cid, username) {
        var r = confirm("Do you want to delete this Customer?\nCustomer Login: " + username);
        if (r == true) {
            var formData = "cid=" + cid;
            $.ajax({
                url: serverURL + "delete_customer_account.php",
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
            window.location = "customer-account-mgmt.html";
        } else {

        }
    }
}

if (page === "customer-profile") {
    var param1 = getUrlVars()["cid"];
    var formData = "cid=" + param1
    $.ajax({
        async: false,
        url: serverURL + "get-customer-account-by-cid.php",
        type: "POST",
        data: formData,
        success: function (data, textStatus, jqXHR) {
            console.log(JSON.stringify(data.data));
            //data - response from server
            var html = "";
            $('#cp_created_on').html(data.data[0].created.replace(/%3A/g, ':').replace(/\+/, ' '));
            $('#cp_lastlogin_on').html(data.data[0].lastlogin.replace(/%3A/g, ':').replace(/\+/, ' '));
            if (data.data[0].enabled == 1) {
                $('#cp-status').html("Enabled");
            } else {
                $('#cp-status').html("Disabled");
            }

            if (data.data[0].company_logo) {
                $('#cp-company-logo').show();
                $('#cp-company-logo').attr('src', data.data[0].company_logo.replace(/%3A/g, ':').replace(/%2F/g, '/').replace(/%22/g, ''));
            } else {
                $('#lbl-customer-company-logo').hide();
            }

            $('#cp-company-name').html(data.data[0].company_name.replace(/%3A/g, ':').replace(/\+/g, ' '));
            $('#cp-company-desc').html(data.data[0].company_description.replace(/%3A/g, ':').replace(/\+/g, ' '));
            $('#cp-company-contact').html("Email : " + data.data[0].email.replace(/%40/g, '@') + "<br /> Phone : " + data.data[0].phone);
            if (data.data[0].person1 != '' || data.data[0].mobile1 != '') {
                $('#cp-person1').html(data.data[0].person1.replace(/\+/g, ' ') + "<br /><i class='fa fa-mobile' aria-hidden='true'></i> : " + data.data[0].mobile1);
            }
            if (data.data[0].person2 != '' || data.data[0].mobile2 != '') {
                $('#cp-person2').html(data.data[0].person2.replace(/\+/g, ' ') + "<br /><i class='fa fa-mobile' aria-hidden='true'></i> : " + data.data[0].mobile2);
            }
            if (data.data[0].person3 != '' || data.data[0].mobile3 != '') {
                $('#cp-person3').html(data.data[0].person3.replace(/\+/g, ' ') + "<br /><i class='fa fa-mobile' aria-hidden='true'></i> : " + data.data[0].mobile3);
            }
            if (data.data[0].person4 != '' || data.data[0].mobile4 != '') {
                $('#cp-person4').html(data.data[0].person4.replace(/\+/g, ' ') + "<br /><i class='fa fa-mobile' aria-hidden='true'></i> : " + data.data[0].mobile4);
            }
            $('#cp-vgi').html(data.data[0].vgi.replace(/%40/g, '@'));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
}