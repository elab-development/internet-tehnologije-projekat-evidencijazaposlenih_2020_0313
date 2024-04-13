<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Created</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            margin: 20px;
            padding: 20px;
        }
        h1 {
            color: #007bff;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Your Event Has Been Created!</h1>
        <p>Hello, {{ $event->user->name }}!</p>
        <p>We are pleased to inform you that your event "<strong>{{ $event->title }}</strong>" has been successfully added to the calendar.</p>
        <p>Here are the details of your event:</p>
        <ul>
            <li>Title: {{ $event->title }}</li>
            <li>Description: {{ $event->description }}</li>
            <li>Start: {{ $event->start_datetime }}</li>
            <li>End: {{ $event->end_datetime }}</li>
        </ul>
        <p>If this event is at the department level, rest assured, all relevant members have also been notified.</p>
        <p>Thank you for using our platform to manage your events.</p>
    </div>
</body>
</html>
