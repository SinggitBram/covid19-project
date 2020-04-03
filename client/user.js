const server = 'http://localhost:3000'

// login and register show-hide

$(document).ready(function () {
    $("#theLogin").hide()
    $("#theRegister").hide()
    $('.berita').hide()
    $('#theStats').hide()
    $('#tombollogout').hide()

    if (!localStorage.getItem('token')) {
        $("#theLogin").show()
    } else {
        $('#tombollogout').show()
        $('.berita').show()
        $('#theStats').show()
    }

    $("#tombolpindahregister").click(function (event) {
        event.preventDefault()
        $("#theLogin").hide();
        $("#theRegister").show()
        $("#register-form")[0].reset()
    });

    $("#tombolpindahlogin").click(function (event) {
        event.preventDefault()
        $("#theRegister").hide();
        $("#theLogin").show()
        $("#errormess").html('')
    });

    $("#login-form").submit(function (event) {
        event.preventDefault()
        $.ajax({
            url: "http://localhost:3000/users/login",
            type: "post",
            data: {
                email: $("#emaillogin").val(),
                password: $("#passwordlogin").val()
            },
            success: function (data) {
                localStorage.setItem("token", data.token)

                $("#login-form")[0].reset()
                $("#theLogin").hide()
                $('#tombollogout').show()
                $('.berita').show()
                $('#theStats').show()
                $("#errormess").html('')
            },
            error: function (err) {
                $("#errormess").html(`<div class="alert alert-danger" role="alert">
                Wrong Email / Password 
              </div>`)
            }
        })
    })

    $("#register-form").submit(function (event) {
        event.preventDefault()
        
        $.ajax({
            url: "http://localhost:3000/users/register",
            type: "post",
            data: {
                email: $("#emailregister").val(),
                password: $("#passwordregister").val()
            },
            success: function (data) {
                localStorage.setItem("token", data.token)

                $("#register-form")[0].reset()
                $("#theRegister").hide(300)
                $('#tombollogout').show()
                $('.berita').show()
                $('#theStats').show()
                $("#errormess").html('')
            },
            error: function (err) {
                console.log(err)
                $("#errormess").html(`<div class="alert alert-danger" role="alert">
                Sign Up Failed
              </div>`)
            }
        })
    })

    $("#tombollogout").click(function (event) {
        event.preventDefault()
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out from this session!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, please!',
            cancelButtonText: 'No, I want to stay here!'
        }).then((result) => {
            if (result.value) {
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                    console.log('User signed out.');
                });
                localStorage.clear()
                $('.berita').hide()
                $('#theStats').hide()
                $('#tombollogout').hide()
                $("#theLogin").show()

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'You are still here :)',
                    'error'
                )
            }
        })

    })

});
function showHidePassLogin() {
    if ($("#passwordlogin").attr("type") == 'password') {
        $("#passwordlogin").attr("type", 'text')
    } else if ($("#passwordlogin").attr("type") == 'text') {
        $("#passwordlogin").attr("type", 'password')
    }
}

function showHidePassRegister() {
    if ($("#passwordregister").attr("type") == 'password') {
        $("#passwordregister").attr("type", 'text')
    } else if ($("#passwordregister").attr("type") == 'text') {
        $("#passwordregister").attr("type", 'password')
    }
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: "http://localhost:3000/users/googlesignin",
        type: "post",
        data: { token: id_token }
    })
        .then(data => {
            localStorage.setItem("token", data.token)
            $("#theLogin").hide(300)
            $('#tombollogout').show()
            $('.berita').show()
            $('#theStats').show()
        })
}