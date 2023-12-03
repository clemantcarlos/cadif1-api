export function curso(a,load,div,loading,html){
  $(document).click((e)=>{
    if(e.target.matches(a)){
      $(load).load(html,()=>{
        fetch(`https://api.cadif1.com/curso/${e.target.id}`)
        .then(resp=>resp.json())
        .then(resp=>{
          let c = resp.curso
          $(div).append(`
          <div class="card">
            <div class="card-header">
              ${c.nombre}
            </div>
            <div class="card-body">
              <h5 class="card-title">Area De Estudio: ${c.areaestudio.toUpperCase()}</h5>
              <p class="card-text">${c.infmateria}</p>
              <p class="card-text">${c.objetivoresumido}</p>
              <p class="card-text">${c.haciaquienestaorientado}</p>
            </div>
            <ul class="list-group list-group-flush niveles d-flex flex-column justify-content-center align-items-center"></ul>
          </div>
            `)

            for(let nivel of c.niveles){
              $('.niveles').append(`
                <li class="list-group-item">
                <div class="card" style="width: 18rem;">
                  <div class="card-body">
                    <h5 class="card-title">${nivel.nombre}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${nivel.objetivoprincipal}</h6>
                  </div>
                </div>
                </li>
              `)
            }
        })
        .finally(()=>{
          $(loading).hide()
        })
        .catch((e)=>{
          Swal.fire('Ha habido un error de conexion', '', 'warning');
        })
      })
    }
  })
}

export function carrera(a,load,div,loading,html){
  $(document).click((e)=>{
    if(e.target.matches(a)){
      $(load).load(html,()=>{
        fetch(`https://api.cadif1.com/carrera/${e.target.id}`)
        .then(resp=>resp.json())
        .then(resp=>{
          let c = resp.carrera
          $(div).append(`
          <div class="card">
            <div class="card-header">
              ${c.nombre}
            </div>
            <div class="card-body">
              <h5 class="card-title">TITULO: ${c.titulo}</h5>
              <p class="card-text">Nuestro objetivo es ${c.objetivo.toLowerCase()}</p>
              <h5 class="card-title text-center">PENSUM</h5>
            </div>
            <ul class="list-group list-group-flush pensum d-flex flex-column justify-content-center"></ul>
          </div>
            `)

            c.pensum.forEach((el,indx)=>{
              $('.pensum').append(`
              <li class="list-group-item ">
                MODULO: ${indx+1}
                <div class='text-start'>
                  ${el[0]===undefined?'':el[0].materia}<br>
                  ${el[1]===undefined?'':el[1].materia}
                </div>
              </li>
              `)
            })
        })
        .finally(()=>{
          $(loading).hide()
        })
        .catch((e)=>{
          Swal.fire('Ha habido un error de conexion', '', 'warning');
        })
      })
    }
  })
}
export function areaDeEstudio(a,load,div,loading,html){
  $(document).click((e)=>{
    if(e.target.matches(a)){
      $(load).load(html,()=>{
        fetch(`https://api.cadif1.com/curso/de_un_area/${e.target.id}`)
        .then(resp=>resp.json())
        .then(resp=>{
          for(let c of resp.cursos){
            $(div).append(
              card(
                'CURSO',
                c.nombre,
                c.objetivoresumido,
                'Mas informacion',
                `participantes ${c.participantes}`,
                c.id,
                'btn-curso',
                `#${c.nombre}`
              ))
          }
        })
        .finally(()=>{
          $(loading).hide()
        })
        .catch((e)=>{
          Swal.fire('Ha habido un error de conexion', '', 'warning');
        })
      })
    }
  })
}

export function requestCarreras(div){
  fetch('https://api.cadif1.com/carrera')
  .then(resp=>resp.json())
  .then(resp=>{
      for(let c of resp.carreras){
        if(c.activa==='1')
          $(div).append(
            card(
              'CARRERA',
              c.nombre,
              c.objetivoresumido,
              'Mas informacion',
              c.titulo,
              c.id,
              'btn-carrera',
              `#${c.nombre}`))
      }
  })
  .catch((e)=>{
    Swal.fire('Ha habido un error de conexion', '', 'warning');
  })
}

export function requestAreaDeEstudio(div){
  fetch('https://api.cadif1.com/areadeestudio')
  .then(resp=>resp.json())
  .then(resp=>{
    for(let c of resp.areas){
      $(div).append(
        card(
          'AREA DE ESTUDIO',
          c.nombre,
          c.descripcion===''||c.descripcion===null? '': c.descripcion,
          'Mas informacion',
          c.activa=== '1' ? 'activa':'inactiva',
          c.id,
          'btn-informacion-areadeestudio',
          `#${c.nombre}`))
    }
  })
  .catch((e)=>{
    Swal.fire('Ha habido un error de conexion', '', 'warning');
  })
}

function card(item1,item2,item3,item4,item5,id,btn,href){
  const card =`
    <div class="card text-center col-5 m-4">
      <div class="card-header">
        ${item1}
      </div>
        <div class="card-body">
          <h5 class="card-title">${item2}</h5>
          <p class="card-text">
          ${item3}
          </p>
          <btn id="${id}" class="btn btn-primary ${btn}">${item4}</btn>
        </div>
      <div class="card-footer text-body-secondary">
      ${item5}
    </div>
  `
  return card
}