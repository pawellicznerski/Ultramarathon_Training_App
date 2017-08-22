import React from 'react'

export const NoMatch = ({ location }) => (
  <div style={
      {
        width:"100vw",
        height:"70vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column"
      }
    }>
    <h1>No match for <code>{location.pathname}</code></h1><br/>
    <h3>Albo wpisałeś/aś zły adres, albo próbowałeś/aś wyświetlić plan terningowy kożystając z platformy github-a..</h3>
    <p>Nie da się wyświetlić planu treningowego bez kontaktu z serwerem. Dlatego żeby poznać w pełni projekt (z wyświetlonym planem treningowym) należy:</p><br/>
    <h3>1.Ściągnać projekt na swój komputer</h3>
    <p> {"np. otwóż folder w którym chcesz mieć ten projekt. Otwóż w nim terminal (CTRL+ALT+T) i wpisz w nim komendę: git clone https://github.com/pawellicznerski/Ultramarathon_Training_App.git"}</p><br/>
    <h3>2.Zainstalować pakiet</h3>
    <p> {"Wejdź do folderu Ultramarathon_Training_App i otwóż w nim terminal (CTRL+ALT+T), po czym wpisz komendę: npm install" }</p><br/>
    <h3>3. Uruchomić JSON.SERVER</h3>
    <p> {"W tym samym teminalu zainstaluj json-server komendą: npm install -g json-server i urochom go komedą: json-server --watch db.json" }</p><br/>
    <h3>4. Uruchomić stronę</h3>
    <p> {"W osobnej zakładce wpisz komendę: npm start i zgódź się (Y) na użycie innego portu (localhost:3000 jest juz zajety przez json-server)" }</p><br/>
      <h3>Strona uruchomiona!</h3>


  </div>
)
