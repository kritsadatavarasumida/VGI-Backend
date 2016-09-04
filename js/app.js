/**
 * Created by doi on 5/5/2016 AD.
 */
var validuser = 0;


$(document).bind("ajaxSend", function () {

}).bind("ajaxComplete", function () {

});


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
                //html += '<td class="a-center "><input type="checkbox" class="flat" name="table_records" id="userbox' + i + '"></td>"';
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
                html += '<a href="customer-profile.html?mode=edit&cid=' + data.data[i].cid + '" class="btn btn-info btn-xs"><i class="fa fa-folder"></i> View </a>';
                html += '<a href="#" class="btn btn-primary btn-xs"><i class="fa fa-pencil"></i> Edit </a>';
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

if (page === "push") {
    $('#tag_init_member_div').hide();
    $('#tag_name_member_submit').hide();
    var tags = [];
    var formData = "";
    $.ajax({
        url: serverURL + "list-tags-mapping.php",
        type: "POST",
        data: formData,
        success: function (data, textStatus, jqXHR) {
            //console.log(JSON.stringify(data.data));

            //data - response from server


            for (var i = 0; i < data.data.length; i++) {
                html = "";

                //console.log(data.data.length);
                if (i == 0) {
                    tags.push(data.data[i].tid);
                    html = '<tr class="even pointer">';
                    //html += '<td class="a-center"><input class="icheckbox_flat-green" type="checkbox" name="table_records"></td>';
                    html += '<td class=" ">' + data.data[i].tid + '</td>';
                    html += '<td class=" " id="lbl-tagname-' + data.data[i].tid + '">' + data.data[i].tag_name + '</td>';
                    html += '<td class=" " id="lbl-tag-' + data.data[i].tid + '"><a href=# onclick=deletemember(' + data.data[i].tid + ',"' + data.data[i].tag_name + '",' + data.data[i].cid + ',"' + data.data[i].username + '")>' + data.data[i].username
                    if (data.data.length > 1) {
                        html += '</a></td>';
                    } else {
                        // html += '</a>&nbsp;<a href=# onclick=addmember(' + data.data[i].tid + ',"' + data.data[i].tag_name + '",' + data.data[i].cid + ',"' + data.data[i].username + '")><i class="fa fa-plus" aria-hidden="true"></i></a></td>'
                    }
                    html += '<td class=" last"><a href="#" onclick=modifytags(' + data.data[i].tid + ',"' + data.data[i].tag_name + '")><i class="fa fa-wrench" aria-hidden="true"></i></a>&nbsp;<a href="#" onclick=deletetags(' + data.data[i].tid + ',"' + data.data[i].tag_name + '")><i class="fa fa-trash" aria-hidden="true"></i></a>&nbsp;<a href="#" ><i class="fa fa-paper-plane" aria-hidden="true"></i></a></td>';
                    html += '</tr>';
                } else {
                    var tagsexist = 0;
                    for (var j = 0; j < tags.length; j++) {
                        if (data.data[i].tid == tags[j]) {
                            tagsexist = 1;

                        } else {
                            tagsexist = 0;
                        }


                    }
                    if (tagsexist == 1) {
                        $("#lbl-tag-" + data.data[i].tid).append(', <a href=# onclick=deletemember(' + data.data[i].tid + ',"' + data.data[i].tag_name + '",' + data.data[i].cid + ',"' + data.data[i].username + '")>' + data.data[i].username + '</a>');


                    } else {
                        tags.push(data.data[i].tid);
                        html = '<tr class="even pointer">';
                        //html += '<td class="a-center"><input type="checkbox" class="icheckbox_flat-green" name="table_records" id="userbox' + i + '"></td>"';
                        html += '<td class=" ">' + data.data[i].tid + '</td>';
                        html += '<td class=" " id="lbl-tagname-' + data.data[i].tid + '">' + data.data[i].tag_name + '</td>';
                        html += '<td class=" " id="lbl-tag-' + data.data[i].tid + '"><a href=# onclick=deletemember(' + data.data[i].tid + ',"' + data.data[i].tag_name + '",' + data.data[i].cid + ',"' + data.data[i].username + '")>' + data.data[i].username
                        if (data.data.length > 1) {
                            html += '</a>&nbsp;<a href=#><i class="fa fa-plus" aria-hidden="true"></a></i></td>'

                        } else {
                            html += '</a></td>';
                        }
                        html += '<td class=" last"><a href="#" onclick=modifytags(' + data.data[i].tid + ',"' + data.data[i].tag_name + '")><i class="fa fa-wrench" aria-hidden="true"></i></a>&nbsp;<a href="#" onclick=deletetags(' + data.data[i].tid + ',"' + data.data[i].tag_name + '")><i class="fa fa-trash" aria-hidden="true"></i></a>&nbsp;<a href="#" ><i class="fa fa-paper-plane" aria-hidden="true"></i></a></td>';
                        html += '</tr>';
                    }

                }

                $('#overviewtagstable').append(html);
                if (i == (data.data.length - 1)) {
                    shtml = '</a>&nbsp;<a href=# onclick=addmember(' + data.data[i].tid + ',"' + data.data[i].tag_name + '",' + data.data[i].cid + ',"' + data.data[i].username + '")><i class="fa fa-plus" aria-hidden="true"></a></i>';
                    $("#lbl-tag-" + data.data[i].tid).append(shtml);
                }
            }


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });

    function deletetags(tid, tag_name) {
        var r = confirm("Do you want to delete this Tags?\nTag Name: " + tag_name);
        if (r == true) {
            var formData = "tid=" + tid;
            $.ajax({
                url: serverURL + "delete_related_tags.php",
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
            window.location = "push.html";
        } else {

        }
    }

    function deletemember(tid, tag_name, cid, username) {
        var r = confirm("Do you want to remove this member?\nTag Name: " + tag_name + "\nMember: " + username);
        if (r == true) {
            var formData = "cid=" + cid + "&tid=" + tid;
            $.ajax({
                url: serverURL + "delete_customer_tags.php",
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
            window.location = "push.html";
        } else {

        }
    }

    function addmember(tid, tag_name, cid, username) {
        window["member" + tid] = "";
        console.log("add clicked");
        window["same" + tid] = 0;
        var inputtxt = "";
        inputtxt = '<div class="col-md-6 col-sm-6 col-xs-12 form-group has-feedback">';
        inputtxt += '<input type="text" class="form-control has-feedback-left" placeholder="Member Name" id="tag_member' + tid + '" value=' + "" + '>';
        inputtxt += '<span class="fa fa-tag form-control-feedback left" aria-hidden="true"></span>';
        inputtxt += '</div>';
        inputtxt += '<a class="btn btn-success" id="tagmember_submit' + tid + '">Submit</a>';
        inputtxt += '<a class="btn btn-danger" id="tagmember_cancel' + tid + '">Cancel</a>'
        window["member" + tid] = $('#lbl-tag-' + tid).html();
        console.log(window["member" + tid]);
        $('#lbl-tag-' + tid).html(inputtxt);

        $('#tagmember_cancel' + tid).on('click', function () {
            $('#lbl-tag-' + tid).html(window["member" + tid]);
        })

        $('#tagmember_submit' + tid).on('click', function () {
            var formData = "tid=" + tid + "&username=" + $('#tag_member' + tid).val();
            $.ajax({
                url: serverURL + "add_tag_member.php",
                type: "POST",
                data: formData,
                success: function (data, textStatus, jqXHR) {
                    console.log(JSON.stringify(data));
                    //data - response from server
                    if (data == 1) {
                        window.location = "push.html";
                    }

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                }
            });

            //window.location = "push.html";
        })

        $('#tag_member' + tid).on('keyup', function () {
            var formData = "tid=" + tid + "&username=" + $('#tag_member' + tid).val();
            $.ajax({
                url: serverURL + "customer_username_check.php",
                type: "POST",
                data: formData,
                success: function (data, textStatus, jqXHR) {
                    console.log(JSON.stringify(data.data));
                    //data - response from server
                    if (window['same' + tid] == 0) {
                        try {
                            if (data.data[0].username == $('#tag_member' + tid).val()) {
                                $('#tag_member' + tid).removeClass("red");
                                $('#tagmember_submit' + tid).show();
                            } else {
                                $('#tag_member' + tid).addClass("red");
                                $('#tagmember_submit' + tid).hide();
                            }

                        } catch (e) {
                            $('#tag_member' + tid).addClass("red");
                            $('#tagmember_submit' + tid).hide();
                        }
                    }

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                }
            });

            $.ajax({
                url: serverURL + "list-tags-mapping.php",
                type: "POST",
                data: formData,
                success: function (data, textStatus, jqXHR) {
                    console.log(JSON.stringify(data.data));
                    //data - response from server
                    try {
                        if (data.data[0].username == $('#tag_member' + tid).val()) {
                            $('#tag_member' + tid).addClass("red");
                            $('#tagmember_submit' + tid).hide();
                            window['same' + tid] = 1;
                        } else {
                            window['same' + tid] = 0;
                        }

                    } catch (e) {


                    }

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                }
            });
        })
    }

    $('#tagadd_submit').on('click', function () {
        var formData = "tagname=" + $('#tag_name').val();
        $.ajax({
            url: serverURL + "add_tag.php",
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
        window.location = "push.html";
    })

    $('#tag_name').on('keyup', function () {
        var formData = "tagname=" + $('#tag_name').val();
        $.ajax({
            url: serverURL + "tagname_check.php",
            type: "POST",
            data: formData,
            success: function (data, textStatus, jqXHR) {
                console.log(JSON.stringify(data.data));
                //data - response from server

                try {
                    if (data.data[0].tag_name == $('#tag_name').val()) {
                        $('#tag_name').addClass("red");
                        $('#tagadd_submit').hide();


                    }

                } catch (e) {
                    $('#tag_name').removeClass("red");
                    $('#tagadd_submit').show();
                }


            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
            }
        });
    })

    $.ajax({
        url: serverURL + "list-tags-all.php",
        type: "POST",
        data: formData,
        success: function (data, textStatus, jqXHR) {
            //console.log(JSON.stringify(data.data));

            //data - response from server


            for (var i = 0; i < data.data.length; i++) {
                html = "";
                //console.log(data.data.length);
                html = '<tr class="even pointer">';
                //html += '<td class="a-center"><input class="icheckbox_flat-green" type="checkbox" name="table_records"></td>';
                html += '<td class=" ">' + data.data[i].tid + '</td>';
                html += '<td class=" " id="lbl-tagname-all-' + data.data[i].tid + '">' + data.data[i].tag_name + '</td>';
                //html += '<td class=" " id="lbl-tag-' + data.data[i].tid + '">' + data.data[i].username + '</td>';
                html += '<td class=" last"><a href="#" onclick=modifytagsall(' + data.data[i].tid + ',"' + data.data[i].tag_name + '")><i class="fa fa-wrench" aria-hidden="true"></i></a>&nbsp;<a href="#" onclick=deletetags(' + data.data[i].tid + ',"' + data.data[i].tag_name + '")><i class="fa fa-trash" aria-hidden="true"></i></a></td>';
                html += '</tr>';
                $('#alltagstable').append(html);
            }


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });

    $('#tag_name_member').on('keyup', function () {
        var formData = "tagname=" + $('#tag_name_member').val();
        window['tagexist'] = 0;

        $.ajax({
            url: serverURL + "get-tag-tagname.php",
            type: "POST",
            data: formData,
            success: function (data, textStatus, jqXHR) {
                console.log(JSON.stringify(data.data));
                //data - response from server

                try {
                    if (data.data.length > 0) {
                        window['tagexist'] = 1;
                        $('#tag_name_member').addClass("red");
                        //$('#tag_name_member_submit').hide();
                        $('#tag_init_member_div').hide();
                        $('#tag_init_member').val("");
                    } else {
                        window['tagexist'] = 0;
                    }

                } catch (e) {
                    window['tagexist'] = 0;
                }


            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
            }
        });

        $.ajax({
            url: serverURL + "tagname_check.php",
            type: "POST",
            data: formData,
            success: function (data, textStatus, jqXHR) {
                //console.log(JSON.stringify(data.data));
                //data - response from server
                if (window['tagexist'] == 0) {
                    try {
                        if (data.data[0].tag_name == $('#tag_name_member').val()) {
                            $('#tag_name_member').removeClass("red");
                            //$('#tag_name_member_submit').show();
                            $('#tag_init_member_div').show();


                        } else {
                            $('#tag_name_member').addClass("red");
                            //$('#tag_name_member_submit').hide();
                            $('#tag_init_member_div').hide();
                            $('#tag_init_member').val("");
                        }

                    } catch (e) {
                        $('#tag_name_member').addClass("red");
                        //$('#tag_name_member_submit').hide();
                        $('#tag_init_member_div').hide();
                        $('#tag_init_member').val("");
                    }
                }


            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
            }
        });
    });

    function modifytags(tid, tagname) {
        var inputtxt = "";
        inputtxt = '<div class="col-md-6 col-sm-6 col-xs-12 form-group has-feedback">';
        inputtxt += '<input type="text" class="form-control has-feedback-left" placeholder="Tag Name" id="tag_temp' + tid + '" value=' + tagname + '>';
        inputtxt += '<span class="fa fa-tag form-control-feedback left" aria-hidden="true"></span>';
        inputtxt += '</div>';
        inputtxt += '<a class="btn btn-success" id="tagtemp_submit' + tid + '">Submit</a>';
        inputtxt += '<a class="btn btn-danger" id="tagtemp_cancel' + tid + '">Cancel</a>'
        $('#lbl-tagname-' + tid).html(inputtxt);
        $('#tag_temp' + tid).on('keyup', function () {
            var formData = "tagname=" + $('#tag_temp' + tid).val();
            $.ajax({
                url: serverURL + "tagname_check.php",
                type: "POST",
                data: formData,
                success: function (data, textStatus, jqXHR) {
                    console.log(JSON.stringify(data.data));
                    //data - response from server

                    try {
                        if (data.data[0].tag_name == $('#tag_temp' + tid).val()) {
                            $('#tag_temp' + tid).addClass("red");
                            $('#tagtemp_submit' + tid).hide();


                        }

                    } catch (e) {
                        $('#tag_temp' + tid).removeClass("red");
                        $('#tagtemp_submit' + tid).show();
                    }


                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                }
            });
        })

        $('#tagtemp_submit' + tid).on('click', function () {
            var r = confirm("Do you want to update this tags?\nTag Name: " + tagname + "\nnew Tag Name: " + $('#tag_temp' + tid).val());
            if (r == true) {
                var formData = "tid=" + tid + "&tagname=" + $('#tag_temp' + tid).val();
                $.ajax({
                    url: serverURL + "update_tagname.php",
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
                window.location = "push.html";
            } else {

            }
        })

        $('#tagtemp_cancel' + tid).on('click', function () {
            $('#lbl-tagname-' + tid).html(tagname);
        })
    }

    function modifytagsall(tid, tagname) {
        var inputtxt = "";
        inputtxt = '<div class="col-md-6 col-sm-6 col-xs-12 form-group has-feedback">';
        inputtxt += '<input type="text" class="form-control has-feedback-left" placeholder="Tag Name" id="tag_temp_all' + tid + '" value=' + tagname + '>';
        inputtxt += '<span class="fa fa-tag form-control-feedback left" aria-hidden="true"></span>';
        inputtxt += '</div>';
        inputtxt += '<a class="btn btn-success" id="tagtempall_submit' + tid + '">Submit</a>'
        inputtxt += '<a class="btn btn-danger" id="tagtempall_cancel' + tid + '">Cancel</a>'
        $('#lbl-tagname-all-' + tid).html(inputtxt);
        $('#tag_temp_all' + tid).on('keyup', function () {
            var formData = "tagname=" + $('#tag_temp_all' + tid).val();
            $.ajax({
                url: serverURL + "tagname_check.php",
                type: "POST",
                data: formData,
                success: function (data, textStatus, jqXHR) {
                    console.log(JSON.stringify(data.data));
                    //data - response from server

                    try {
                        if (data.data[0].tag_name == $('#tag_temp_all' + tid).val()) {
                            $('#tag_temp_all' + tid).addClass("red");
                            $('#tagtempall_submit' + tid).hide();


                        }

                    } catch (e) {
                        $('#tag_temp_all' + tid).removeClass("red");
                        $('#tagtempall_submit' + tid).show();
                    }


                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                }
            });
        })

        $('#tagtempall_submit' + tid).on('click', function () {
            var r = confirm("Do you want to update this tags?\nTag Name: " + tagname + "\nnew Tag Name: " + $('#tag_temp_all' + tid).val());
            if (r == true) {
                var formData = "tid=" + tid + "&tagname=" + $('#tag_temp_all' + tid).val();
                $.ajax({
                    url: serverURL + "update_tagname.php",
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
                window.location = "push.html";
            } else {

            }
        })
        $('#tagtempall_cancel' + tid).on('click', function () {
            $('#lbl-tagname-all-' + tid).html(tagname);
        })

    }


}

if (page === "stream_overview") {


    $.ajax({
        url: serverURL + "get_stream_list.php",
        type: "POST",
        data: formData,
        success: function (data, textStatus, jqXHR) {
            // console.log(JSON.parse(data));
            stream = JSON.parse(data);
            allstream = stream.streamFiles;
            //console.log(allstream);
            //data - response from server

            for (var i = 0; i < allstream.length; i++) {
                html = "";
                //console.log(data.data.length);
                html = '<tr class="even pointer">';
                //html += '<td class="a-center"><input class="icheckbox_flat-green" type="checkbox" name="table_records"></td>';
                html += '<td class=" " id="lbl-stream-' + allstream[i].id + '">' + allstream[i].id + '</td>';
                html += '<td class=" " id="lbl-stream-href-' + allstream[i].id + '">' + allstream[i].href + '<br/><small id="lbl-small-href-' + allstream[i].id + '"></small></td>';
                html += '<td class=" " id="lbl-stream-status-' + allstream[i].id + '"><a href="#" onclick=connect_stream("' + allstream[i].id + '")><img src="images/spin.gif" width="20px" height=20px></a></td>';
                //html += '<td class=" " id="lbl-tag-' + data.data[i].tid + '">' + data.data[i].username + '</td>';
                html += '<td class=" last"><a href="#" onclick=modifystream("' + allstream[i].id + '",' + i + ',"' + allstream[i].href + '")><i class="fa fa-wrench" aria-hidden="true"></i></a>&nbsp;<a href="#"><i class="fa fa-desktop" aria-hidden="true"></i></a>&nbsp;<a href="#" onclick=deletestream("' + allstream[i].id + '")><i class="fa fa-trash" aria-hidden="true"></i></a></td>';
                html += '</tr>';
                $('#streamtable').append(html);
                window['timeactive' + i] = setInterval(function (i) {
                    //console.log(allstream);
                    //console.log[i];
                    try {
                        checkstream(allstream[i].id, i);
                    } catch (e) {

                    }
                }, 3000, i);

            }

            try {


            } catch (e) {

            }


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });

    function checkstream(streamname, i) {
        var formData = "streamname=" + streamname;
        $.ajax({
            url: serverURL + "get_stream_active.php",
            type: "POST",
            data: formData,
            success: function (data, textStatus, jqXHR) {
                //console.log(JSON.parse(data));
                window['active' + i] = JSON.parse(data);
                //data - response from server
                //console.log(window['active'+i]);


                try {
                    $('#lbl-small-href-' + window['active' + i]['name'].replace(/.stream/, '')).html(window['active' + i].sourceIp)
                    if (window['active' + i]['isConnected']) {
                        $('#lbl-stream-status-' + window['active' + i]['name'].replace(/.stream/, '')).html('<a href="#" onclick=resetstream("' + streamname + '")>Connected</a>');
                        $('#lbl-stream-' + streamname).html(streamname);
                    } else {
                        $('#lbl-stream-status-' + window['active' + i]['name'].replace(/.stream/, '')).html('<a href="#" onclick=connect_stream("' + streamname + '")> <i class="fa fa-repeat" aria-hidden="true"></i>&nbsp; Not connected</a>');
                        $('#lbl-stream-' + streamname).html(streamname);
                    }

                } catch (e) {
                    //console.log(e);
                    $('#lbl-stream-status-' + streamname).html('<a href="#" onclick=connect_stream("' + streamname + '")>Not connected</a>');
                    $('#lbl-stream-' + streamname).html(streamname);
                }


            },
            error: function (jqXHR, textStatus, errorThrown) {
                //console.log(jqXHR);
            }
        });
    }

    function connect_stream(streamname) {
        // console.log(streamname);
        var formData = "streamname=" + streamname;
        $.ajax({
            url: serverURL + "connect_stream.php",
            type: "POST",
            data: formData,
            success: function (data, textStatus, jqXHR) {
                //console.log(JSON.parse(data));
                $('#lbl-stream-' + streamname).prepend('<img src="images/spin.gif" width="20px" height=20px>&nbsp;');
                //setTimeout(function(){ window.location = "stream-overview.html"; }, 5000);
                try {


                } catch (e) {

                }


            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
            }
        });
    }

    function deletestream(streamname) {
        var r = confirm("Do you want to update this Stream?\nStream Name: " + streamname);
        if (r == true) {
            //console.log(streamname);
            var formData = "streamname=" + streamname;
            $.ajax({
                url: serverURL + "delete_stream.php",
                type: "POST",
                data: formData,
                beforeSend: function () {
                    $('#lbl-stream-' + streamname).prepend('<img src="images/spin.gif" width="20px" height=20px>&nbsp;');
                },
                success: function (data, textStatus, jqXHR) {
                    console.log(JSON.parse(data));
                    setTimeout(function () {
                        window.location = "stream-overview.html";
                    }, 3000);
                    try {


                    } catch (e) {

                    }


                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                }
            });
        }
    }

    $('#streamadd_submit').on('click', function () {
        //console.log(streamname);
        var formData = "streamname=" + $('#stream_name').val() + "&streamurl=" + $('#stream_url').val();
        console.log(formData);
        $.ajax({
            url: serverURL + "add_stream.php",
            type: "POST",
            data: formData,
            beforeSend: function () {
                $('#allstream_status').append('&nbsp;&nbsp;<img src="images/spin.gif" width="20px" height=20px>');
            },
            success: function (data, textStatus, jqXHR) {
                console.log(JSON.parse(data));
                //setTimeout(function(){ window.location = "stream-overview.html"; }, 3000);
                try {
                    if (JSON.parse(data) == 1) {
                        window.location = "stream-overview.html";
                    } else {
                        $('#allstream_status').empty();
                    }

                } catch (e) {

                }


            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
            }
        });
    })

    function resetstream(streamname) {
        // console.log(streamname);
        var formData = "streamname=" + streamname;
        $.ajax({
            url: serverURL + "reset_stream.php",
            type: "POST",
            data: formData,
            success: function (data, textStatus, jqXHR) {
                //console.log(JSON.parse(data));
                $('#lbl-stream-' + streamname).prepend('<img src="images/spin.gif" width="20px" height=20px>&nbsp;');
                //setTimeout(function(){ window.location = "stream-overview.html"; }, 5000);
                try {


                } catch (e) {

                }


            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
            }
        });
    }

    function modifystream(streamname, i, href) {
        var inputtxt = "";
        inputtxt = '<div class="col-md-6 col-sm-6 col-xs-12 form-group has-feedback">';
        inputtxt += '<input type="text" class="form-control has-feedback-left" placeholder="Stream URL" id="stream_temp_url' + i + '">';
        inputtxt += '<span class="fa fa-youtube-play form-control-feedback left" aria-hidden="true"></span>';
        inputtxt += '</div>';
        inputtxt += '<a class="btn btn-success" id="streamtemp_submit' + i + '">Submit</a>';
        inputtxt += '<a class="btn btn-danger" id="streamtemp_cancel' + i + '">Cancel</a>';
        $('#lbl-stream-href-' + streamname).html(inputtxt);
        $('#streamtemp_cancel' + i).on('click', function () {
            $('#lbl-stream-href-' + streamname).html(href + '<br/><small id="lbl-small-href-' + streamname + '"></small>');
        })

        $('#streamtemp_submit' + i).on('click', function () {
            var formData = "streamname=" + streamname + "&streamurl=" + $('#stream_temp_url' + i).val();
            $.ajax({
                url: serverURL + "update_stream.php",
                type: "POST",
                data: formData,
                beforeSend: function () {
                    $('#streamtemp_submit' + i).append('&nbsp;<img src="images/spin.gif" width="20px" height=20px>');
                },
                success: function (data, textStatus, jqXHR) {
                    //console.log(JSON.parse(data));

                    //setTimeout(function(){ window.location = "stream-overview.html"; }, 5000);
                    try {
                        if (JSON.parse(data) == 1) {
                            window.location = "stream-overview.html";
                        } else {

                        }

                    } catch (e) {

                    }


                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                }
            });
        })

    }
}

if (page === "main") {
    console.log('main');
    setInterval(function () {
        $.ajax({
            url: scriptURL + "getmariadb.php",
            type: "POST",
            data: formData,
            beforeSend: function () {

            },
            success: function (data, textStatus, jqXHR) {
                //console.log(data);

                //setTimeout(function(){ window.location = "stream-overview.html"; }, 5000);
                try {
                    if (data == 1) {
                        $("#dbstatus").removeClass("red");
                        $("#dbstatus").addClass("green");
                        $("#dbstatus").html(" UP");
                    } else {
                        $("#dbstatus").removeClass("green");
                        $("#dbstatus").addClass("red");
                        $("#dbstatus").html(" Down")
                    }
                } catch (e) {

                }


            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
            }
        });

        $.ajax({
            url: scriptURL + "gethttpd.php",
            type: "POST",
            data: formData,
            beforeSend: function () {

            },
            success: function (data, textStatus, jqXHR) {
                //console.log(data);

                //setTimeout(function(){ window.location = "stream-overview.html"; }, 5000);
                try {
                    if (data == 1) {
                        $("#httpdstatus").removeClass("red");
                        $("#httpdstatus").addClass("green");
                        $("#httpdstatus").html(" UP");
                    } else {
                        $("#httpdstatus").removeClass("green");
                        $("#httpdstatus").addClass("red");
                        $("#httpdstatus").html(" Down")
                    }
                } catch (e) {

                }


            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
            }
        });


        $.ajax({
            url: scriptURL + "getstreamengine.php",
            type: "POST",
            data: formData,
            beforeSend: function () {

            },
            success: function (data, textStatus, jqXHR) {
                //console.log(data);

                //setTimeout(function(){ window.location = "stream-overview.html"; }, 5000);
                try {
                    if (data == 1) {
                        $("#wzstatus").removeClass("red");
                        $("#wzstatus").addClass("green");
                        $("#wzstatus").html(" UP");
                    } else {
                        $("#wzstatus").removeClass("green");
                        $("#wzstatus").addClass("red");
                        $("#wzstatus").html(" Down")
                    }
                } catch (e) {

                }


            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
            }
        });

        $.ajax({
            url: serverURL + "get_stream_list.php",
            type: "POST",
            data: formData,
            beforeSend: function () {

            },
            success: function (data, textStatus, jqXHR) {
                stream = JSON.parse(data);
                allstream = stream.streamFiles;
                //console.log(allstream);

                //setTimeout(function(){ window.location = "stream-overview.html"; }, 5000);
                try {

                    $("#noofstream").html(allstream.length);

                } catch (e) {

                }


            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
            }
        });

        $.ajax({
            url: serverURL + "list-customer-account.php",
            type: "POST",
            data: formData,
            beforeSend: function () {

            },
            success: function (data, textStatus, jqXHR) {

                //setTimeout(function(){ window.location = "stream-overview.html"; }, 5000);
                try {

                    $("#noofcustomer").html(data.data.length);

                } catch (e) {

                }


            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
            }
        });
    }, 5000);
}

if (page === "uioverview") {
    $.ajax({
        url: serverURL + "list-icons.php",
        type: "POST",
        data: formData,
        beforeSend: function () {

        },
        success: function (data, textStatus, jqXHR) {

            //setTimeout(function(){ window.location = "stream-overview.html"; }, 5000);
            try {

                $("#nooficons").html(data.data.length);

            } catch (e) {

            }


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
    $.ajax({
        url: serverURL + "list-pages.php",
        type: "POST",
        data: formData,
        beforeSend: function () {

        },
        success: function (data, textStatus, jqXHR) {

            //setTimeout(function(){ window.location = "stream-overview.html"; }, 5000);
            try {

                $("#noofpages").html(data.data.length);

            } catch (e) {

            }


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
    $.ajax({
        url: serverURL + "list-banners.php",
        type: "POST",
        data: formData,
        beforeSend: function () {

        },
        success: function (data, textStatus, jqXHR) {

            //setTimeout(function(){ window.location = "stream-overview.html"; }, 5000);
            try {

                $("#noofbanners").html(data.data.length);

            } catch (e) {

            }


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
    $.ajax({
        url: serverURL + "list-templates.php",
        type: "POST",
        data: formData,
        beforeSend: function () {

        },
        success: function (data, textStatus, jqXHR) {

            //setTimeout(function(){ window.location = "stream-overview.html"; }, 5000);
            try {

                $("#nooftemplates").html(data.data.length);

            } catch (e) {

            }


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
}


if (page === "uiicons") {
    $.ajax({
        url: serverURL + "list-icons.php",
        type: "POST",
        data: formData,
        beforeSend: function () {

        },
        success: function (data, textStatus, jqXHR) {

            //setTimeout(function(){ window.location = "stream-overview.html"; }, 5000);
            try {
                var html = "";
                console.log(data);
                for (var i = 0; i < data.data.length; i++) {
                    // console.log("start");
                    html = "<tr>";
                    html += "<td>" + data.data[i].iid + "</td>";
                    html += "<td><span>" + data.data[i].icon_name + "</span></td>";
                    html += "<td>" + data.data[i].icon_url + "</td>";
                    html += "<td>" + data.data[i].linkto + "</td>";
                    html += "<td>" + data.data[i].next_page + "</td>";
                    html += "<td>" + data.data[i].iorder + "</td>";
                    html += "<td>" + data.data[i].iurl + "</td>";
                    html += "<td><img src='http://104.199.155.2/streammgmt/images/icon/" + data.data[i].icon_url + "' height='40px'></td>";
                    html += '<td class=" last"><a href="#"><i class="fa fa-wrench" aria-hidden="true"></i></a>&nbsp;<a href="#"><i class="fa fa-trash" aria-hidden="true"></i></a></td>';
                    html += "</tr>";
                    $("#listpage").append(html);
                }

            } catch (e) {

            }


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });

}


if (page === "uibanner") {
    $.ajax({
        url: serverURL + "list-banners.php",
        type: "POST",
        data: formData,
        beforeSend: function () {

        },
        success: function (data, textStatus, jqXHR) {

            //setTimeout(function(){ window.location = "stream-overview.html"; }, 5000);
            try {
                var html = "";
                console.log(data);
                for (var i = 0; i < data.data.length; i++) {
                    // console.log("start");
                    html = "<tr>";
                    html += "<td>" + data.data[i].bid + "</td>";
                    html += "<td>" + data.data[i].banner_name + "</td>";
                    html += "<td>" + data.data[i].url + "</td>";
                    html += "<td><img src='http://104.199.155.2/streammgmt/images/banner/" + data.data[i].url + "' height='40px'></td>";
                    html += '<td class=" last"><a href="#"><i class="fa fa-wrench" aria-hidden="true"></i></a>&nbsp;<a href="#"><i class="fa fa-trash" aria-hidden="true"></i></a></td>';
                    html += "</tr>";
                    $("#listpage").append(html);
                }

            } catch (e) {

            }


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });

}

if (page === "uitemplate") {
    $.ajax({
        url: serverURL + "list-templates.php",
        type: "POST",
        data: formData,
        beforeSend: function () {

        },
        success: function (data, textStatus, jqXHR) {

            //setTimeout(function(){ window.location = "stream-overview.html"; }, 5000);
            try {
                var html = "";
                console.log(data);
                for (var i = 0; i < data.data.length; i++) {
                    //console.log("start");
                    html = "<tr>";
                    html += "<td>" + data.data[i].tid + "</td>";
                    html += "<td>" + data.data[i].template_name + "</td>";
                    html += "<td><img src='http://104.199.155.2/streammgmt/images/template/" + data.data[i].url + "' height='40px'></td>";
                    html += '<td class=" last"><a href="#"><i class="fa fa-wrench" aria-hidden="true"></i></a>&nbsp;<a href="#"><i class="fa fa-trash" aria-hidden="true"></i></a></td>';
                    html += "</tr>";
                    $("#listpage").append(html);
                }

            } catch (e) {

            }


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });

}

if (page === "uipage") {
    $('#page-mgmt').hide();
    //console.log($('#page-mgmt').is(":visible"));

    $('#pageadd').on('click', function () {
        //console.log('click');
        if ($('#page-mgmt').css('display') == 'none') {
            //console.log('click1');

            $('#page-mgmt').show();
        } else {
            //console.log('click2');

            $('#page-mgmt').hide();
        }

    });

    function closenewpage() {
        $('#page-mgmt').hide();
    }


    $.ajax({
        url: serverURL + "list-pages.php",
        type: "POST",
        data: formData,
        beforeSend: function () {

        },
        success: function (data, textStatus, jqXHR) {

            //setTimeout(function(){ window.location = "stream-overview.html"; }, 5000);
            try {
                var html = "";
                console.log(data);
                for (var i = 0; i < data.data.length; i++) {
                    //console.log("start");
                    html = "<tr>";
                    html += "<td>" + data.data[i].pid + "</td>";
                    html += "<td>" + data.data[i].page_name + "</td>";
                    html += "<td>" + data.data[i].number_of_icon + "</td>";
                    html += "<td>" + data.data[i].template_type + "</td>";
                    html += "<td>" + data.data[i].number_of_banner + "</td>";
                    html += '<td class=" last"><a href="#"><i class="fa fa-wrench" aria-hidden="true"></i></a>&nbsp;<a href="#"><i class="fa fa-trash" aria-hidden="true"></i></a></td>';
                    html += "</tr>";
                    $("#listpage").append(html);
                }

            } catch (e) {

            }


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });

    $.ajax({
        url: serverURL + "list-templates.php",
        type: "POST",
        data: formData,
        beforeSend: function () {

        },
        success: function (data, textStatus, jqXHR) {

            //setTimeout(function(){ window.location = "stream-overview.html"; }, 5000);
            try {
                var html = "";
                console.log(data);
                for (var i = 0; i < data.data.length; i++) {
                    //console.log("start");
                    html = "<option value='" + data.data[i].template_name + "'>" + data.data[i].template_name + "</option>";
                    $("#tpselect").append(html);
                }

            } catch (e) {

            }


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });

    $('#tpselect').on('change', function () {
        if ($("#tpselect").val() != 0) {
            $('#tp_preview').html('<img src="http://104.199.155.2/streammgmt/images/template/' + $("#tpselect").val() + '.png">');
        } else {
            $('#tp_preview').html('');
        }

    });

    $('#bnselect').on('change', function () {
        var phtml = "";
        console.log($("#bnselect").find(':selected').data('imageurl'));
        if ($("#bnselect").find(':selected').data('imageurl') != 0) {
            phtml = '<img src="http://104.199.155.2/streammgmt/images/banner/' + $("#bnselect").find(':selected').data('imageurl') + '" width=30>';
            $("#banner_pic").html(phtml);
        } else {
            $("#banner_pic").html('');
        }
    });

    $.ajax({
        url: serverURL + "list-banners.php",
        type: "POST",
        data: formData,
        beforeSend: function () {

        },
        success: function (data, textStatus, jqXHR) {

            //setTimeout(function(){ window.location = "stream-overview.html"; }, 5000);
            try {
                var html = "";
                //console.log(data);

                for (var i = 0; i < data.data.length; i++) {
                    //console.log("start");
                    html = "<option value='" + data.data[i].bid + "' data-imageurl=" + data.data[i].url + ">" + data.data[i].banner_name + "</option>";
                    $("#bnselect").append(html);

                }

            } catch (e) {

            }


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });

    for (var x = 0; x < 100; x++) {
        html = "<option value='" + x + "' >" + x + "</option>";
        $("#icselect").append(html);
    }

    $('#icselect').on('change', function () {
        var shtml = "";
        if ($('#icselect').val() != 0) {
            $("#icgroup").html('');

            for (var y = 0; y < $('#icselect').val(); y++) {
                (function (y) {
                    //$("#icgroup").append((y + 1) + '<br>');
                    shtml = '<div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-0 form-group" >'
                    shtml += '<select class="form-control has-feedback-left" id="icsel' + (y + 1) + '">';


                    $.ajax({
                        async: false,
                        url: serverURL + "list-icons.php",
                        type: "POST",
                        data: formData,
                        beforeSend: function () {

                        },
                        success: function (data, textStatus, jqXHR) {

                            //setTimeout(function(){ window.location = "stream-overview.html"; }, 5000);
                            try {
                                var html = "";
                                //console.log(data);
                                for (var i = 0; i < data.data.length; i++) {
                                    shtml += "<option value='" + data.data[i].iid + "' data-imageurl='" + data.data[i].icon_url + "'>" + data.data[i].icon_name + "</option>";
                                }

                            } catch (e) {

                            }


                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log(jqXHR);
                        }
                    });

                    shtml += '</select>';
                    shtml += '</div>';
                    $("#icgroup").append(shtml);

                }(y));


            }


        } else {
            $("#icgroup").html('');
        }
    });

    $('#add_cancel').on('click', function () {
        window.location = "ui-mgmt-page.html";
    });

}