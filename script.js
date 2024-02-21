function feliratkozas()
{
    let email=document.getElementById('email').value;
    if(email==""){
      alert("Kérem adja meg az e-mail címét!")
    }
    else{
      alert("Sikeresen feliratkozott a hírlevelünkre!")
    }
}
