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
   
    
  //Comprovem que no s'hagi demanat un pokemon especific...

    if (window.location.href.includes('?pokeID')){
        let params = new URLSearchParams(document.location.search);
        let pk_id = params.get('pokeID')
        console.log()

        var pkm_id="https://pokeapi.co/api/v2/pokemon/"+pk_id;
        var pkm_info=await fetch(pkm_id);
    
        const data= await pkm_info.json();
        
        //Aqui setejar la info del Pokemn
        //Amagar el llistat




        console.log(data.name)
    }



    ///////////////////////////////////////////////////////////////
     //Creem els divs necessaris a partir de la llista pkm_ids

        //pkm_ids= objecte array amb els ids dels pokemos
        //Comprovem que no estiguin salvats a la sessio...si ho estan...els recuperem
        if (sessionStorage.hasOwnProperty("ids")==false)
        {
            console.log("no pokemons");
            pkm_ids=get_rnd(10,1000)
            sessionStorage.setItem("ids", pkm_ids);  //Salvem la llista per refrescar
        }
         else {
            console.log("Si pokemons");
            pkm_ids_txt=sessionStorage.getItem("ids");
            pkm_ids=pkm_ids_txt.split(',');
            console.log(pkm_ids)
         }   
          //Carreguem la llista de pokemons
         get_pkms(pkm_ids);

}
