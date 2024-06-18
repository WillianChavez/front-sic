import Vue from "vue";
import auth from './auth.services'
import users from './user.services'
import roles from './roles.services'
import profiles from './profiles.services'
import typeRoles from './typeRoles.services'
import paths from './path.services'
import catalogo from './catalogo.services'
import compra from './compra.services'
import servicio from './servicio.services'
import tiposervicio from "./tiposervicio.services";

Vue.prototype.services = {
    auth,
    users,
    roles,
    profiles,
    typeRoles,
    paths,
    catalogo,
    compra,
    servicio,
    tiposervicio,
}