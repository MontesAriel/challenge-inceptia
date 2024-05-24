## Ejercicio 2:

2.1) ¿Cómo implementarías las acciones del frontend utilizando redux? (por ejemplo autenticación, solicitud de clientes activos para el usuario y solicitud de casos por cliente)

2.1) Para implementar redux primero incializo el estado, creo los reductores(las funciones que sirven para modificar el estado según las acciones), defino las acciones (eventos que pueden ocurrir en la aplicación), configuro el almacenamiento para poder manejar el estado globalmente y lo haga accesible a todos los componentes que lo necesiten. 


2.2) Si quisiéramos agregar una ruta nueva a la app, ¿cómo reestructurarías el index.js?

2.2) Si quisiera agregar una ruta nueva, utilizaría React Router (como utilicé en App.tsx).
    Routes, proporciona el contexto del enrutamiento y Route sirve para definir la url y el componente react a renderizarse.
    ej:
<!-- <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes> -->