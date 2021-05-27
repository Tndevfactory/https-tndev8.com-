<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>mail</title>

        <style>
            body {
                font-family: 'Nunito', sans-serif;
            }
        </style>
    </head>
    <body class="antialiased">
       api labs with nextjs react query
       <form action={{route('sendMail')}} method="POST" enctype="multipart/form-data">
          @csrf
         
        <label for="file">add file</label>
       <div class="title">
           <label for="title">title</label>
        <input type="text" name='title'></div> 
      <div class="body">
          <label for="body">message</label>
          <input type="text" name='body'></div>  
        <input type="file" name='file' >
           <button type="submit">send</button> 
    </form>
    </body>
</html>
