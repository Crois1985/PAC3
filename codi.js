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



async function crear_llista(pkm_ids)
{
    //Creem els divs necessaris a partir de la llista pkm_ids
    //pkm_ids= objecte array amb els ids dels pokemos

    for (const pk_id of pkm_ids) //Per a cada pokemon li creem una previsualització
    {
        var pkm=document.createElement('div');
        var pkm_img=document.createElement('img');
        var pkm_name=document.createElement('h3');
        pkm.setAttribute("id", "pkm_" + pk_id);
        pkm.setAttribute("class","card");
        document.getElementById("llistat").appendChild(pkm);
        document.getElementById("pkm_" + pk_id).appendChild(pkm_img);
        document.getElementById("pkm_" + pk_id).appendChild(pkm_name);



       //Obtenim la info dels pokemons

        var info={}; //Diccionari amb la info del pokemon
        var pkm_id="https://pokeapi.co/api/v2/pokemon/"+pk_id;
        var pkm_info=await fetch(pkm_id);
    
        const data= await pkm_info.json();
        
        
        pkm_name.innerText=data.name;
        pkm_img.setAttribute("src",data.sprites.front_default);

    }
}
