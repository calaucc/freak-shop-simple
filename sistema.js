let totalCompra = 0;
let audioActual = null;
let botonPreviewActual = null;

function validar(){
    let usuario = document.getElementById("usuario").value;
    let clave = document.getElementById("clave").value;
    if(usuario == "god" && clave == "god"){
        alert("Bienvenido " + usuario + " a FREAK SHOP")
        window.location.href = "index.html";
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
}

function actualizarTotal(){
    totalCompra = 0;
    let checkboxes = document.querySelectorAll(".album-checkbox");
    for(let i = 0; i < checkboxes.length; i++){
        if(checkboxes[i].checked){
            totalCompra = totalCompra + parseInt(checkboxes[i].value);
        }
    }
    document.getElementById("total-compra").innerText = totalCompra;
}

function irAPagar(){
    if(totalCompra > 0){
        document.getElementById("tienda").style.display = "none";
        document.getElementById("seccion-pago").style.display = "block";
    } else {
        alert("Tu carrito está vacío. Elige al menos un álbum para continuar.");
    }
}

function confirmarCompra(){
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let direccion = document.getElementById("direccion").value;

    if(nombre == "" || email == "" || direccion == ""){
        alert("Por favor, completa todos los campos obligatorios.");
    } else {
        alert("¡Pedido confirmado!\nGracias por tu compra, " + nombre + ".\nEl total fue de $" + totalCompra + ".\nTu pedido será enviado a: " + direccion);
        window.location.reload();
    }
}

function reproducirPreview(archivoCancion, botonPresionado){
    let reproductor = document.getElementById("reproductor-audio");
    let cancionInfo = document.getElementById("cancion-actual");
    let botonPausa = document.getElementById("boton-pausa");
    let rutaCancion = "audio/" + archivoCancion;

    reproductor.onended = resetearReproductor;

    if(audioActual && audioActual.src.includes(archivoCancion) && !audioActual.paused){
        audioActual.pause();
        botonPausa.innerText = "▶";
        botonPresionado.style.backgroundColor = "#444";
    } else {
        if(audioActual){
            audioActual.pause();
            if(botonPreviewActual){
                botonPreviewActual.style.backgroundColor = "#444";
            }
        }
        reproductor.src = rutaCancion;
        reproductor.play();
        audioActual = reproductor;
        botonPreviewActual = botonPresionado;
        
        cancionInfo.innerText = "Reproduciendo: " + botonPresionado.innerText.replace("Preview: ", "");
        botonPausa.innerText = "❚❚";
        botonPresionado.style.backgroundColor = "#ff4500";
    }
}

function resetearReproductor(){
    document.getElementById("cancion-actual").innerText = "Ninguna canción seleccionada";
    document.getElementById("boton-pausa").innerText = "▶";
    if(botonPreviewActual){
        botonPreviewActual.style.backgroundColor = "#444";
    }
    audioActual = null;
    botonPreviewActual = null;
}

function controlarReproduccion(){
    let botonPausa = document.getElementById("boton-pausa");
    if(audioActual){
        if(audioActual.paused){
            audioActual.play();
            botonPausa.innerText = "❚❚";
            if(botonPreviewActual){
                botonPreviewActual.style.backgroundColor = "#ff4500";
            }
        } else {
            audioActual.pause();
            botonPausa.innerText = "▶";
            if(botonPreviewActual){
                botonPreviewActual.style.backgroundColor = "#444";
            }
        }
    }
}