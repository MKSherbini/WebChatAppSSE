<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css"/>
    <script src="http://code.jquery.com/jquery-1.12.4.min.js"></script>
    <%--<script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>--%>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css" rel="stylesheet"/>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
    <!-- JavaScript Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0"
            crossorigin="anonymous"></script>

    <title>Title</title>
    <style>
        body {
            background-color: #4763a7
        }

        .card {
            border-radius: 8px;
            border: none
        }

        .signin-link {
            color: #db0a5b;
            font-weight: 600
        }

        .signin-link:hover {
            color: #b90b4f
        }

        .form-control {
            margin-top: 13px;
            height: 49px !important
        }

        .form-control:focus {
            box-shadow: none;
            border: 1px solid #db0a5b
        }

        .form-check-input {
            border: 1px solid #F44336
        }

        .form-check-input:checked {
            background-color: #F44336;
            border-color: #F44336
        }

        .form-check-input:focus {
            border-color: #e10a5b;
            outline: 0;
            box-shadow: none
        }

        .button {
            height: 40px;
            border-radius: 4px
        }
    </style>
</head>
<body>

<form action="startChat" method="post">
    <div class="container mt-5">
        <div class="row d-flex justify-content-center">
            <div class="col-md-6">
                <div class="card p-4 py-5">
                    <h2>Start a Free Chat</h2>
                    <input type="text" name="Username" class="form-control" placeholder="Username">

                    <div class="container mt-1">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="Gender" id="inlineRadio1"
                                   value="Male" checked>
                            <label class="form-check-label" for="inlineRadio1">Male</label>
                        </div>

                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="Gender" id="inlineRadio2"
                                   value="Female">
                            <label class="form-check-label" for="inlineRadio2">Female</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="gender" id="inlineRadio3"
                                   value="Other" disabled>
                            <label class="form-check-label" for="inlineRadio3">Other (disabled)</label>
                        </div>
                    </div>

                    <div class="mt-4">
                        <input type="submit" class="btn btn-danger button btn-block" value="Let's Go"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>

</body>
</html>
