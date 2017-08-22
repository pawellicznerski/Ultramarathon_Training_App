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
    <p>Nie da się wyświetlić planu treningowego bez kontaktu z serwerem. Dlatego żeby poznać w pełni projekt (z wyświtlonym planem treningowym) należy:</p><br/>
    <h4>${"1.Ściągnać projekt na swój komputer (Np. Otwóż folder w któreym chcesz mieć ten projekt. Otwóż w nim terminal (CTRL+ALT+T) i wpisz w nim komendę: git clone https://github.com/pawellicznerski/Ultramarathon_Training_App.git"}</h4>

  </div>
)
