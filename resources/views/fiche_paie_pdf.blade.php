 <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <title>fiche de paie</title>
<style>
.titre{text-align: center;margin-bottom: 10px;}
.company{
font-size: 17px ;
text-align: left;
margin-top:35px;margin-bottom:30px}
.company span{font-weight:  500; margin-right:7px;}
.name{;text-align: left;margin-left:5px;margin-bottom:5px;}
.adresse{;text-align: left;margin-left:5px;margin-bottom:5px;}
.telephone{;text-align: left;margin-left:5px;margin-bottom:5px;}
.email{;text-align: left;margin-left:5px;margin-bottom:5px;}
.employe{;text-align: left;margin-left:5px;margin-bottom:12px;}
.employe span{font-weight:  500; margin-right:7px;}

#info{
   font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 10px;

}
#info thead tr > * {
  width:10%
}
#info tbody tr > * {
  width:10%
}

#info th {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  font-size: .8em;
}
 #info td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
 font-size: .7em;
}


#paie {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

 #paie th {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  font-size: 1em;
}
 #paie td {
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  padding: 8px;
  text-align: center;

}



#paie th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center; 
  background-color: #73707a;
  color: white;
  font-size:15px
}
#paie thead tr > *:first-child {
 text-align: left;
  width:40%
}
#paie tbody tr > *:first-child {
 text-align: left;
  width:40%
}
#paie thead tr > *:not(:first-child) {
 text-align: center;
  width:12%
}
#paie tbody tr > *:not(:first-child) {
 text-align: center;
  width:12%
}
.salaire{font-weight: 600}
.salaire_net{font-size:18px;font-weight: 600}
.bulletin{color: blue; font-weight: 600}
.focus{background: rgb(188, 188, 194); font-weight: 600;font-size:17px}
.item{ font-weight: 400; font-size:15px}
.retrait{background: rgb(188, 188, 194); font-weight: 600}
.retrait::before{ margin-right:5px;content:'-'}; 
 

</style>
</head>
<body>
 <div class="titre"><h2>Bulletin de paie</h2></div>
 <div class="company">
   <div class="name"><span>Employeur:</span>Soft-paie</div>
   <div class="adresse"><span>Siege social:</span>48 Avenue Kheireddine Pacha, Tunis 1002. </div>
   <div class="telephone"><span>GSM:</span>+216 79 10 00 00</div>
   <div class="email"><span>Email:</span>ressource-humaine@soft-paie.com</div>
 </div>
 <div class="employe"><span>Employé:</span>Fekih Hfaied</div>
<table id="info">
  <thead>

    <tr>
      <th>Bulletin de paie</th>
      <th>Matricule</th>
      <th>Date recrutement</th>
      <th>Taux Horaire</th>
      <th>Numéro CNSS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class='bulletin'> mai-2021</td>
      <td>8</td>
      <td>22/03/2019</td>
      <td>5.450</td>
      <td>00157445399</td>
    </tr>
    
  </tbody>
   
</table>
<table id="info">
  <thead>

    <tr>
     <th>Etat civil</th>
      <th>Nombre d'enfants</th>
      <th>Qualification</th>
      <th>Type contrat</th>
      <th>Solde congé</th>
    </tr>
  </thead>
  <tbody>

    <tr>
     <td>Celibataire</td>
     <td>0</td>
     <td>Comptable</td>
     <td>CDD</td>
     <td>13 jours</td>
    </tr>
    
  </tbody>
   
</table>
<table id="paie">
  <thead>

    <tr>
      <th>Rubriques</th>
      <th>Nombre</th>
      <th>Base</th>
      <th>Taux</th>
      <th>Gains</th>
      <th>Retenues</th>
    </tr>
  </thead>
  <tbody>

    <tr class='numerique'>
      <td class='item'>Heures travaillées</td>
      <td >145</td>
      <td class='numerique'></td>
      <td class='numerique'>5.450</td>
      <td class='numerique'>915.500</td>
      <td></td>
    </tr>
    <tr class='numerique'>
      <td class='item'>Prime ancienneté</td>
      <td class='numerique'></td>
      <td class='numerique'>50.000</td>
      <td class='numerique'></td>
      <td class='numerique'>50.000</td>
      <td></td>
    </tr>
    <tr class='numerique'>
      <td class='item'>Indemnité de transport</td>
      <td></td>
      <td class='numerique'>60.000</td>
      <td class='numerique'></td>
      <td class='numerique'>60.000</td>
      <td></td>
    </tr>
    <tr class='numerique'>
      <td class='item'>Prime de rendement</td>
      <td class='numerique'></td>
      <td class='numerique'></td>
      <td class='numerique'>2%</td>
      <td class='numerique'>160.500</td>
      <td></td>
    </tr>
    <tr class='numerique'>
      <td class='item'>Heures supplementaires</td>
      <td class='numerique'></td>
      <td class='numerique'></td>
      <td class='numerique'></td>
      <td class='numerique'></td>
      <td></td>
    </tr>
    <tr class='numerique'>
      <td class='item'>Gratification exceptionelle</td>
      <td class='numerique'></td>
      <td class='numerique'></td>
      <td class='numerique'></td>
      <td class='numerique'></td>
      <td></td>
    </tr>
    <tr class='numerique'>
      <td class='item'>Congé payé</td>
      <td class='numerique'></td>
      <td class='numerique'></td>
      <td class='numerique'></td>
      <td class='numerique'></td>
      <td></td>
    </tr>
    <tr class='numerique'>
      <td class='item'>Ticket resto</td>
      <td class='numerique'>14</td>
      <td class='numerique'></td>
      <td class='numerique'>5.000</td>
      <td class='numerique'>70.000</td>
      <td></td>
    </tr>
    <tr class='focus'>
      <td>Salaire brut</td>
      <td></td>
      <td></td>
      <td></td>
      <td>1200.640</td>
      <td></td>
    </tr>
    <tr class='numerique'>
      <td class='item'>Cotisation sociale (cnss)</td>
      <td></td>
      <td></td>
      <td class='numerique'>7.8%</td>
      <td></td>
      <td class='retrait'>125.757</td>
    </tr>
    <tr class='focus'>
      <td>Salaire imposable</td>
      <td></td>
      <td></td>
      <td></td>
      <td>1103.883</td>
      <td></td>
    </tr>
    <tr class='numerique'>
      <td class='item'>Impot sur le revenu (irpp)</td>
      <td></td>
      <td></td>
      <td class='numerique'>10%</td>
      <td></td>
      <td class='retrait'>118.582</td>
    </tr>
    <tr class='focus'>
      <td class='salaire'>Salaire net</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td class='salaire_net'>1265.401</td>
    </tr>
  </tbody>
 
  
</table>

{{-- 
<script>
  const d=document.querySelector('title');
  
  d.innerHTML=new Date().getMonth()+1 + ' / ' + new Date().getFullYear();
</script> --}}

</body>
</html>





     {{-- <style>
.page-break {
    page-break-after: always;
}
</style>

 </head>

 <body>
     <h1>Page 1</h1>
     <table>
         <thead>   <tr><th>ttt</th></tr></thead>
      <tbody><tr><td>bbb</td></tr></tbody>
     </table>
      @foreach($user ?? ''  as $data)
                
                    <li>{{ $data->nom }}</li>
                  
                @endforeach
<div class="page-break"></div>
<h1>Page 2</h1>
 </body>
 </html>
  --}}
 
 
