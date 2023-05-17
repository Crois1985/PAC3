//Funcions JavaScript per la Pokedex




function get_rnd(n,max)
{
    //n= quantitat de nombres aleatoris
    //max= nombre aleatori mes alt
    
    nums=[];  //array de numeros
    for(i=0; i<n;i++)
    {
        nums.push(Math.floor(Math.random() * max));
    }

    return nums;
}

//Genera la taula amb els IDs que li passem com a llista (pkm_ids)
async function get_pkms(pkm_ids)
{
//Per a cada pokemon li creem una previsualització
for (const pk_id of pkm_ids) 
{
    var pkm=document.createElement('div');
    var pkm_img=document.createElement('img');
    var pkm_name=document.createElement('h3');
    var lnk=document.createElement('a');
    lnk.setAttribute("id", "a_" + pk_id);
    pkm.setAttribute("id", "pkm_" + pk_id);
    pkm.setAttribute("class","card");

    document.getElementById("llistat").appendChild(lnk);
    document.getElementById("a_" + pk_id).appendChild(pkm);
    
    document.getElementById("pkm_" + pk_id).appendChild(pkm_img);
    document.getElementById("pkm_" + pk_id).appendChild(pkm_name);
    
    
    var pkm_a="index.html?pokeID="+pk_id;
    lnk.setAttribute("href",pkm_a);  //Afegim la url al link

//Obtenim la info dels pokemons per la llsita
    
   var pkm_id="https://pokeapi.co/api/v2/pokemon/"+pk_id;
   // console.log(pkm_id);
    var pkm_info=await fetch(pkm_id);
    const data= await pkm_info.json();

    pkm_name.innerText=data.name;
    pkm_img.setAttribute("src",data.sprites.front_default);

}

}











//Funcio principal al carregar la pagina
async function start()
{
   
    if (sessionStorage.hasOwnProperty("tema")!=false)
    {
        set_tema(sessionStorage.getItem("tema"));
    }
    else
    {
    	set_tema(0);
    }
    
  //Comprovem que no s'hagi demanat un pokemon especific...

    if (window.location.href.includes('?pokeID')){

        //Amaguem la llista
        document.getElementById("llistat").style.display="none";
        document.getElementById("poke_profile").style.display="block";

        let params = new URLSearchParams(document.location.search);
        let pk_id = params.get('pokeID')
        

        var pkm_id="https://pokeapi.co/api/v2/pokemon/"+pk_id;
        var pkm_info=await fetch(pkm_id);
    
        const data= await pkm_info.json();
        
       
        //Amagar el llistat
        //Aqui setejar la info del Pokemn
        document.getElementById("pk_name").innerText="Nom: " + data.name;
        document.getElementById("front").setAttribute("src",data.sprites.front_default);
        document.getElementById("back").setAttribute("src",data.sprites.back_default);
        document.getElementById("atac").innerText="Atac: "+data.stats[1].base_stat;
        document.getElementById("defensa").innerText="Defensa: "+data.stats[2].base_stat;

        var tipus="Tipus: ";
        for (const tip of data.types)
        {
            tipus=tipus+tip.type.name+" ";
        }
        document.getElementById("tipus").innerText=tipus;

      //  console.log(data.name)
      //  console.log(data.types);

    }
    else
    {
        document.getElementById("llistat").style.display="block";
        document.getElementById("poke_profile").style.display="none";
    }



    ///////////////////////////////////////////////////////////////
     //Creem els divs necessaris a partir de la llista pkm_ids

        //pkm_ids= objecte array amb els ids dels pokemos
        //Comprovem que no estiguin salvats a la sessio...si ho estan...els recuperem
        if (sessionStorage.hasOwnProperty("ids")==false)
        {
           // console.log("No pokemons");
            pkm_ids=get_rnd(10,1000)
            sessionStorage.setItem("ids", pkm_ids);  //Salvem la llista per refrescar
        }
         else {
           // console.log("Si pokemons");
            pkm_ids_txt=sessionStorage.getItem("ids");
            pkm_ids=pkm_ids_txt.split(',');
           // console.log(pkm_ids)
         }   
          //Carreguem la llista de pokemons
         get_pkms(pkm_ids);

}

//Funcio per buscar entre les cartes
function cerca()
{
    texte=document.getElementById("find").value;
   // console.log(texte);
    cartes=document.getElementsByClassName("card");
    
    for (const pkm of cartes)
    {
        var nl=document.querySelectorAll("#"+pkm.getAttribute("id")+' h3');
        //console.log( texte+ " ¿?? "+ nl[0].innerText);
        var nom=nl[0].innerText;
        if (nom.includes(texte)==true)
        {
          //  console.log(nom +" inclos");
            pkm.style.visibility="visible";
        }
        else{
           // console.log(nom +" no inclos");
            pkm.style.visibility="hidden";
        }

    }
}

//Funcio que salta entre temes
function set_tema(tema)
{
    if (tema==0)
    {
        document.getElementById("tema").setAttribute("href","css/clar.css");
        document.getElementsByName("tema")[0].setAttribute("checked","checked");
    }
    else
    {
        document.getElementById("tema").setAttribute("href","css/obscur.css");
        document.getElementsByName("tema")[1].setAttribute("checked","checked");
    }
    sessionStorage.setItem("tema", tema);  //Salvem la llista per refrescar
}
