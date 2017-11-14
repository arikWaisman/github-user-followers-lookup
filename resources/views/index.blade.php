<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="csrf-token" value="<?php echo csrf_token(); ?>" />
    <link rel="stylesheet" href="{{ mix('/css/app.css') }}">
    <title>Github Follower Search</title>

</head>
<body>
    <div id="hook"></div>
    <script type="text/javascript" src="{{ mix('/js/app.js') }}"></script>
</body>
</html>